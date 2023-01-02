import { Flex, Link } from '@chakra-ui/react';

export default function Sidebar() {
  return (
    <Flex direction="column" align="center" justify="center">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </Flex>
  );
}
