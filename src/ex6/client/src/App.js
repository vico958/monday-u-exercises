import './App.css';
import { Box, Container, Grid } from "@mui/material";
import React from 'react';
import { NavigationOnTheWeb } from './Components/NavigationBar/navigationOnTheWeb';
import { NavigationBar } from './Components/NavigationBar/navigationBar';

function App() {
  return (
    <Container>
      <Grid container>
        <Grid xs item>
          <Box textAlign={"center"}>
            <NavigationBar/>
            <NavigationOnTheWeb/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
