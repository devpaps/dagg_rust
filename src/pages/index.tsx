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
import { TbGps } from 'react-icons/tb';
import SideBar from '../components/Sidebar';
import Weather from '../components/Weather';
import { Data } from '../types/index';

function App() {
  const [greetMsg, setGreetMsg] = useState<Data>();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState('');

  const greet = async () => {
    setGreetMsg(await invoke('get_data', { city: name }));
  };

  // const getImperal = async () => {
  //   await invoke('reset_to_imperal', { city: name });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName('');
    setSubmitted(true);
    setCity(name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

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
              <>
                <form onSubmit={handleSubmit}>
                  <Input
                    id="greet-input"
                    size="lg"
                    value={name}
                    mt={4}
                    onChange={handleChange}
                    placeholder="Ex. Stockholm"
                  />

                  <Button mt="3" size="xs">
                    Metric: °C, m/s
                  </Button>

                  <Button mt="3" ml={3} size="xs">
                    Imperal: °F, mph
                  </Button>

                  <Button
                    type="submit"
                    width="100%"
                    mt={5}
                    size="lg"
                    onClick={greet}
                  >
                    Hämta
                  </Button>
                </form>

                {TbGps}
              </>

              {submitted ? <Weather greetMsg={greetMsg!} city={city} /> : null}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
}

export default App;
