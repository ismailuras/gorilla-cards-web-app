import { showToast } from "helpers";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard } from "./cardSlice";

function DeleteCard({ closeDeleteCardModal }) {
  const deleteStatus = useSelector((state) => state.cards.deleteStatus);
  const errorMessagesOnDelete = useSelector(
    (state) => state.cards.errorMessagesOnDelete
  );
  const currentCard = useSelector((state) => state.cards.currentCard);
  const dispatch = useDispatch();

  const handleDeleteCard = async () => {
    try {
      await dispatch(deleteCard(currentCard.id)).unwrap();
      showToast("The card has been successfully deleted.", "success");
      closeDeleteCardModal();
    } catch (error) {
      showToast("Unexpected error occured.", "error");
      closeDeleteCardModal();
    }
  };

  return (
    <div>
      <p className="text-xl mb-10">
        You are going to delete this card. Do you confirm ?
      </p>
      <div className="flex justify-end">
        {errorMessagesOnDelete.map((error) => (
          <span key={error} className="pl-1 pt-2 text-red-400 text-sm">
            Unexpected error occured.
          </span>
        ))}
        <button
          onClick={handleDeleteCard}
          disabled={deleteStatus === "loading"}
          className="px-5 rounded-lg h-14 bg-red-500 hover:bg-red-600 transition text-white font-semibold">
          {deleteStatus === "loading" ? "Loading..." : "Delete Card"}
        </button>
      </div>
    </div>
  );
}

export default DeleteCard;
