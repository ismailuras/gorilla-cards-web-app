import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import EditorField from "./EditorField";

function EditCard() {
  const decks = useSelector((state) => state.decks.decks);
  const status = useSelector((state) => state.cards.status);

  const onSubmit = () => {};

  const methods = useForm();
  const { register, errors } = methods;

  return (
    <FormProvider {...methods}>
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
              required: "This is required..",
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
          <button disabled={status === "loading"}>Edit Card</button>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditCard;
