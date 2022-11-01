import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks } from "stores/deckSlice";
import { MdEditNote } from "react-icons/md";
import { useState } from "react";
import EditDeck from "components/features/decks/EditDeck";
import MyModal from "../modal/MyModal";

function DeckList() {
  const [isEditDeckModalOpen, setEditDeckModal] = useState(false);
  const items = useSelector((state) => state.decks.items);
  const errorMessageOnFetched = useSelector((state) => state.decks.erroMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  const openUpdateDeckModal = () => {
    setEditDeckModal(true);
  };

  return (
    <div className="flex flex-col items-start ml-10">
      {items.length === 0 ? (
        <p>"There is no deck!"</p>
      ) : (
        items.map((item, i) => (
          <div className="w-full" key={i}>
            <ul>
              <li className="w-full underline text-blue-600 text-xl flex justify-between">
                {item.deckName}
                <button onClick={openUpdateDeckModal}>
                  <MdEditNote />
                </button>
              </li>
            </ul>
            {errorMessageOnFetched && <p>Unexpected error occured.</p>}
          </div>
        ))
      )}
      <div>
        <MyModal
          isOpen={isEditDeckModalOpen}
          setOpen={setEditDeckModal}
          title={"Edit Deck"}>
          <EditDeck />
        </MyModal>
      </div>
      <button className="underline text-blue-600 rounded font-medium text-xl p-1 cursor-pointer">
        What am i?
      </button>
      <div>{errorMessageOnFetched && <p>Unexpected error occured.</p>}</div>
    </div>
  );
}

export default DeckList;
