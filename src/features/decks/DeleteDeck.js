import { useSelector, useDispatch } from "react-redux";
import { deleteDeck } from "./deckSlice";
import { showToast } from "helpers";

function DeleteDeck({ closeDeleteDeckModal }) {
  const deleteStatus = useSelector((state) => state.decks.deleteStatus);
  const errorMessagesOnDelete = useSelector(
    (state) => state.decks.errorMessagesOnDelete
  );
  const currentDeck = useSelector((state) => state.decks.currentDeck);
  const { currentDeckName } = currentDeck;
  const dispatch = useDispatch();

  const handleDeleteDeck = async () => {
    try {
      await dispatch(deleteDeck(currentDeck.id)).unwrap();
      closeDeleteDeckModal();
      showToast("The deck has been successfully deleted.", "success");
    } catch (error) {
      showToast("An error occurred while deleting the deck.", "error");
      closeDeleteDeckModal();
    }
  };
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-xl mb-10">
          You are going to delete this <strong>{currentDeckName}</strong>. Do
          you confirm ?
        </p>
        {errorMessagesOnDelete === "unexpected-error" ? (
          <span className="pl-1 pt-2 text-red-400 text-sm"></span>
        ) : null}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleDeleteDeck}
          disabled={deleteStatus === "loading"}
          className="px-5 rounded-lg h-14 bg-red-500 hover:bg-red-600 transition text-white font-semibold">
          {deleteStatus === "loading" ? "Loading..." : "Delete Deck"}
        </button>
      </div>
    </div>
  );
}

export default DeleteDeck;
