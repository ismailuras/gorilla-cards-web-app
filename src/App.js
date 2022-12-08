import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "components/home";
import Signup from "features/auth-user/signup/Signup";
import Signin from "features/auth-user/signin/Signin";
import RequireAuthRoute from "components/require-auth-route/RequireAuthRoute";
import Redirector from "components/redirector/Redirector";
import RequireNotLogin from "components/require-not-login/RequireNotLogin";
import DeckLayout from "features/decks/DeckLayout";
import CardList from "features/cards/CardList";
import CardDetails from "features/cards/CardDetails";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Redirector />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/signup"
          element={
            <RequireNotLogin>
              <Signup />
            </RequireNotLogin>
          }
        />
        <Route
          path="/signin"
          element={
            <RequireNotLogin>
              <Signin />
            </RequireNotLogin>
          }
        />
        <Route
          path="/decks"
          element={
            <RequireAuthRoute>
              <DeckLayout />
            </RequireAuthRoute>
          }>
          <Route path=":deckId" element={<CardList />}>
            <Route path="cards/:cardId" element={<CardDetails />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
