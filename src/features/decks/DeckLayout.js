import { Outlet } from "react-router-dom";

import DeckList from "features/decks/DeckList";
import UpdatesModal from "features/updates-modal/UpdatesModal";

function DeckLayout() {
  return (
    <>
      <div className="mt-5 flex justify-between items-center">
        <img src="images/logo.png" alt="Gorilla Cards" className="w-18 h-12" />
        <UpdatesModal />
      </div>
      <div className="flex">
        <DeckList />
        <Outlet />
      </div>
    </>
  );
}

export default DeckLayout;
