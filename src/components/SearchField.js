import { Search } from "react-feather";
function SearchField({ isShowDecksSearchField }) {
  return (
    <div
      className={
        isShowDecksSearchField
          ? "flex h-12 grow items-center rounded-lg border-2 px-5 mt-3"
          : "flex h-12 grow items-center rounded-lg border-2 px-5"
      }>
      <input
        type="text"
        className="grow outline-none text-gray-700 font-medium"
        placeholder="Search in decks..."
      />
      <Search className="h-8 flex-none text-gray-300" />
    </div>
  );
}

export default SearchField;
