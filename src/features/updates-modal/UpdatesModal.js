import { useState } from "react";
import { Settings } from "react-feather";
import Logout from "features/logout/Logout";
import MyModal from "components/MyModal";
import UpdateEmail from "features/update-email/UpdateEmail";
import UpdatePassword from "features/update-password/UpdatePassword";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function UpdatesModal() {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  return (
    <div>
      <header className="flex justify-center items-center mr-4">
        <Logout />
        <Tippy
          placement="auto-end"
          interactive={true}
          trigger="click"
          content={
            <div>
              <button
                onClick={openUpdateModal}
                className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white p-2 rounded ml-5">
                Update Email And Password
              </button>
            </div>
          }>
          <button type="button" className="text-xl">
            <Settings />
          </button>
        </Tippy>
      </header>
      <div>
        <MyModal
          isOpen={isUpdateModalOpen}
          setOpen={setUpdateModalOpen}
          title="Update User Profile">
          <UpdateEmail />
          <UpdatePassword />
        </MyModal>
      </div>
    </div>
  );
}

export default UpdatesModal;
