import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSelector, useDispatch } from "react-redux";
import { updateDeckById } from "features/decks/deckSlice";
import { showToast } from "helpers";

function DeckEdit({ closeEditModal }) {
  const currentDeck = useSelector((state) => state.decks.currentDeck);
  const { name, description } = currentDeck;
  const updateStatus = useSelector((state) => state.decks.updateStatus);
  const errorMessage = useSelector((state) => state.decks.errorMessageOnUpdate);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      description,
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(updateDeckById({ id: currentDeck.id, data })).unwrap();
      showToast("The deck has been successfully updated.", "success");
      closeEditModal();
    } catch (error) {
      showToast("Unexpected error occured.", "error");
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
          id="name"
          {...register("name", {
            required: "This is a required field.",
          })}
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
          Description
        </label>
        <textarea
          {...register("description", { required: false })}
          className="w-full p-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50 resize-none"
          name="description"
          id="description"
          form="newDeckNameForm"
          cols="50"
          rows="6"></textarea>
      </div>
      {errorMessage && <span>Unexpected error occured.</span>}
      <div className="flex justify-end">
        <button
          disabled={updateStatus === "loading"}
          className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
          {updateStatus === "loading" ? "Loading..." : "Edit Deck"}
        </button>
      </div>
    </form>
  );
}

export default DeckEdit;
