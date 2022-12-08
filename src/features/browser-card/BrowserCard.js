import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSeedList } from "features/seed-cards/seedSlice";
import axios from "axiosConfig";
import MyAccordion from "components/MyAccordion";
import MyModal from "components/MyModal";
import InfiniteScroll from "react-infinite-scroll-component";

function BrowserCard() {
  const seed = useSelector((state) => state.seed.seed);
  const [isOpenSeedWordsModal, setOpenSeedWordsModal] = useState(false);
  const [currentSeed, setCurrentSeed] = useState({});
  const [seedOffset, setSeedOffset] = useState(0);
  const [seedData, setSeedData] = useState([]);
  const dispatch = useDispatch();

  const openSeedWordsModal = (item) => {
    setOpenSeedWordsModal(true);
    setCurrentSeed(item);
  };

  const getSeedWords = () => {
    axios
      .get(`/seed/${currentSeed.id}?limit=20&offset=${seedOffset}`)
      .then((res) => {
        setSeedData((state) => {
          return [...state, ...res.data.data];
        });
        setSeedOffset((state) => {
          return state + 20;
        });
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (currentSeed.id) {
      getSeedWords();
    }
  }, [currentSeed]); //eslint-disable-line

  useEffect(() => {
    dispatch(getSeedList());
  }, [dispatch]);

  return (
    <>
      {seed.map((item) => (
        <div key={item.id}>
          <MyAccordion
            item={item}
            openSeedWordsModal={openSeedWordsModal}
            key={item.id}
            {...item}
          />
        </div>
      ))}
      <MyModal
        isOpen={isOpenSeedWordsModal}
        setOpen={setOpenSeedWordsModal}
        title={currentSeed.name}>
        <InfiniteScroll
          dataLength={seedData.length}
          next={getSeedWords}
          hasMore={currentSeed.total > seedData.length}
          height={400}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {seedData.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </InfiniteScroll>
      </MyModal>
    </>
  );
}

export default BrowserCard;
