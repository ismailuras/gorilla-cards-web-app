import { Routes, Route, Link } from "react-router-dom";
import Home from "components/home/Home";
import Signup from "components/signup/Signup";
import Signin from "components/signin/Signin";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
