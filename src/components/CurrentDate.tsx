import { Heading, Box } from "@chakra-ui/react";

const getDate = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "medium",
  // timeStyle: "long",
  timeZone: "Europe/Stockholm",
}).format(new Date());

function getMonth() {
  const month = new Intl.DateTimeFormat("sv-SE", {
    month: "long",
    year: "numeric",
  }).format(new Date());
  const a = month.charAt(0).toUpperCase() + month.slice(1);

  return a;
}

// console.log(getMonth.toString().charAt(0).toUpperCase() + getMonth.slice(1));

export default function CurrentDate() {
  return (
    <Box>
      <Heading as="h3" size="lg">
        {getMonth()}
      </Heading>
      <br />
      <h1>{getDate}</h1>
    </Box>
  );
}
