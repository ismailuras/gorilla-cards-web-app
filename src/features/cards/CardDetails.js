import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Edit, Trash } from "react-feather";
import { setCurrentCard } from "./cardSlice";
import { mdToStr } from "helpers";
import ReactMarkdown from "react-markdown";
import MyModal from "components/MyModal";
import DeleteCard from "./DeleteCard";

function CardDetails() {
  const cards = useSelector((state) => state.cards.cards);
  const [isOpenDeleteCardModal, setOpenDeleteCardModal] = useState(false);
  const dispatch = useDispatch();

  const openDeleteCardModal = (id) => {
    dispatch(setCurrentCard({ id }));
    setOpenDeleteCardModal(true);
  };

  const closeDeleteCardModal = () => {
    setOpenDeleteCardModal(false);
  };

  return (
    <>
      {cards.map((card) => {
        return (
          <div
            className="w-[550px] border-4 border-rose-800 p-5 mb-3 mt-3 cursor-pointer flex"
            key={card.id}>
            <button onClick={() => openDeleteCardModal(card.id)}>
              <Trash />
            </button>
            <button>
              <Edit />
            </button>
            <div>
              <ReactMarkdown className="ml-5text-lg">
                {`${mdToStr(card?.note?.front)}
                `}
              </ReactMarkdown>
              <ReactMarkdown className="ml-5text-lg">{` ${mdToStr(
                card?.note?.back
              )}`}</ReactMarkdown>
            </div>
          </div>
        );
      })}
      <MyModal
        isOpen={isOpenDeleteCardModal}
        setOpen={setOpenDeleteCardModal}
        title="Delete Card">
        <DeleteCard closeDeleteCardModal={closeDeleteCardModal} />
      </MyModal>
    </>
  );
}

export default CardDetails;
