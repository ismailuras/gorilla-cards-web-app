import { useSelector, useDispatch } from "react-redux";
import { createCards } from "features/cards/cardSlice";
import { FormProvider, useForm } from "react-hook-form";
import { showToast } from "helpers";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import EditorField from "./EditorField";
function AddCards() {
  const decks = useSelector((state) => state.decks.decks);
  const createStatus = useSelector((state) => state.cards.createStatus);
  const errorMessage = useSelector(
    (state) => state.cards.errorMessageOnCreateCards
  );
  const dispatch = useDispatch();
  const [forceRenderState, setForceRenderState] = useState(false);

  const onSubmit = async (data) => {
    let deckId = parseInt(data.deckId);
    let note = {
      front: data.front,
      back: data.back,
    };
    try {
      await dispatch(createCards({ deckId, note })).unwrap();
      handleReset();
      showToast("Added card.", "success");
    } catch (error) {
      showToast("An error occurred while adding the card.", "error");
    }
  };

  const handleReset = () => {
    reset();
    setForceRenderState(!forceRenderState);
  };

  const methods = useForm();
  const { register, reset, errors } = methods;

  if (decks.length === 0) {
    return (
      <div>
        There is no deck yet. Please, create a deck and start to add cards.
      </div>
    );
  }

  return (
    <FormProvider key={forceRenderState} {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label htmlFor="currentDeck" className="font-semibold mb-3 block">
            Deck Names
          </label>
          <select
            className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
            {...register("deckId", {
              required: "This is required",
            })}>
            <option value="">Select Deck</option>
            {decks &&
              decks.map((deck) => (
                <option value={deck.id} key={deck.id}>
                  {deck.name}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name="deckId"
            render={({ message }) => (
              <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
            )}
          />
        </div>
        <div className="mb-5">
          <EditorField />
        </div>
        <div className="flex justify-end">
          <button
            disabled={createStatus === "loading"}
            className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
            {createStatus === "loading" ? "Loading..." : "Add Card"}
          </button>
        </div>
        <div>{errorMessage && <p>Unexpected error occured.</p>}</div>
      </form>
    </FormProvider>
  );
}

export default AddCards;
