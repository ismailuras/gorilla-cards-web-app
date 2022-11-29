import { FormProvider, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { updateCards } from "./cardSlice";
import { showToast } from "helpers";
import EditorField from "./EditorField";

function EditCard() {
  const decks = useSelector((state) => state.decks.decks);
  const status = useSelector((state) => state.cards.status);
  const errorMessagesOnUpdate = useSelector(
    (state) => state.cards.ErrorMessagesOnUpdate
  );
  const currentCard = useSelector((state) => state.cards.currentCard);
  const dispatch = useDispatch();

  const {
    deckId,
    id: cardId,
    note: { front, back },
  } = currentCard;

  const onSubmit = async (data) => {
    const { deckId, front, back } = data;
    const updateData = {
      deckId,
      note: {
        front,
        back,
      },
    };
    try {
      await dispatch(updateCards({ id: cardId, data: updateData })).unwrap();
      showToast("The card has been successfully updated.", "success");
    } catch (error) {
      showToast("Unexpected error occured.", "error");
    }
  };

  const methods = useForm({
    defaultValues: {
      front,
      back,
      deckId,
    },
  });

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
              required: "This is a required field.",
            })}>
            <option value="">Select a deck</option>
            {decks.map((deck) => (
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
          {errorMessagesOnUpdate === "unexpected-error" && (
            <span className="pl-1 pt-2 text-red-400 text-sm">
              Unexpected error occured.
            </span>
          )}
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
