import { useEffect } from "react";
import { fetchCards } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CardList() {
  const cards = useSelector((state) => state.cards.cards);

  const dispatch = useDispatch();
  const errorMessagesOnFetch = useSelector(
    (state) => state.cards.errorMessagesOnFetch
  );

  const { id } = useParams();
  const mdToStr = (str) => {
    let newStr = str.replace(/ `!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?~]/, "");
    if (newStr.length > 10) {
      newStr = `${newStr.slice(0, 50)}`;
    }
    return newStr;
  };

  useEffect(() => {
    dispatch(fetchCards({ id }));
  }, [id, dispatch]);

  return (
    <div className="w-full h-screen p-5 border-4 ml-5 mt-2 flex justify-around">
      <div>
        {errorMessagesOnFetch.map((error) => (
          <div key={error}>Unexptected error occured.</div>
        ))}
        {cards.map((card = {}) => (
          <div key={card.id}>
            <div>
              <button className="py-2 px-5 bg-indigo-600 text-sm mr-3 text-white rounded">
                Study Now
              </button>
            </div>
            <div className="w-72 border-4 border-rose-800 p-5 mb-3 mt-3 cursor-pointer flex flex-col items-center">
              <Link to={`/decks/${card.deckId}/cards/${card.id}`}>
                <ReactMarkdown className="ml-5text-lg">
                  {`${mdToStr(card?.note?.front || "")}
                `}
                </ReactMarkdown>

                <ReactMarkdown className="ml-5text-lg">{` ${mdToStr(
                  card?.note?.back || ""
                )}`}</ReactMarkdown>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Outlet context={[mdToStr]} />
      </div>
    </div>
  );
}

export default CardList;
