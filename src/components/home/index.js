import { Link } from "react-router-dom";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import useAuth from "hooks/useAuth";

import hugeGorilla from "assets/images/gorilla-01-min.jpg";

function Home() {
  const { isUserLoggedIn } = useAuth();

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.300",
                zIndex: -1,
              }}>
              Welcome
            </Text>
            <br />
            <Text as={"span"}>to Gorilla Cards</Text>
          </Heading>
          <Text color={"gray.700"} fontSize="26px" className="font-semibold">
            Gorilla Cards is the new way to create, organize, and study flash
            cards. Its main functionality is based on Anki but with a modern
            touch.
          </Text>
          <Text color={"gray.700"} fontSize="20px">
            From our perspective, education and learning should be fun. In that
            viewpoint, we are creating modern version of flashcard apps with
            gamification elements. It's now in the kitchen and cooking...
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}>
            {!isUserLoggedIn && (
              <Link
                className="text-xl font-semibold bg-blue-400 hover:bg-blue-600 text-white flex items-center py-3 px-7 rounded-full"
                to={"/signin"}>
                Sign In
              </Link>
            )}
            {!isUserLoggedIn && (
              <Link
                className="text-xl font-semibold bg-gray-200 hover:bg-gray-300 flex items-center py-3 px-7 rounded-full"
                to={"/signup"}>
                Sign Up
              </Link>
            )}
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}>
          <Box
            position={"relative"}
            height={"350px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}>
            <Image
              alt={"Gorilla Cards"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={hugeGorilla}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export default Home;
