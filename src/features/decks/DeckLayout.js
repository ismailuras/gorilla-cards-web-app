import { useState } from "react";
import { Outlet } from "react-router-dom";
import MyModal from "components/MyModal";
import CreateDeck from "features/decks/CreateDeck";
import DeckList from "features/decks/DeckList";
import AddCardsModal from "features/decks/AddCardsModal";
import AddCards from "features/cards/AddCards";
import UpdatesModal from "features/updates-modal/UpdatesModal";

function DeckLayout() {
  const [isCreateDeckModalOpen, setCreateDeckModalOpen] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);

  const openCreateDeckModal = () => {
    setCreateDeckModalOpen(true);
  };
  const handleCloseCreateDeckModal = () => {
    setCreateDeckModalOpen(false);
  };
  const openAddCardModal = () => {
    setAddCardModalOpen(true);
  };

  return (
    <div className="flex">
      <div className="w-96 h-screen border flex-initial mt-10">
        <DeckList />
        <button
          onClick={openCreateDeckModal}
          className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white p-2 rounded mt-5">
          Create New Deck
        </button>

        <MyModal
          title="Create Deck"
          isOpen={isCreateDeckModalOpen}
          setOpen={setCreateDeckModalOpen}>
          <CreateDeck closeCreateDeckModal={handleCloseCreateDeckModal} />
        </MyModal>
        <button
          onClick={openAddCardModal}
          className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white p-2 rounded">
          Add Card
        </button>
      </div>
      <AddCardsModal
        isOpen={isAddCardModalOpen}
        setOpen={setAddCardModalOpen}
        title="Add Card">
        <AddCards />
      </AddCardsModal>
      <div className="w-[600px]">
        <Outlet />
      </div>
      <div>
        <UpdatesModal />
      </div>
    </div>
  );
}

export default DeckLayout;
