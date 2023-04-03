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

function CardAccordion({ getSeed, closeBrowseCardModal }) {
  const seed = useSelector((state) => state.seed.seed);

  const [checkedSeedItems, setCheckedSeetItems] = useState({});

  const handleChecked = (queryParams, seedItem) => {
    setCheckedSeetItems((prevState) => {
      if (prevState.id) {
        return {};
      } else {
        return {
          id: seedItem.id,
          deckName: seedItem.name,
          offset: queryParams.offset,
        };
      }
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
                  spaceBetween={15}
                  slidesPerView={3}
                  navigation>
                  {seedItem.children.map((queryParams, i) => (
                    <SwiperSlide key={i}>
                      <Image
                        borderRadius="15px"
                        objectFit="cover"
                        key={i}
                        alt={seedItem.name}
                        src={logos[seedItem.name]}
                      />
                      <Flex
                        mt={3}
                        alignItems="center"
                        justifyContent="center"
                        gap={5}>
                        <Button
                          colorScheme="blue"
                          variant="solid"
                          size="md"
                          onClick={() => getSeed(queryParams, seedItem)}>
                          Preview {i + 1}
                        </Button>
                        <Checkbox
                          onChange={() => handleChecked(queryParams, seedItem)}
                          disabled={checkedSeedItems.id !== undefined}
                          size="lg"
                          colorScheme="blue"></Checkbox>
                      </Flex>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
        <Flex position={"absolute"} gap={5} bottom="0" right="0">
          <Button
            colorScheme="blue"
            variant="solid"
            size="md"
            onClick={closeBrowseCardModal}>
            Skip
          </Button>
          <CreateSeed
            closeBrowseCardModal={closeBrowseCardModal}
            checkedSeedItems={checkedSeedItems}
          />
        </Flex>
      </Accordion>
    </>
  );
}

export default CardAccordion;
