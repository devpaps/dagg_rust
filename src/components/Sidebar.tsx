import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Box, Container, Heading, HStack, Link } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Box height="100vh" borderRight="1px solid gray">
      <Container centerContent mt={5}>
        <Heading>Dagg</Heading>
      </Container>
      <HStack verticalAlign="bottom">
        <AiOutlineHome />
        <Link href="/">Home</Link>
      </HStack>
    </Box>
  );
}
