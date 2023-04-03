import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { createSeed } from "features/browse-card/seedSlice";

function CreateSeed({ checkedSeedItems, closeBrowseCardModal }) {
  const creatSeedStatus = useSelector((state) => state.seed.createSeedStatus);
  console.log(checkedSeedItems);

  const dispatch = useDispatch();

  const handleCreateSeed = () => {
    const { id, deckName, offset } = checkedSeedItems;
    try {
      dispatch(createSeed({ id, deckName, offset })).unwrap();
      closeBrowseCardModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleCreateSeed}
        colorScheme="blue"
        variant="solid"
        size="md"
        disabled={checkedSeedItems === ""}
        isLoading={creatSeedStatus === "loading"}
        loadingText="Loading...">
        Continue
      </Button>
    </React.Fragment>
  );
}

export default CreateSeed;
