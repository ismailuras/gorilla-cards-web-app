import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSelector, useDispatch } from "react-redux";
import { updateDeckById } from "features/decks/deckSlice";
import { showToast } from "helpers";
import Button from "components/Button";

function DeckEdit({ closeEditModal }) {
  const currentDeck = useSelector((state) => state.decks.currentDeck);
  const { name, description } = currentDeck;
  const status = useSelector((state) => state.decks.createStatus);
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
      console.log("edit func", currentDeck.id);
      showToast("The deck has been successfully updated.", "success");
      closeEditModal();
    } catch (error) {
      showToast("Unexpected error occured.", "error");
    }
  };

  return (
    <form
      id="deckForm"
      className="max-h-96 flex flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <input
          id="name"
          {...register("name", {
            required: "This is required",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description", { required: false })}
          className="outline outline-offset-1 resize-none"
          name="description"
          id="description"
          form="newDeckNameForm"
          cols="50"
          rows="6"></textarea>
      </div>
      {errorMessage && <span>Unexpected error occured.</span>}
      <Button disabled={status === "loading"}>
        {status === "loading" ? "Loading" : "Update Deck"}
      </Button>
    </form>
  );
}

export default DeckEdit;
