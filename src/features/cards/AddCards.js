import { useSelector, useDispatch } from "react-redux";
import { createCards } from "features/cards/cardSlice";
import { FormProvider, useForm } from "react-hook-form";
import { showToast } from "helpers";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import EditorField from "./EditorField";
function AddCards() {
  const decks = useSelector((state) => state.decks.decks);
  const status = useSelector((state) => state.cards.status);
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
          <select
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
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <EditorField />
          <button disabled={status === "loading"}>Add Card</button>
        </div>
        <div>{errorMessage && <p>Unexpected error occured.</p>}</div>
      </form>
    </FormProvider>
  );
}

export default AddCards;
