import { Outlet } from "react-router-dom";
import DeckList from "features/decks/DeckList";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "react-feather";
import { userLogout } from "features/auth-user/authSlice";
import gorilla from "assets/images/gorilla-logo.png";
import NoCards from "features/cards/NoCards";

function DeckLayout() {
  const cards = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogout());
  };

  return (
    <>
      <header className="flex justify-between items-center border-b-2 bg-white">
        <div className="flex w-full items-center justify-between px-5">
          <div className="h-[60px] py-2">
            <img src={gorilla} className="h-full" alt="Gorilla Cards" />
          </div>
          <span className="flex items-center rounded-lg p-2">
            <LogOut className="h-5" />
            <button type="button" onClick={handleLogOut}>
              <span className="ml-2 font-medium">Log out</span>
            </button>
          </span>
        </div>
      </header>
      <div style={{ height: "calc(100vh - 62px)" }}>
        <div className="flex h-full">
          <DeckList />
          {cards.length === 0 ? <NoCards /> : <Outlet />}
        </div>
      </div>
    </>
  );
}
export default DeckLayout;
