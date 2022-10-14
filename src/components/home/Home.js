import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to English Guru</h1>
      <p>
        npm install react-hook-form <Link to="/signup">Signup</Link>
      </p>
      <p>
        Already a member? Click to login. <Link to="/signin">Signin</Link>
      </p>
    </div>
  );
}

export default Home;
