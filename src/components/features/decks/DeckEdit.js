import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSelector, useDispatch } from "react-redux";
import { updateDeckById } from "stores/deckSlice";
import Button from "components/Button";
import { showToast } from "helpers";

function DeckEdit({ closeEditModal }) {
  const currentDeck = useSelector((state) => state.decks.currentDeck);
  const { deckName, description, deckVisibility } = currentDeck;
  const status = useSelector((state) => state.decks.createStatus);
  const errorMessage = useSelector((state) => state.decks.errorMessageOnUpdate);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deckName,
      description,
      deckVisibility,
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
    <form
      id="deckForm"
      className="max-h-96 flex flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <input
          id="deckName"
          {...register("deckName", {
            required: "This is required",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="deckName"
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
      <div className="flex flex-col">
        <label htmlFor="deckVisibility">Who can see the deck?</label>
        <select
          {...register("deckVisibility", {
            required: "This is required",
          })}
          name="deckVisibility"
          id="deckVisibility">
          <option value="everyone">Every One</option>
          <option value="only-friends">Only Friends</option>
          <option value="only-me">Only Me</option>
        </select>
      </div>
      {errorMessage && <span>Unexpected error occured.</span>}
      <Button disabled={status === "loading"}>
        {status === "loading" ? "Loading" : "Update Deck"}
      </Button>
    </form>
  );
}

export default DeckEdit;
