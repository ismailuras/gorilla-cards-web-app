import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Button,
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
                <Box flex="1" textAlign="left" className="capitalize">
                  <Heading size="md" className="p-2">
                    {item.name}
                  </Heading>
                </Box>
                <AccordionIcon fontSize="24px" />
              </AccordionButton>
              <AccordionPanel>
                <Splide
                  className="splide"
                  options={{
                    perPage: 4,
                    pagination: false,
                  }}>
                  {item.children.map((words, i) => (
                    <SplideSlide className="splide-slice" key={i}>
                      <img
                        className="w-52 rounded hover:opacity-80"
                        key={i}
                        alt={item.name}
                        src={logos[item.name]}
                      />
                      {/* <Heading size="md" className="capitalize text-center">
                        {`${item.name} ${i + 1}`}
                      </Heading> */}
                      <div className="text-center mt-3">
                        <Button
                          colorScheme="teal"
                          size="sm"
                          onClick={() => getSeed(words, item)}>
                          Preview
                        </Button>
                      </div>
                    </SplideSlide>
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
