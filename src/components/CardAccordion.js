import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Button,
  Flex,
  Center,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { logos } from "../logos.js";

import "swiper/css";
import "swiper/css/navigation";
import "../index.css";
import CreateSeed from "features/create-seed/CreateSeed.js";
import { useState } from "react";

function CardAccordion({ getSeed, closeModal }) {
  const seed = useSelector((state) => state.seed.seed);

  const [checkedSeedItems, setCheckedSeetItems] = useState({});

  const handleChecked = (queryParams, seedItem) => {
    setCheckedSeetItems({
      id: seedItem.id,
      deckName: seedItem.name,
      offset: queryParams.offset,
    });
  };

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle position="relative">
        {seed.map((seedItem) => {
          return (
            <AccordionItem key={seedItem.id}>
              <AccordionButton>
                <Box flex="1" textAlign="left" className="capitalize">
                  <Heading size="md" className="p-2">
                    {seedItem.name}
                  </Heading>
                </Box>
                <AccordionIcon fontSize="24px" />
              </AccordionButton>
              <AccordionPanel>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={0}
                  slidesPerView={3}
                  navigation>
                  {seedItem.children.map((queryParams, i) => (
                    <SwiperSlide className="swiper_slide" key={i}>
                      <Image
                        boxSize="180px"
                        borderRadius="5px"
                        fallbackSrc="Loading"
                        objectFit="cover"
                        key={i}
                        alt={seedItem.name}
                        src={logos[seedItem.name]}
                      />
                      <Center>
                        <Button
                          colorScheme="blue"
                          variant="solid"
                          size="sm"
                          mt={3}
                          onClick={() => getSeed(queryParams, seedItem)}>
                          Preview {i + 1}
                        </Button>
                        <Checkbox
                          onChange={() =>
                            handleChecked(queryParams, seedItem)
                          }></Checkbox>
                      </Center>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
        <Flex position={"absolute"} bottom="0" right="0">
          <Button onClick={closeModal}>Skip</Button>
          <CreateSeed checkedSeedItems={checkedSeedItems} />
        </Flex>
      </Accordion>
    </>
  );
}

export default CardAccordion;
