import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createDeck } from "stores/createDeckSlice";
import { auth } from "firebaseConfig";

function CreateDeck() {
  const status = useSelector((state) => state.decks.createStatus);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      defaultValues: {
        deckName: "",
      },
    },
  });
  const onSubmit = async (data) => {
    dispatch(createDeck(data, auth.currentUser.uid));
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
            id="explanataion"
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
            <option value="every-one">Every One</option>
            <option value="only-friends">Only Friends</option>
            <option value="only-me">Only Me</option>
          </select>
        </div>
        <button
          disabled={status === "loading"}
          className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white px-10 py-2 rounded mt-5">
          {status === "loading" ? "Loading" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
