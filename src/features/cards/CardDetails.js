import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { useParams } from "react-router-dom";
import { getSingleCard } from "./cardSlice";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import ReactMarkdown from "react-markdown";
import MyModal from "components/MyModal";

function CardDetails() {
  const currentCard = useSelector((state) => state.cards.currentCard);
  const getSingleCardStatus = useSelector(
    (state) => state.cards.getSingleCardStatus
  );
  const [isOpenDeleteCardModal, setOpenDeleteCardModal] = useState(false);
  const [isOpenEditCardModal, setOpenEditCardModal] = useState(false);
  const dispatch = useDispatch();

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

  const { cardId } = useParams();

  useEffect(() => {
    dispatch(getSingleCard({ cardId }));
  }, [dispatch, cardId]);

  if (getSingleCardStatus === "loading") return "Loading...";

  return (
    <>
      <div className="relative w-2/5 flex-1">
        <div className="mt-4 flex flex-none justify-end gap-3 mr-3">
          <button
            onClick={openDeleteCardModal}
            className="flex h-12 items-center rounded-lg bg-red-500 px-4 text-white transition hover:bg-red-400">
            <Trash2 className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">Delete</span>
          </button>
          <button
            onClick={openEditCardModal}
            className="flex h-12 items-center rounded-lg bg-blue-500 px-4 text-white transition hover:bg-blue-400">
            <Edit className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>
        <div className="flex flex-col p-5">
          <div className="grow overflow-auto">
            <div className="mb-10">
              <div className="text-2xl font-semibold mb-5">Front</div>
              <div>
                <ReactMarkdown className="ml-5text-lg">
                  {`${currentCard.note.front}
                `}
                </ReactMarkdown>
              </div>
            </div>
            <div className="mb-10">
              <div className="text-2xl font-semibold mb-5">Back</div>
              <div>
                <ReactMarkdown className="ml-5text-lg">
                  {`${currentCard.note.back}
                `}
                </ReactMarkdown>
              </div>
            </div>
          </div>
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
        <EditCard closeEditCardModal={closeEditCardModal} />
      </MyModal>
    </>
  );
}

export default CardDetails;
