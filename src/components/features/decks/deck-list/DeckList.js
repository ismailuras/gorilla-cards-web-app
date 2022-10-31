import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks } from "stores/deckSlice";
function DeckList() {
  const items = useSelector((state) => state.decks.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-start ml-10">
      {items.length === 0 ? (
        <p>"There is no deck!"</p>
      ) : (
        items.map((item, i) => <div key={i}>{item.deckName}</div>)
      )}
      <button className="underline text-blue-600 rounded font-medium text-xl p-1 cursor-pointer"></button>
      <button className="underline text-blue-600 rounded font-medium text-xl p-1 cursor-pointer"></button>
    </div>
  );
}

export default DeckList;
