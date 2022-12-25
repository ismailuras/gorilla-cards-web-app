import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "react-feather";
import { Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axiosConfig";
import TextEditor from "components/TextEditor";

function PreviewWords({ data: { currentSeed, offset, total }, backToParent }) {
  const [seedData, setSeedData] = useState([]);
  const [seedOffset, setSeedOffset] = useState(offset);
  const [seedWordsErrorMessage, setSeedWordsErrorMessage] = useState("");

  const getSeedWords = useCallback(() => {
    axios
      .get(`/seed/${currentSeed.id}?limit=100&offset=${seedOffset}`)
      .then((res) => {
        setSeedData((state) => {
          return [...state, ...res.data.data];
        });
      })
      .catch((err) => {
        if (err) {
          setSeedWordsErrorMessage("unexpected-error");
        }
      });
  }, [currentSeed.id, seedOffset]);

  const adjustSeedOffset = () => {
    setSeedOffset((state) => {
      return state + 100;
    });
  };

  useEffect(() => {
    if (currentSeed.id) {
      getSeedWords();
    }
  }, [currentSeed, getSeedWords]);

  const goBack = () => {
    backToParent(false);
  };

  return (
    <>
      <button className="mb-4" onClick={goBack}>
        <ArrowLeft />
      </button>
      {seedWordsErrorMessage === "unexpected-error" ? (
        <span>Unexpected error occured.</span>
      ) : (
        <InfiniteScroll
          dataLength={seedData.length}
          next={adjustSeedOffset}
          hasMore={total >= seedData.length}
          height={400}
          loader={
            <div className="w-full h-full flex items-center justify-center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            </div>
          }>
          <TextEditor seedData={seedData} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default PreviewWords;
