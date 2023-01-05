import { SimpleGrid, Box, Card, CardBody, VStack } from "@chakra-ui/react";

function BackOfPreviewCards({ seedData }) {
  const groupDefinition = seedData.map((words) => {
    return words.tr.definitions.reduce((defs, acc) => {
      defs[acc.category] = defs[acc.category] || [];
      defs[acc.category].push(acc);
      return defs;
    }, Object.create(null));
  });
  return (
    <VStack w="full" h="full" p={4}>
      <SimpleGrid columns={1} spacing={1}>
        <Box colSpan={2}>
          <Card>
            <CardBody>
              {groupDefinition.map((groups, i) => (
                <div key={i} className="border-4">
                  {Object.keys(groups).map((category, i) => (
                    <div key={i}>
                      <b>{category}</b>
                      {[...new Set(groups[category])]
                        .map(
                          (groupItem) => ` ${groupItem.tr} (${groupItem.type})`
                        )
                        .join(", ")}
                    </div>
                  ))}
                </div>
              ))}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}

export default BackOfPreviewCards;
