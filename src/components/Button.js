import Spinner from "./features/spinner/Spinner";

function Button({ children, setIsLoading }) {
  return (
    <button
      disabled={setIsLoading}
      type="submit"
      className="bg-indigo-600 text-white text-xl py-2 px-6 my-10 rounded hover:bg-indigo-700">
      {setIsLoading ? <Spinner setIsLoading={setIsLoading} /> : children}
    </button>
  );
}

export default Button;
