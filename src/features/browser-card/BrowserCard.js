import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSeedList } from "features/seed-cards/seedSlice";
import Accordion from "components/Acordion";

import image from "assets/images/marketing.png";

function BrowserCard() {
  const seed = useSelector((state) => state.seed.seed);
  console.log(seed);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeedList());
  }, [dispatch]);

  return (
    <>
      {seed.map((item) => (
        <Accordion key={item.id} {...item} img={image} />
      ))}

      <button className="px-3 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
        Prewiev
      </button>
    </>
  );
}

export default BrowserCard;
