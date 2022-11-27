import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Edit, Trash } from "react-feather";
import { mdToStr } from "helpers";
import { useParams } from "react-router-dom";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import ReactMarkdown from "react-markdown";
import MyModal from "components/MyModal";
import { setCurrentCard } from "./cardSlice";

function CardDetails() {
  const currentCard = useSelector((state) => state.cards.currentCard);
  const cards = useSelector((state) => state.cards.cards);
  const [isOpenDeleteCardModal, setOpenDeleteCardModal] = useState(false);
  const [isOpenEditCardModal, setOpenEditCardModal] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    // this cards will be removed after using card-detail endpoint.
    if (cards && cards.length > 0) {
      dispatch(setCurrentCard({ id }));
    }
  }, [dispatch, cards, id]);

  const openDeleteCardModal = () => {
    setOpenDeleteCardModal(true);
  };

  const closeDeleteCardModal = () => {
    setOpenDeleteCardModal(false);
  };

  const openEditCardModal = () => {
    setOpenEditCardModal(true);
  };

  const closeEditCardModal = () => {
    setOpenEditCardModal(false);
  };

  return (
    <>
      <div className="w-[550px] border-4 border-rose-800 p-5 mb-3 mt-3 cursor-pointer flex">
        <button onClick={openDeleteCardModal}>
          <Trash />
        </button>
        <button onClick={openEditCardModal}>
          <Edit />
        </button>
        <div>
          <ReactMarkdown className="ml-5text-lg">
            {`${mdToStr(currentCard?.note?.front)}
                `}
          </ReactMarkdown>
          <ReactMarkdown className="ml-5text-lg">{` ${mdToStr(
            currentCard?.note?.back
          )}`}</ReactMarkdown>
        </div>
      </div>
      <MyModal
        isOpen={isOpenDeleteCardModal}
        setOpen={setOpenDeleteCardModal}
        title="Delete Card">
        <DeleteCard closeDeleteCardModal={closeDeleteCardModal} />
      </MyModal>
      <MyModal
        isOpen={isOpenEditCardModal}
        setOpen={setOpenEditCardModal}
        title="Edit Card"
        size="lg">
        <EditCard closeDeleteCardModal={closeEditCardModal} />
      </MyModal>
    </>
  );
}

export default CardDetails;
