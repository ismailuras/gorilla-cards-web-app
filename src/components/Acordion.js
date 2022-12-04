import { useState } from "react";
import { ArrowUp, ArrowDown } from "react-feather";

function Accordion({ name, img }) {
  const [isActiveAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="flex">
      <div>
        {name}
        <button onClick={() => setActiveAccordion(!isActiveAccordion)}>
          {isActiveAccordion ? <ArrowDown /> : <ArrowUp />}
        </button>
      </div>
      <div className="">
        <img className="w-28" src={img} alt="" />
      </div>
    </div>
  );
}

export default Accordion;
