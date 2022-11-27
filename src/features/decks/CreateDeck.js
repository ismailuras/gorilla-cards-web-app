import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createDeck } from "features/decks/deckSlice";
import { showToast } from "helpers";

function CreateDeck({ closeCreateDeckModal }) {
  const createStatus = useSelector((state) => state.decks.createStatus);
  const errorMessagesOnCreateDeck = useSelector(
    (state) => state.decks.errorMessagesOnCreate
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(createDeck({ data })).unwrap();
      closeCreateDeckModal();
      showToast("The deck has been successfully created.", "success");
    } catch (error) {
      showToast("Failed to create deck.", "error");
    }
  };

  return (
    <form id="deckForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="name" className="font-semibold mb-3 block">
          Deck Name
        </label>
        <input
          className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
          {...register("name", {
            required: "This is a required field.",
          })}
          placeholder="Enter your deck name."
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
          )}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="font-semibold mb-3 block">
          Description (Optional)
        </label>
        <textarea
          {...register("description", { required: false })}
          className="w-full p-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50 resize-none"
          name="description"
          id="description"
          form="deckForm"
          cols="50"
          rows="6"></textarea>
      </div>
      <div className="flex justify-end">
        <button
          disabled={createStatus === "loading"}
          className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
          {createStatus === "loading" ? "Loading..." : "Create Deck"}
        </button>
      </div>
      {errorMessagesOnCreateDeck === "unexpected-error" ? (
        <p className="pl-1 pt-2 text-red-400 text-sm">
          Unexpected error occured.
        </p>
      ) : null}
    </form>
  );
}

export default CreateDeck;
