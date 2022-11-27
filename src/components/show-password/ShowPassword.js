import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
function ShowPassword({ children }) {
  const [inputType, setInputType] = useState("password");
  const isVisible = inputType === "text";
  const handleVisible = () => {
    setInputType((val) => {
      if (val === "password") return "text";
      return "password";
    });
  };

  return (
    <>
      {children(inputType)}
      <button
        className="right-4 top-4 absolute"
        type="button"
        onClick={handleVisible}
      >
        {isVisible ? (
          <EyeOff className="flex-none text-gray-400 h-6 w-6" />
        ) : (
          <Eye className="flex-none text-gray-400 h-6 w-6" />
        )}
      </button>
    </>
  );
}

export default ShowPassword;
