import Spinner from "./features/spinner/Spinner";

function Button({ children, isLoading }) {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="bg-indigo-600 text-white text-xl py-2 px-6 my-10 rounded hover:bg-indigo-700">
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

export default Button;
