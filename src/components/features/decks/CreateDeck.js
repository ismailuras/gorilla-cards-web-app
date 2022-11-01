import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createDeck } from "stores/deckSlice";
import { auth } from "firebaseConfig";
import Button from "components/Button";

function CreateDeck() {
  const status = useSelector((state) => state.decks.createStatus);
  const errorOnCreateDeck = useSelector(
    (state) => state.decks.errorMessageOnCreate
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(createDeck(data, auth.currentUser.uid));
    reset();
  };

  return (
    <div>
      <form
        className="max-h-96 flex flex-col justify-between"
        id="deckForm"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="deckName" className="font-medium text-xl mb-5">
            Deck Name
          </label>
          <input
            className="py-1 font-medium outline"
            {...register("deckName", {
              required: "This is required",
            })}
            placeholder="Entire your deck name."
          />
          <ErrorMessage
            errors={errors}
            name="deckName"
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
        <Button disabled={status === "loading"}>
          {status === "loading" ? "Loading" : "Add Deck"}
        </Button>
        {errorOnCreateDeck && <p>Unexpected error occured.</p>}
      </form>
    </div>
  );
}

export default CreateDeck;
