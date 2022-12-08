import Modal from "react-modal";
import { X } from "react-feather";

Modal.setAppElement("#root");

function MyModal({ title, children, isOpen, setOpen, size = "md" }) {
  function closeModal() {
    setOpen(false);
  }

  const modalSize = () => {
    switch (size) {
      case "md":
        return "w-[720px]";
      case "lg":
        return "w-[1200px]";
      default:
        return "w-[720px]";
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="container mx-auto h-full flex items-center justify-center">
        <div className={`shadow-lg rounded-lg bg-white ${modalSize()}`}>
          <div className="flex justify-between items-center p-5 border-b-2">
            <div className="font-semibold text-xl">{title}</div>
            <button
              type="button"
              className="w-10 h-10 -my-5 flex items-center justify-center rounded-full text-gray-500 font-bold text-xl bg-gray-100 hover:bg-gray-200"
              onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          <div className="px-5 py-8 overflow-auto">{children}</div>
        </div>
      </Modal>
    </div>
  );
}

export default MyModal;
