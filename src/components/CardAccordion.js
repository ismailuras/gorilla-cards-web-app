import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { logos } from "../logos.js";
import "@splidejs/react-splide/css/skyblue";

import "../index.css";

function CardAccordion({ getSeed }) {
  const seed = useSelector((state) => state.seed.seed);

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle>
        {seed.map((item) => {
          return (
            <AccordionItem key={item.id}>
              <AccordionButton>
                <Box flex="1" textAlign="left" className="capitalize mb-2">
                  <Heading size="md" className="p-4">
                    {item.name}
                  </Heading>
                </Box>
                <AccordionIcon fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Splide
                  className="splide"
                  options={{
                    perPage: 5,
                    pagination: false,
                  }}>
                  {item.children.map((words, i) => (
                    <>
                      <SplideSlide className="splide-slice" key={i}>
                        <img
                          className="w-52 inline-block rounded"
                          key={i}
                          alt={logos[item.name]}
                          src={logos[item.name]}
                        />
                        <Heading size="md" className="capitalize text-center">
                          {`${item.name} ${i + 1}`}
                        </Heading>
                        <button
                          colorScheme="linkedin"
                          size="sm"
                          onClick={() => getSeed(words, item)}>
                          Preview
                        </button>
                      </SplideSlide>
                    </>
                  ))}
                </Splide>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

export default CardAccordion;
