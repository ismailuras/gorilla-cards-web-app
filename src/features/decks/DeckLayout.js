import { Outlet } from "react-router-dom";
import DeckList from "features/decks/DeckList";
import UpdatesModal from "features/updates-modal/UpdatesModal";

import gorilla from "assets/images/gorilla-logo.png";

function DeckLayout() {
  return (
    <>
      <div className="mt-5 flex justify-between items-center">
        <img src={gorilla} alt="Gorilla Cards" className="w-18 h-12" />
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
