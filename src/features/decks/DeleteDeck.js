import { useSelector, useDispatch } from "react-redux";
import { deleteDeck } from "./deckSlice";
import Button from "components/Button";
import { showToast } from "helpers";

function DeleteDeck({ closeDeleteModal }) {
  const status = useSelector((state) => state.decks.createStatus);
  const deleteErrorMessage = useSelector(
    (state) => state.decks.deleteErrorMessage
  );
  const currentDeck = useSelector((state) => state.decks.currentDeck);
  console.log(currentDeck.id);
  const { name } = currentDeck;
  const dispatch = useDispatch();

  const handleDeleteDeck = async () => {
    try {
      await dispatch(deleteDeck(currentDeck.id)).unwrap();
      console.log("id", deleteDeck);
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
      <Button onClick={handleDeleteDeck} disabled={status === "loading"}>
        {status === "loading" ? "Loading" : "Delete Deck"}
      </Button>
    </div>
  );
}

export default DeleteDeck;
