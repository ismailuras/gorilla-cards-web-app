import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import marketingLogo from "assets/images/marketing.png";
import businessLogo from "assets/images/bussiness.png";

function MyAccordion({ name, openSeedWordsModal, item }) {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel className="w-56" pb={4}>
          {name === "marketing" && (
            <img src={marketingLogo} alt="marketing-logo" />
          )}
          {name === "business" && (
            <img src={businessLogo} alt="bussiness-logo" />
          )}
          <button onClick={() => openSeedWordsModal(item)}>Prewiev</button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MyAccordion;
