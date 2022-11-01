import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks } from "stores/deckSlice";

function DeckList() {
  const items = useSelector((state) => state.decks.items);
  const errorMessageOnFetched = useSelector((state) => state.decks.erroMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-start ml-10">
      {items.length === 0 ? (
        <p>"There is no deck!"</p>
      ) : (
        items.map((item, i) => (
          <div className="w-full" key={i}>
            <ul>
              <li className="w-full underline text-blue-600 text-xl flex justify-between">
                {item.deckName}
              </li>
            </ul>
            {errorMessageOnFetched && <p>Unexpected error occured.</p>}
          </div>
        ))
      )}

      <button className="underline text-blue-600 rounded font-medium text-xl p-1 cursor-pointer">
        What am i?
      </button>
      <div>{errorMessageOnFetched && <p>Unexpected error occured.</p>}</div>
    </div>
  );
}

export default DeckList;
