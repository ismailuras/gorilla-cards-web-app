import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Card,
  CardBody,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { logos } from "../logos.js";

function CardAccordion({ getSeed }) {
  const seed = useSelector((state) => state.seed.seed);

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle>
        {seed.map((item) => {
          return (
            <AccordionItem key={item.id}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" className="capitalize mb-2">
                    <Heading size="md" className="p-4">
                      {item.name}
                    </Heading>
                  </Box>
                  <AccordionIcon fontSize="24px" />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Card>
                  <CardBody className="flex gap-5 overflow-x-auto">
                    {item.children.map((words, i) => (
                      <Stack className="shrink-0" key={i}>
                        <Image
                          key={i}
                          src={logos[item.name]}
                          boxSize="200px"
                          objectFit="cover"
                          borderRadius="4px"
                        />
                        <Heading size="md" className="capitalize text-center">
                          {item.name} {i + 1}
                        </Heading>
                        <Button
                          colorScheme="linkedin"
                          size="lg"
                          onClick={() => getSeed(words, item)}>
                          Preview
                        </Button>
                      </Stack>
                    ))}
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

export default CardAccordion;
