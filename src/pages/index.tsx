import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Box, Text } from '@chakra-ui/react';
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
      <SideBar />
      <div className="container">
        <h1>Välkommen till Dagg!</h1>

        <p>Ange en svensk stad för att se det aktuella vädret</p>

        <div className="row">
          <div>
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Ex. Stockholm"
            />
            <button type="button" onClick={() => greet()}>
              Hämta
            </button>
          </div>
        </div>
        {greetMsg ? (
          <Box>
            {greetMsg.error_message ? (
              <Text>{greetMsg.error_message}</Text>
            ) : (
              <>
                <p>{`Temperatur: ${greetMsg.current.temp.toFixed(1)} °C`}</p>
                <p>{`Fuktighet: ${greetMsg.current.humidity} %`}</p>
                <p>{greetMsg.current.weather[0].description}</p>
              </>
            )}
          </Box>
        ) : null}
      </div>
    </>
  );
}

export default App;
