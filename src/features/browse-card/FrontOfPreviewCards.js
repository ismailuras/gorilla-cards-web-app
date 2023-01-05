import { Card, CardBody, Heading, Flex } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

function FrontOfCards({ seedData }) {
  return (
    <Flex w="full" h="full" p={4} flexDirection="column">
      <Heading size="md">Front of Card</Heading>
      {seedData.map((words) => (
        <Card key={words.id} p={2} border="4px" minH="150px">
          <CardBody>
            <ReactMarkdown className="text-xl font-medium  leading-9">
              {`${words.note}. `}
            </ReactMarkdown>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
}

export default FrontOfCards;
