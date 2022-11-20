import { useSelector, useDispatch } from "react-redux";
import { deleteDeck } from "./deckSlice";
import { showToast } from "helpers";

function DeleteDeck({ closeDeleteModal }) {
  const deleteStatus = useSelector((state) => state.decks.deleteStatus);
  const deleteErrorMessage = useSelector(
    (state) => state.decks.deleteErrorMessage
  );
  const currentDeck = useSelector((state) => state.decks.currentDeck);
  const { name } = currentDeck;
  const dispatch = useDispatch();

  const handleDeleteDeck = async () => {
    try {
      await dispatch(deleteDeck(currentDeck.id)).unwrap();
      closeDeleteModal();
      showToast("The deck has been successfully deleted.", "success");
    } catch (error) {
      showToast("An error occurred while deleting the deck.", "error");
      closeDeleteModal();
    }
  };
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-xl mb-10">
          You are going to delete this <strong>{name}</strong>. Do you confirm ?
        </p>
        {deleteErrorMessage && (
          <span>An error occurred while deleting the deck</span>
        )}
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
