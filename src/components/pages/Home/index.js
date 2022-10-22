import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to English Guru</h1>
      <p>
        If not, click to create a user account.{" "}
        <Link to={"/signup"}>Signup</Link>
      </p>
      <p>
        Already a member? Click to login. <Link to={"/signin"}>Signin</Link>
      </p>
      <Link to={"/user-profile"}>Profile</Link>
    </div>
  );
}

export default Home;
