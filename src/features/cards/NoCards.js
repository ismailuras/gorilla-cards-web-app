import { Grid, GridItem, Text, Button } from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useState } from "react";
import AddCards from "./AddCards";
import MyModal from "components/MyModal";

import noContentImg from "assets/images/no-content-img.jpg";

function NoCards() {
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);

  return (
    <Grid placeItems="center">
      <GridItem>
        <Text className="text-xl">There is no card yet. Add a card first.</Text>
      </GridItem>
      <GridItem>
        <img className="w-96" src={noContentImg} alt="no-content" />
        <Button
          colorScheme="linkedin"
          onClick={() => setAddCardModalOpen(true)}>
          <Plus /> Add Card
        </Button>
      </GridItem>
      <GridItem className="w-96"></GridItem>
      <MyModal
        isOpen={isAddCardModalOpen}
        setOpen={setAddCardModalOpen}
        title="Add Card"
        size="cs">
        <AddCards />
      </MyModal>
    </Grid>
  );
}

export default NoCards;
