import { useEffect, useState } from "react";
import { fetchCards } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyModal from "components/MyModal";
import ReactMarkdown from "react-markdown";
import EditCard from "./EditCard";

function CardList() {
  const [isOpenEditCardModal, setOpenEditCardModal] = useState(false);
  const errorMessageOnFetch = useSelector(
    (state) => state.cards.errorMessageOnFetch
  );
  const cards = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();

  const openEditCardModal = () => {
    setOpenEditCardModal(true);
  };

  const { id } = useParams();
  const mdToStr = (str) => {
    let newStr = str.replace(/ `!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?~]/, "");
    if (newStr.length > 10) {
      newStr = `${newStr.slice(0, 30)}...`;
    }
    return newStr;
  };

  useEffect(() => {
    dispatch(fetchCards({ id }));
  }, [id, dispatch]);

  return (
    <div className="w-1/3 h-screen p-5 border-4 ml-5 mt-2">
      <div className="flex justify-end items-center text-lg font-normal">
        {errorMessageOnFetch && <div>Unexptected error occured.</div>}
        <button className="py-2 px-5 bg-indigo-600 text-sm mr-3 text-white rounded">
          Add Card
        </button>
        <button
          className="py-2 px-5 bg-indigo-600 text-sm mr-3 text-white rounded"
          onClick={openEditCardModal}>
          Edit
        </button>
        <button className="py-2 px-5 bg-indigo-600 text-sm mr-3 text-white rounded">
          Study Now
        </button>
      </div>
      {cards.map((card = {}) => (
        <div
          key={card.id}
          className="border-4 border-rose-800 p-5 mb-3 mt-3 flex flex-col">
          <ReactMarkdown className="p-2 text-lg">
            {`${mdToStr(card?.note?.front || "")}
                `}
          </ReactMarkdown>
          <ReactMarkdown className="text-lg">{` ${mdToStr(
            card?.note?.back || ""
          )}`}</ReactMarkdown>
        </div>
      ))}
      <MyModal
        isOpen={isOpenEditCardModal}
        setOpen={setOpenEditCardModal}
        title="Edit Card"
        size="lg">
        <EditCard />
      </MyModal>
    </div>
  );
}

export default CardList;
