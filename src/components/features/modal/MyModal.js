import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function MyModal({ title, children, isOpen, setOpen }) {
  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <button
          className="bg-red-400 text-white text-xl rounded p-1"
          onClick={closeModal}>
          Close
        </button>
        <div>{title}</div>
        {children}
      </Modal>
    </div>
  );
}

export default MyModal;
