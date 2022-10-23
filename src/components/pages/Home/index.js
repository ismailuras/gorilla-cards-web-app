import { Link } from "react-router-dom";

function Home() {
  const linkStyles = ["font-bold ml-5 underline"];
  const paragrafStyles = [" text-2xl mt-5"];

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-4xl p-4">Welcome to English Guru</h1>
      <p className={paragrafStyles.join(" ")}>
        If not, click to create a user account.
        <Link className={linkStyles.join(" ")} to={"/signup"}>
          Signup
        </Link>
      </p>
      <p className={paragrafStyles.join(" ")}>
        Already a member? Click to login.{" "}
        <Link className={linkStyles.join(" ")} to={"/signin"}>
          Signin
        </Link>
      </p>
    </div>
  );
}

export default Home;
