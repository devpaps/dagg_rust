import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import SideBar from '../components/Sidebar';

interface Data {
  name: string;
  current: {
    temp: number;
    humidity: number;
    weather: { description: string }[];
  };
  error_message?: string;
}

function App() {
  const [greetMsg, setGreetMsg] = useState<Data>();
  const [name, setName] = useState('');

  async function greet() {
    setGreetMsg(await invoke('get_data', { city: name }));
  }

  return (
    <>
      <Box>
        <SideBar />
      </Box>
      <Flex justifyContent="center">
        <Flex>
          <Box>
            <Heading>Välkommen till Dagg!</Heading>

            <Text>Ange en svensk stad för att se det aktuella vädret</Text>

            <VStack>
              <Box>
                <Input
                  id="greet-input"
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Ex. Stockholm"
                />
                <Button type="button" onClick={() => greet()}>
                  Hämta
                </Button>
              </Box>
            </VStack>
            {greetMsg ? (
              <Flex direction="column">
                {greetMsg.error_message ? (
                  <Text>{greetMsg.error_message}</Text>
                ) : (
                  <>
                    <Text>{`Temperatur: ${greetMsg.current.temp.toFixed(
                      1,
                    )} °C`}</Text>
                    <Text>{`Fuktighet: ${greetMsg.current.humidity} %`}</Text>
                    <Text>{greetMsg.current.weather[0].description}</Text>
                  </>
                )}
              </Flex>
            ) : null}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
