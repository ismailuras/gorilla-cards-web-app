import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks, setCurrentDeck } from "features/decks/deckSlice";
import { MdEditNote } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import MyModal from "../../components/MyModal";
import DeckEdit from "./DeckEdit";
import DeleteDeck from "./DeleteDeck";

function DeckList() {
  const decks = useSelector((state) => state.decks.items);
  const errorMessageOnFetched = useSelector(
    (state) => state.decks.errorMessage
  );
  const dispatch = useDispatch();

  const [isEditDeckModalOpen, setEditDeckModal] = useState(false);
  const [isDeleteDeckModalOpen, setDeleteDeckModal] = useState(false);

  const openUpdateDeckModal = (id) => {
    dispatch(setCurrentDeck({ id }));
    setEditDeckModal(true);
  };

  const closeEditModal = () => {
    setEditDeckModal(false);
  };

  const openDeleteDeckModal = (id) => {
    dispatch(setCurrentDeck({ id }));
    setDeleteDeckModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteDeckModal(false);
  };

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-start ml-10">
      {decks.length === 0 ? (
        <p>"There is no deck!"</p>
      ) : (
        decks.map((deck) => (
          <div className="w-full" key={deck.id}>
            <ul>
              <li className="w-full underline text-blue-600 text-xl flex justify-between ">
                {deck.deckName}
                <button onClick={() => openUpdateDeckModal(deck.id)}>
                  <MdEditNote className="text-2xl" />
                </button>
                <button onClick={() => openDeleteDeckModal(deck.id)}>
                  <AiOutlineDelete className="text-2xl" />
                </button>
              </li>
            </ul>
            {errorMessageOnFetched && <p>Unexpected error occured.</p>}
          </div>
        ))
      )}

      <MyModal
        isOpen={isEditDeckModalOpen}
        setOpen={setEditDeckModal}
        title={"Edit Deck"}>
        <DeckEdit closeEditModal={closeEditModal} />
      </MyModal>
      <MyModal
        isOpen={isDeleteDeckModalOpen}
        setOpen={setDeleteDeckModal}
        title="Delete Deck">
        <DeleteDeck closeDeleteModal={closeDeleteModal} />
      </MyModal>
      <div>{errorMessageOnFetched && <p>Unexpected error occured.</p>}</div>
    </div>
  );
}

export default DeckList;
