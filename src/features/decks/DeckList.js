import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks, setCurrentDeck } from "features/decks/deckSlice";
import { Link } from "react-router-dom";
import { Edit, Trash } from "react-feather";
import { Plus, Search } from "react-feather";
import { Button } from "@chakra-ui/react";
import BrowseCard from "../browse-card/BrowseCard";
import CreateDeck from "features/decks/CreateDeck";
import AddCards from "features/cards/AddCards";
import MyModal from "components/MyModal";
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
  const [isOpenBrowserCardModal, setOpenBrowserCardModal] = useState(false);

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

  const openBrowserCardModal = () => {
    setOpenBrowserCardModal(true);
  };

  const handleCloseBrowseCardModal = () => {
    setOpenBrowserCardModal(false);
  };

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="relative w-1/3 border-r-2">
      <div className="h-full p-5">
        <div className="mb-4">
          <div className="flex justify-start gap-3">
            <Button
              isDisabled={decks.length === 0}
              colorScheme="linkedin"
              onClick={openAddCardModal}
              className="flex h-12 items-center rounded-lg bg-blue-500 px-4 text-white transition hover:bg-blue-400">
              <Plus className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">Add Card</span>
            </Button>
          </div>
        </div>
        <div className="grow overflow-auto">
          {fetchDeckStatus === "loading" ? <span>Loading...</span> : null}
          {errorMessagesOnFetch === "unexpected-error" && (
            <span className="pl-1 pt-2 text-red-400 text-sm">
              Unexpected error occured.
            </span>
          )}
          {decks.length === 0 ? (
            <span>There is no deck yet.</span>
          ) : (
            decks.map((deck) => {
              return (
                <div
                  key={deck.id}
                  className="mb-2 flex h-14 cursor-pointer items-center justify-between rounded-lg bg-gray-100 px-5 transition hover:bg-gray-200">
                  <Link
                    to={`/decks/${deck.id}`}
                    className="grow truncate font-semibold">
                    {deck.name}
                  </Link>
                  <button
                    className="flex h-8 w-8 flex-none items-center justify-center"
                    onClick={() => openUpdateDeckModal(deck.id)}>
                    <Edit />
                  </button>
                  <button
                    className="flex h-8 w-8 flex-none items-center justify-center"
                    onClick={() => openDeleteDeckModal(deck.id)}>
                    <Trash />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="flex justify-start mt-4 gap-3">
          <Button
            colorScheme="linkedin"
            onClick={openCreateDeckModal}
            className="flex h-12 items-center rounded-lg bg-blue-500 px-4 text-white transition hover:bg-blue-400">
            <Plus className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">Add Deck</span>
          </Button>
          <Button
            colorScheme="linkedin"
            onClick={openBrowserCardModal}
            className="flex h-12 items-center rounded-lg bg-gray-200 px-4 text-gray-700 transition hover:bg-gray-300">
            <Search className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">Browse</span>
          </Button>
        </div>
      </div>
      <MyModal
        title="Create Deck"
        isOpen={isCreateDeckModalOpen}
        setOpen={setCreateDeckModalOpen}>
        <CreateDeck closeCreateDeckModal={handleCloseCreateDeckModal} />
      </MyModal>
      <MyModal
        isOpen={isAddCardModalOpen}
        setOpen={setAddCardModalOpen}
        title="Add Card">
        <AddCards />
      </MyModal>
      <MyModal
        isOpen={isDeleteDeckModalOpen}
        setOpen={setDeleteDeckModal}
        title="Delete Deck">
        <DeleteDeck closeDeleteDeckModal={closeDeleteDeckModal} />
      </MyModal>
      <MyModal
        isOpen={isEditDeckModalOpen}
        setOpen={setEditDeckModal}
        title={"Edit Deck"}>
        <EditDeck closeEditDeckModal={closeEditDeckModal} />
      </MyModal>
      <MyModal
        isOpen={isOpenBrowserCardModal}
        setOpen={setOpenBrowserCardModal}
        size="cs"
        title="Cards">
        <BrowseCard closeBrowseCardModal={handleCloseBrowseCardModal} />
      </MyModal>
    </div>
  );
}

export default DeckList;
