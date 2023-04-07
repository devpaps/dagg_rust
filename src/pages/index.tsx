import { useReducer } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Badge, Grid, GridItem, HStack, Input } from "@chakra-ui/react";
import { TbGps } from "react-icons/tb";
import SideBar from "../components/Sidebar";
import Weather from "../components/Weather";
import CurrentDate from "../components/CurrentDate";
import { Data } from "../types/index";

function App() {
  const [state, dispatch] = useReducer(
    (prev: any, next: any) => {
      const newState = { ...prev, ...next };

      if (newState.greetMsg === "") {
        newState.error = true;
      }

      // if (newState.city === '') {
      //   newState.error = true;
      // }
      //
      // if (newState.city !== '') {
      //   newState.error = false;
      // }

      return newState;
    },
    {
      error: false as boolean,
      greetMsg: {} as Data,
      name: "" as string,
      submitted: false as boolean,
      city: "" as string,
      units: "" as string,
    },
  );

  const greet = async () => {
    dispatch({
      greetMsg: await invoke("get_data", {
        city: state.name.toLowerCase(),
        units: "metric",
      }),
      units: "metric",
    });
  };

  const getCelcius = async () => {
    dispatch({
      greetMsg: await invoke("get_data", {
        city: state.city,
        units: "metric",
      }),
      units: "metric",
    });
  };

  const getImperal = async () => {
    dispatch({
      greetMsg: await invoke("get_data", {
        city: state.city,
        units: "imperial",
      }),
      units: "imperial",
    });
  };

  const handleSubmit = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      dispatch({ submitted: true, city: state.name, name: "" });
      greet();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ name: event.target.value });
  };

  console.log(state.error);

  return (
    <Grid
      templateAreas={`"navbar date"
                      "navbar searchInput"
                      "navbar searchResult"`}
      gridTemplateRows="150px 100px"
      gridTemplateColumns="300px 1fr"
    >
      <GridItem area="navbar">
        <SideBar />
      </GridItem>
      <GridItem area="date">
        <CurrentDate />
      </GridItem>
      <GridItem area="searchInput">
        <HStack>
          <>
            {/* <Text fontWeight="medium"> */}
            {/*   Ange en svensk stad för att se det aktuella vädret */}
            {/* </Text> */}
            {/* <FormControl isInvalid={state.error}> */}
            <Input
              id="greet-input"
              required
              size="lg"
              value={state.name}
              mt={4}
              onChange={handleChange}
              onKeyUp={handleSubmit}
              placeholder="Ex. Stockholm"
            />
            {/* {!state.error ? ( */}
            {/*   <FormHelperText fontWeight="medium"> */}
            {/*     Ange en svensk stad för att se det aktuella vädret */}
            {/*   </FormHelperText> */}
            {/* ) : ( */}
            {/*   <FormErrorMessage>Ange en stad</FormErrorMessage> */}
            {/* )} */}
            {/* </FormControl> */}

            <Badge
              mt="3"
              size="xs"
              _hover={{ cursor: "pointer" }}
              onClick={getCelcius}
            >
              Metric: °C, m/s
            </Badge>

            <Badge
              mt="3"
              ml={3}
              size="xs"
              _hover={{ cursor: "pointer" }}
              onClick={getImperal}
            >
              Imperal: °F, mph
            </Badge>
          </>
        </HStack>
      </GridItem>
      <GridItem area="searchResult">
        {state.submitted ? (
          <Weather
            error={state.error}
            greetMsg={state.greetMsg!}
            city={state.city}
            units={state.units}
          />
        ) : null}
      </GridItem>
    </Grid>
  );
}

export default App;
