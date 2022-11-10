import Spinner from "./spinner/Spinner";

function Button({ children, loading, onClick }) {
  const common = ["text-white font-medium rounded p-2"];
  const primary = [...common, "bg-indigo-600 hover:bg-indigo-400 mb-6"];

  return (
    <button onClick={onClick} disabled={loading} className={primary.join(" ")}>
      {loading ? <Spinner classNames={primary.join(" ")} /> : children}
    </button>
  );
}

export default Button;
