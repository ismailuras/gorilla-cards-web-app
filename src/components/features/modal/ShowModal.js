import { useState } from "react";
import Modal from "react-modal";
import Button from "components/Button";
import ForgotPassword from "../forgot-password/ForgotPassword";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#C8DBBE",
  },
};

function ShowModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  return (
    <>
      <Button onClick={openModal} variant="secondary">
        Forgot Password ?
      </Button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
        <ForgotPassword closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default ShowModal;
