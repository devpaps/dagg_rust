import React from "react";
import Image from "next/image";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Data } from "../types/index";

interface Props {
  greetMsg: Data;
  city: string;
  units: string;
  error: boolean;
}

function convertToUpperCase(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

function getTemperature(temp: number, units: string) {
  if (units === "metric") return `Temperatur: ${temp?.toFixed(1)}°C`;

  return `Temperatur: ${temp?.toFixed(1)}°F`;
}
export default function Weather({ greetMsg, city, units, error }: Props) {
  if (error)
    return (
      <Text fontWeight="bold" textAlign="center" pt={5}>
        Ange en stad
      </Text>
    );

  return (
    <Flex direction="column">
      {greetMsg?.error_message ? (
        <Text textAlign="center" mt="10" fontWeight="bold">
          {greetMsg?.error_message}
        </Text>
      ) : (
        <Box mt={10}>
          <Text fontSize="x-large" mb={5} textAlign="center" fontWeight="bold">
            Aktuell väderinformation för {convertToUpperCase(city)}
          </Text>
          <Box justifyContent="center">
            <Text>{getTemperature(greetMsg?.current?.temp, units)}</Text>
            <Text>
              Fuktighet:{" "}
              <Text as="span" fontWeight="bold">
                {greetMsg?.current?.humidity}%
              </Text>
            </Text>
            <HStack>
              <Image
                objectFit="contain"
                width="50px"
                height="50px"
                src={`https://openweathermap.org/img/wn/${greetMsg?.current?.weather[0]?.icon}.png`}
                alt="weathericon"
              />
              <Text>{greetMsg?.current?.weather[0]?.description}</Text>
            </HStack>
          </Box>
        </Box>
      )}
    </Flex>
  );
}
