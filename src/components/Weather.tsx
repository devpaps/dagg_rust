import React from 'react';
import Image from 'next/image';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Data } from '../types/index';

interface Props {
  greetMsg: Data;
  city: string;
}

function convertToUpperCase(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

export default function Weather({ greetMsg, city }: Props) {
  return (
    <Flex direction="column">
      {greetMsg?.error_message ? (
        <Text textAlign="center" mt="10" fontWeight="bold">
          {greetMsg?.error_message}
        </Text>
      ) : (
        <Box mt={10}>
          <Text fontSize="x-large" mb={5} textAlign="center" fontWeight="bold">
            {convertToUpperCase(city)}
          </Text>
          <Text>{`Temperatur: ${greetMsg?.current?.temp.toFixed(1)}°C`}</Text>
          <Text>
            Fuktighet:{' '}
            <Text as="span" fontWeight="bold">
              {greetMsg?.current?.humidity}%
            </Text>
          </Text>
          <HStack>
            <Image
              objectFit="contain"
              width="50px"
              height="50px"
              src={`http://openweathermap.org/img/w/${greetMsg?.current?.weather[0]?.icon}.png`}
              alt="weathericon"
            />
            <Text>{greetMsg?.current?.weather[0]?.description}</Text>
          </HStack>
        </Box>
      )}
    </Flex>
  );
}
