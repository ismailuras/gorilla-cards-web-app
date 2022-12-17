import { useState, useEffect } from "react";
import { ArrowLeft } from "react-feather";
import { Card, CardBody, Text, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axiosConfig";
function PreviewWords({ data: { currentSeed, offset, total }, backToParent }) {
  const [seedData, setSeedData] = useState([]);
  const [seedOffset, setSeedOffset] = useState(offset);
  const getSeedWords = () => {
    axios
      .get(`/seed/${currentSeed.id}?limit=100&offset=${seedOffset}`)
      .then((res) => {
        setSeedData((state) => {
          return [...state, ...res.data.data];
        });
        setSeedOffset((state) => {
          return state + 100;
        });
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (currentSeed.id) {
      getSeedWords();
    }
  }, [currentSeed]); //eslint-disable-line

  const getBack = () => {
    backToParent(false);
  };

  return (
    <>
      <button className="mb-4" onClick={getBack}>
        <ArrowLeft />
      </button>
      <InfiniteScroll
        dataLength={seedData.length}
        next={getSeedWords}
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
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {seedData.map((words) => (
          <Card key={words.id}>
            <CardBody>
              <Text fontSize="2xl">{words.title}</Text>
            </CardBody>
          </Card>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default PreviewWords;
