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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { logos } from "../logos.js";

import "swiper/css";
import "swiper/css/navigation";
import "../index.css";

function CardAccordion({ getSeed, closeModal }) {
  const seed = useSelector((state) => state.seed.seed);

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle position="relative">
        {seed.map((item) => {
          return (
            <AccordionItem key={item.id}>
              <AccordionButton>
                <Box flex="1" textAlign="left" className="capitalize">
                  <Heading size="md" className="p-2">
                    {item.name}
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
                  {item.children.map((words, i) => (
                    <SwiperSlide className="swiper_slide" key={i}>
                      <img
                        className="w-48 rounded hover:opacity-80"
                        key={i}
                        alt={item.name}
                        src={logos[item.name]}
                      />
                      <Center>
                        <Button
                          colorScheme="blue"
                          variant="solid"
                          size="sm"
                          mt={3}
                          onClick={() => getSeed(words, item)}>
                          Preview
                        </Button>
                      </Center>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
        <Flex position={"absolute"} bottom="0" right="0">
          <Button>Continue</Button>
          <Button onClick={closeModal}>Skip</Button>
        </Flex>
      </Accordion>
    </>
  );
}

export default CardAccordion;
