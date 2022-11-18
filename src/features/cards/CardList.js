import { useEffect, useState } from "react";
import { fetchCards } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import EditCardModal from "./EditCardModal";
import EditCard from "./EditCard";

function CardList() {
  const [isOpenEditCardModal, setOpenEditCardModal] = useState(false);
  const cards = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();

  const openEditCardModal = () => {
    setOpenEditCardModal(true);
  };

  const { id } = useParams();
  const mdToStr = (str) => {
    let newStr = str.replace(/#/g, "");
    if (newStr.length > 10) {
      newStr = `${newStr.slice(0, 7)}...`;
    }
    return newStr;
  };

  useEffect(() => {
    dispatch(fetchCards({ id }));
  }, [id, dispatch]);

  return (
    <div className="p-5 h-full border">
      <div>
        <div className="flex justify-between">
          <h6>front</h6>
          <h6>back</h6>
        </div>
        <div>
          <button
            onClick={openEditCardModal}
            className="bg-red-500 px-6 py-2 text-white font-medium rounded">
            Edit
          </button>
          <EditCardModal
            isOpen={isOpenEditCardModal}
            setOpen={setOpenEditCardModal}
            title="Edit Card">
            <EditCard />
          </EditCardModal>
        </div>
        {cards.map((card = {}, i) => (
          <ul key={i} className="flex justify-center">
            <li className="flex justify-between">
              <ReactMarkdown className="border px-24 py-11">
                {`${mdToStr(card?.note?.front || "")} ${mdToStr(
                  card?.note?.back || ""
                )}
                `}
              </ReactMarkdown>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default CardList;
