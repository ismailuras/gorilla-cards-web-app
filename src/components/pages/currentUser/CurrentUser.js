import { auth } from "firebaseConfig";
import { signOut } from "firebase/auth";
import { showToast } from "helpers";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import MyModal from "components/features/modal/MyModal";
import UpdateEmail from "components/features/update-email/UpdateEmail";
import UpdatePassword from "components/features/update-password/UpdatePassword";
import CreateDeck from "components/features/decks/create-deck/CreateDeck";
import DeckList from "components/features/decks/deck-list/DeckList";

function CurrentUser() {
  const [user, loading, error] = useAuthState(auth);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isCreateDeckModalOpen, setCreateDeckModalOpen] = useState(false);

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };
  const openCreateDeckModal = () => {
    setCreateDeckModalOpen(true);
  };

  const handleLogout = () => {
    signOut(auth).catch(() => {
      return showToast("Unexpected error occured", "error");
    });
  };

  return (
    <div className="flex">
      <div className="w-96 h-screen border flex-initial mt-10">
        <div>
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
            <CreateDeck />
          </MyModal>
        </div>
      </div>
      <div className="w-96 h-screen border flex-1  mt-10"></div>
      <div className="w-96 h-screen border flex-1 mt-10">
        <div className="p-10">
          {loading && (
            <div>
              <span>Initialising User</span>
            </div>
          )}
          {error && showToast("Unexpected error occured", "error")}
          {user && (
            <div>
              <span className="text-2xl">Welcome {user.email}</span>
            </div>
          )}
          <div>
            <button
              className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white p-2 rounded"
              onClick={handleLogout}>
              Logout
            </button>
            <button
              onClick={openUpdateModal}
              className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white p-2 rounded ml-5">
              Update Email And Password
            </button>
          </div>
          <MyModal
            isOpen={isUpdateModalOpen}
            setOpen={setUpdateModalOpen}
            title="Update User Profile">
            <UpdateEmail />
            <UpdatePassword />
          </MyModal>
        </div>
      </div>
    </div>
  );
}

export default CurrentUser;
