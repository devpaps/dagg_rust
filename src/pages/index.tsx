import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import SideBar from '../components/Sidebar';

interface Data {
  name: string;
  current: {
    temp: number;
    humidity: number;
    weather: { description: string; icon: number }[];
  };
  error_message?: string;
}

function App() {
  const [greetMsg, setGreetMsg] = useState<Data>();
  const [name, setName] = useState('');

  async function greet() {
    setGreetMsg(await invoke('get_data', { city: name }));
  }

  function handleChange(e: any) {
    e.preventDefault();
    setName(e.currentTarget.value);
    greet();
  }

  console.log(greetMsg);

  return (
    <Grid templateColumns="300px 1fr">
      <Box>
        <SideBar />
      </Box>
      <Flex justifyContent="center">
        <Flex>
          <Box>
            <Box mt={20}>
              <Heading>Dagens väder</Heading>
            </Box>

            <VStack mt={20}>
              <Text fontWeight="medium">
                Ange en svensk stad för att se det aktuella vädret
              </Text>
              <Box>
                <form onSubmit={handleChange}>
                  <Input
                    id="greet-input"
                    size="lg"
                    mt={4}
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Ex. Stockholm"
                  />
                  <Button
                    type="submit"
                    width="100%"
                    mt={5}
                    size="lg"
                    onClick={() => greet()}
                  >
                    Hämta
                  </Button>
                </form>
              </Box>
            </VStack>
            {greetMsg ? (
              <Flex direction="column">
                {greetMsg.error_message ? (
                  <Text textAlign="center" mt="10" fontWeight="bold">
                    {greetMsg.error_message}
                  </Text>
                ) : (
                  <Box mt={10}>
                    <Text>{`Temperatur: ${greetMsg.current.temp.toFixed(
                      1,
                    )} °C`}</Text>
                    <Text>{`Fuktighet: ${greetMsg.current.humidity} %`}</Text>
                    <HStack>
                      <Image
                        objectFit="contain"
                        width="50px"
                        height="50px"
                        src={`http://openweathermap.org/img/w/${greetMsg.current.weather[0].icon}.png`}
                        alt="weathericon"
                      />
                      <Text>{greetMsg.current.weather[0].description}</Text>
                    </HStack>
                  </Box>
                )}
              </Flex>
            ) : null}
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
}

export default App;
