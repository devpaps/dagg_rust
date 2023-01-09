import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Box, HStack, Link, Text } from '@chakra-ui/react';

export default function Sidebar() {
  return (
    <Box height="100vh" borderRight="1px solid gray">
      <Text>Dagg</Text>
      <HStack verticalAlign="bottom">
        <AiOutlineHome />
        <Link href="/">Home</Link>
      </HStack>
    </Box>
  );
}
