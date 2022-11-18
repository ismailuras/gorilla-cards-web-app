import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createDeck } from "features/decks/deckSlice";
import { showToast } from "helpers";
import Button from "components/Button";

function CreateDeck({ closeCreateDeckModal }) {
  const status = useSelector((state) => state.decks.createStatus);
  const errorOnCreateDeck = useSelector(
    (state) => state.decks.errorMessageOnCreate
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
    <div>
      <form
        className="max-h-96 flex flex-col justify-between"
        id="deckForm"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium text-xl mb-5">
            Deck Name
          </label>
          <input
            className="py-1 font-medium outline"
            {...register("name", {
              required: "This is required",
            })}
            placeholder="Entire your deck name."
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            {...register("description", { required: false })}
            className="outline outline-offset-1 resize-none"
            name="description"
            id="description"
            form="deckForm"
            cols="50"
            rows="6"></textarea>
        </div>
        <Button disabled={status === "loading"}>
          {status === "loading" ? "Loading" : "Add Deck"}
        </Button>
        {errorOnCreateDeck && <p>Unexpected error occured.</p>}
      </form>
    </div>
  );
}

export default CreateDeck;
