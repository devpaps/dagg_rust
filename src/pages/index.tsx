import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import SideBar from '../components/Sidebar';
import Weather from '../components/Weather';
import { Data } from '../types/index';

function App() {
  const [greetMsg, setGreetMsg] = useState<Data>();
  const [name, setName] = useState('');

  async function greet() {
    setGreetMsg(await invoke('get_data', { city: name }));
  }

  function handleChange(e: any) {
    e.preventDefault();

    setName(e.currentTarget.value);
  }

  console.log(greetMsg);
  console.log(name);

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
              {greetMsg ? <Weather greetMsg={greetMsg} /> : null}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
}

export default App;
