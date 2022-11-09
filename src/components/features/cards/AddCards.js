import { useSelector, useDispatch } from "react-redux";
import { createCards } from "stores/cardSlice";
import { FormProvider, useForm } from "react-hook-form";
import { showToast } from "helpers";
import { useState } from "react";
import MyController from "./MyController";
function AddCards() {
  const items = useSelector((state) => state.decks.items);
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col w-44">
          {items.length === 0 ? (
            <div>There is no support yet. Build a deck to add cards.</div>
          ) : (
            <label htmlFor="currentDeck">Deck Names</label>
          )}
          <select {...register("deckId")}>
            <option value="">Select Deck</option>
            {items.length > 0 &&
              items.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.deckName}
                </option>
              ))}
          </select>
        </div>
        <MyController forceRenderState={forceRenderState} />
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
