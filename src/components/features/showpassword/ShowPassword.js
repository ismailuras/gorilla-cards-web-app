import { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    <div className="relative w-full">
      {children(inputType)}
      <button
        className="absolute text-2xl top-1 right-3"
        type="button"
        onClick={handleVisible}>
        {isVisible ? <AiOutlineEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
  );
}

export default ShowPassword;
