import { useSelector, useDispatch } from "react-redux";
import { createCards } from "features/cards/cardSlice";
import { FormProvider, useForm } from "react-hook-form";
import { showToast } from "helpers";
import { useState } from "react";
import MyController from "./EditorField";
function AddCards() {
  const decks = useSelector((state) => state.decks.items);
  const errorMessage = useSelector(
    (state) => state.cards.errorMessageOnCreateCards
  );
  const dispatch = useDispatch();
  const [forceRenderState, setForceRenderState] = useState(false);

  const onSubmit = (data) => {
    try {
      dispatch(createCards(data)).unwrap();
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
  const { register, reset } = methods;

  return (
    <FormProvider key={forceRenderState} {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col w-44">
          {decks.length === 0 ? (
            <div>
              There is no deck yet. Please, create a deck and start to add
              cards.
            </div>
          ) : (
            <label htmlFor="currentDeck">Deck Names</label>
          )}
          <select {...register("deckId")}>
            <option value="">Select Deck</option>
            {decks &&
              decks.map((deck) => (
                <option value={deck.id} key={deck.id}>
                  {deck.deckName}
                </option>
              ))}
          </select>
        </div>
        <MyController />
        <div>
          <button className="bg-indigo-600 p-1 mt-4 text-white text-xl rounded hover:bg-indigo-700">
            Add Card
          </button>
        </div>
        <div>{errorMessage && <p>Unexpected error occured.</p>}</div>
      </form>
    </FormProvider>
  );
}

export default AddCards;
