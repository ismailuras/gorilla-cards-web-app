import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks, setCurrentDeck } from "features/decks/deckSlice";
import { Link } from "react-router-dom";
import { Edit, Trash } from "react-feather";
import CreateDeck from "features/decks/CreateDeck";
import AddCards from "features/cards/AddCards";
import MyModal from "../../components/MyModal";
import EditDeck from "./EditDeck";
import DeleteDeck from "./DeleteDeck";

function DeckList() {
  const decks = useSelector((state) => state.decks.decks);
  const fetchDeckStatus = useSelector((state) => state.decks.fetchDeckStatus);
  const errorMessagesOnFetch = useSelector(
    (state) => state.decks.errorMessagesOnFetch
  );
  const dispatch = useDispatch();

  const [isCreateDeckModalOpen, setCreateDeckModalOpen] = useState(false);
  const [isEditDeckModalOpen, setEditDeckModal] = useState(false);
  const [isDeleteDeckModalOpen, setDeleteDeckModal] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);

  const openUpdateDeckModal = (id) => {
    dispatch(setCurrentDeck({ id }));
    setEditDeckModal(true);
  };

  const closeEditDeckModal = () => {
    setEditDeckModal(false);
  };

  const openDeleteDeckModal = (id) => {
    dispatch(setCurrentDeck({ id }));
    setDeleteDeckModal(true);
  };

  const closeDeleteDeckModal = () => {
    setDeleteDeckModal(false);
  };

  const openAddCardModal = () => {
    setAddCardModalOpen(true);
  };

  const openCreateDeckModal = () => {
    setCreateDeckModalOpen(true);
  };

  const handleCloseCreateDeckModal = () => {
    setCreateDeckModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="w-1/3 h-screen p-5 border-4 mt-2 inline-block">
      <div className="mb-2">
        <button
          className="py-2 px-5 bg-indigo-600 text-white rounded text-sm"
          onClick={openAddCardModal}>
          Add Card
        </button>
      </div>
      <div>
        {fetchDeckStatus === "loading" ? <span>Loading...</span> : null}
        {decks.length === 0 ? (
          <p>"There is no deck!"</p>
        ) : (
          decks.map((deck) => {
            return (
              <ul key={`${deck.id}`}>
                <li className="flex justify-between items-center text-lg underline py-1">
                  <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                  <div>
                    <button onClick={() => openUpdateDeckModal(deck.id)}>
                      <Edit />
                    </button>
                    <button
                      className="ml-1  text-sm"
                      onClick={() => openDeleteDeckModal(deck.id)}>
                      <Trash />
                    </button>
                  </div>
                </li>
              </ul>
            );
          })
        )}
        {errorMessagesOnFetch === "unexpected-error" ? (
          <span className="pl-1 pt-2 text-red-400 text-sm">
            Unexpected error occured.
          </span>
        ) : null}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="py-2 px-5 bg-indigo-600 text-sm text-white rounded"
          onClick={openCreateDeckModal}>
          Create New Deck
        </button>
        <button className="py-2 px-5 bg-indigo-600 text-sm text-white rounded">
          Browse
        </button>
      </div>
      <MyModal
        isOpen={isEditDeckModalOpen}
        setOpen={setEditDeckModal}
        title={"Edit Deck"}>
        <EditDeck closeEditDeckModal={closeEditDeckModal} />
      </MyModal>
      <MyModal
        isOpen={isDeleteDeckModalOpen}
        setOpen={setDeleteDeckModal}
        title="Delete Deck">
        <DeleteDeck closeDeleteDeckModal={closeDeleteDeckModal} />
      </MyModal>
      <MyModal
        isOpen={isAddCardModalOpen}
        setOpen={setAddCardModalOpen}
        title="Add Card"
        size="lg">
        <AddCards />
      </MyModal>
      <MyModal
        title="Create Deck"
        isOpen={isCreateDeckModalOpen}
        setOpen={setCreateDeckModalOpen}>
        <CreateDeck closeCreateDeckModal={handleCloseCreateDeckModal} />
      </MyModal>
    </div>
  );
}

export default DeckList;
