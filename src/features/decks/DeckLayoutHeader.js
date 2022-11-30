import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "react-feather";
import { userLogout } from "features/auth-user/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import UpdateEmail from "features/update-email/UpdateEmail";
import UpdatePassword from "features/update-password/UpdatePassword";
import MyModal from "components/MyModal";

function DeckLayoutHeader() {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleLogOut = () => {
    dispatch(userLogout);
  };

  return (
    <div className="min-w-[150px] rounded-lg border-2 bg-white p-1 z-50">
      <ul>
        <li>
          <Link
            to=""
            className="flex items-center rounded-lg p-2 text-gray-600 hover:bg-gray-100">
            <User className="h-5" />
            <span className="ml-2 text-sm font-medium">Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center rounded-lg p-2 text-gray-600 hover:bg-gray-100">
            <Settings className="h-5" />
            <button onClick={openUpdateModal}>
              <span className="ml-2 text-sm font-medium">Settings</span>
            </button>
          </Link>
        </li>
        <li>
          <span className="flex items-center rounded-lg p-2 text-gray-600 hover:bg-gray-100">
            <LogOut className="h-5" />
            <button onClick={handleLogOut}>
              <span className="ml-2 text-sm font-medium">Log out</span>
            </button>
          </span>
        </li>
      </ul>
      <MyModal
        isOpen={isUpdateModalOpen}
        setOpen={setUpdateModalOpen}
        title="Update User Profile">
        <UpdateEmail />
        <UpdatePassword />
      </MyModal>
    </div>
  );
}

export default DeckLayoutHeader;
