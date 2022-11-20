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
        <div className="mb-5">
          <label htmlFor="currentDeck" className="font-semibold mb-3 block">
            Deck Names
          </label>
          <select
            className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
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
            disabled={status === "loading"}
            className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
            {status === "loading" ? "Loading..." : "Edit Card"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditCard;
