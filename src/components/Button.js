import Spinner from "./features/spinner/Spinner";

function Button({ children, loading, isLoading }) {
  return (
    <button
      disabled={loading}
      type="submit"
      className={
        loading
          ? "opacity-60 bg-indigo-600 text-white text-xl py-2 px-6 my-10 rounded"
          : "bg-indigo-600 text-white text-xl py-2 px-6 my-10 rounded hover:bg-indigo-700"
      }>
      {loading ? <Spinner loading={loading} /> : children}
    </button>
  );
}

export default Button;
