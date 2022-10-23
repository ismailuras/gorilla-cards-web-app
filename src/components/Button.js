import Spinner from "./features/spinner/Spinner";

function Button({ children, loading, onClick, variant = "primary" }) {
  const variants = {
    primary:
      "  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2",
    secondary:
      "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={variants[variant]}>
      {loading ? <Spinner variant loading={loading} /> : children}
    </button>
  );
}

export default Button;
