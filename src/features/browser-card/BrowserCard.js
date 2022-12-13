import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeedList } from "features/browser-card/seedSlice";
import { Spinner } from "@chakra-ui/react";
import CardAccordion from "components/CardAccordion";
import PreviewWords from "./PreviewWords";

function BrowserCard() {
  const fetchSeedListStatus = useSelector(
    (state) => state.seed.fetchSeedListStatus
  );
  const [previewData, setPreviewData] = useState({});
  const [isPreviewWordsOpen, setPreviewWordsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeedList());
  }, [dispatch]);

  const getSeed = ({ offset, total }, currentSeed) => {
    setPreviewWordsOpen(true);
    setPreviewData({ offset, total, currentSeed });
  };

  if (isPreviewWordsOpen)
    return (
      <PreviewWords backToParent={setPreviewWordsOpen} data={previewData} />
    );

  return (
    <>
      {fetchSeedListStatus === "loading" ? (
        <div className="w-full text-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </div>
      ) : (
        <CardAccordion getSeed={getSeed} />
      )}
    </>
  );
}

export default BrowserCard;
