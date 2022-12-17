import { useEffect } from "react";
import { fetchCards } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { mdToStr } from "helpers";
import { Book } from "react-feather";
import ReactMarkdown from "react-markdown";

function CardList() {
  const cards = useSelector((state) => state.cards.cards);
  const fetchCardsStatus = useSelector((state) => state.cards.fetchCardsStatus);
  const errorMessagesOnFetch = useSelector(
    (state) => state.cards.errorMessagesOnFetch
  );

  const dispatch = useDispatch();
  const { deckId } = useParams();

  useEffect(() => {
    dispatch(fetchCards({ deckId }));
  }, [deckId, dispatch]);

  return (
    <div className="flex w-full">
      <div className="relative w-2/4 border-r-2">
        <div className="mt-5 flex flex-none justify-end gap-3 mr-5">
          <button className="flex h-12 items-center rounded-lg bg-gray-200 px-4 text-gray-700 transition hover:bg-gray-300">
            <Book className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">Study Now</span>
          </button>
        </div>
        <div className="flex flex-col p-3">
          <div className="grow overflow-auto">
            {errorMessagesOnFetch === "unexpected-error" ? (
              <span>Unexpected error occured.</span>
            ) : null}
            {fetchCardsStatus === "loading"
              ? "Loading..."
              : cards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      className="mb-2 flex h-20 cursor-pointer items-center justify-between rounded-lg bg-blue-100 text-blue-900 px-5 transition">
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}`}
                        className="grow truncate">
                        <ReactMarkdown className="truncate text-sm font-semibold">
                          {`${mdToStr(card.note.front)}`}
                        </ReactMarkdown>
                        <hr className="my-2" />
                        <ReactMarkdown className="truncate text-sm font-semibold">
                          {`${mdToStr(card.note.back)}`}
                        </ReactMarkdown>
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CardList;
