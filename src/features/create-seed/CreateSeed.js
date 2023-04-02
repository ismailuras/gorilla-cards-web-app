import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { createSeed } from "./createSeedSlice";

function CreateSeed({ checkedSeedItems }) {
  const dispatch = useDispatch();

  const handleCreateSeed = () => {
    const { id, deckName, offset } = checkedSeedItems;
    try {
      dispatch(createSeed({ id, deckName, offset })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleCreateSeed}>Continue</Button>
    </React.Fragment>
  );
}

export default CreateSeed;
