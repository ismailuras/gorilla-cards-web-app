import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";

function FrontOfCards({ seedData }) {
  const groupDefinition = seedData.map((words) => {
    return words.tr.definitions.reduce((defs, acc) => {
      defs[acc.category] = defs[acc.category] || [];
      defs[acc.category].push(acc);
      return defs;
    }, Object.create(null));
  });

  return (
    <Grid templateColumns="repeat(6, 2fr)" gap={4}>
      <GridItem colSpan={3}>
        {seedData.map((words) => (
          <Card
            key={words.id}
            height="200px"
            border="2px"
            borderColor="blue.300"
            mb={10}>
            <CardBody display="flex" alignItems="center">
              <Box p={2} fontSize="18px">
                <ReactMarkdown className="italic font-medium">{`${words.note}. `}</ReactMarkdown>
              </Box>
            </CardBody>
          </Card>
        ))}
      </GridItem>
      <GridItem colStart={4} colEnd={8}>
        {groupDefinition.map((groups, i) => (
          <Card
            key={i}
            height="200px"
            border="2px"
            borderColor="blue.300"
            mb={10}
            overflow="scroll">
            <CardBody>
              <Box p={3}>
                {Object.keys(groups).map((category, i) => (
                  <div key={i}>
                    <Heading as={"h6"} size="sm" my={3}>
                      {category}
                    </Heading>
                    {[...new Set(groups[category])].map((groupItem, i) => (
                      <Flex key={i}>
                        <Text
                          as="span"
                          className="italic font-medium capitalize">
                          * {groupItem.tr}
                        </Text>
                        <Text as="span">({groupItem.type})</Text>
                      </Flex>
                    ))}
                  </div>
                ))}
              </Box>
            </CardBody>
          </Card>
        ))}
      </GridItem>
    </Grid>
  );
}

export default FrontOfCards;
