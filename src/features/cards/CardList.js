import { useEffect } from "react";
import { fetchCards } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { mdToStr } from "helpers";
import { Plus, Book } from "react-feather";
import ReactMarkdown from "react-markdown";

function CardList() {
  const cards = useSelector((state) => state.cards.cards);
  const fetchCardsStatus = useSelector((state) => state.cards.fetchCardsStatus);
  const dispatch = useDispatch();
  const errorMessagesOnFetch = useSelector(
    (state) => state.cards.errorMessagesOnFetch
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCards({ id }));
  }, [id, dispatch]);

  if (cards.length === 0)
    return <span className="p-6">There is no deck yet.</span>;

  return (
    <div className="flex w-full">
      <div className="relative w-2/4 border-r-2">
        <div className="flex h-full flex-col p-5">
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
                        to={`/decks/${card.deckId}/cards/${card.id}`}
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
          <div className="mt-4 flex flex-none justify-end gap-3">
            <button className="flex h-12 items-center rounded-lg bg-gray-200 px-4 text-gray-700 transition hover:bg-gray-300">
              <Book className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">Study Now</span>
            </button>
            <button className="flex h-12 items-center rounded-lg bg-blue-500 px-4 text-white transition hover:bg-blue-400">
              <Plus className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">Add Card</span>
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CardList;
