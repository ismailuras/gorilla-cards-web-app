import { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai"

function ShowPassword({ children }) {

   const [inputType, setInputType] = useState("password")
   const isVisible = inputType === "text"
   const handleVisible = () => {
     setInputType((val) => {
      if(val === "password") return "text"
       return "password"
     })
   }

  return <div className="relative">{children(inputType)}
  <button type="button" onClick={handleVisible}>{ isVisible ? <AiOutlineEyeInvisible /> : <AiFillEye /> }</button>
  </div>;
}

export default ShowPassword;
