import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    width: "1200px",
    margin: "0 auto",
  },
};

function AddCardsModal({ isOpen, setOpen, title, children }) {
  function closeModal() {
    setOpen(false);
  }
  return (
    <div>
      <Modal isOpen={isOpen} style={customStyles} title={title}>
        <button
          className="bg-red-400 text-white text-xl rounded p-1"
          onClick={closeModal}>
          Close
        </button>
        {children}
      </Modal>
    </div>
  );
}

export default AddCardsModal;
