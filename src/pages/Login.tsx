import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Showcase from '../components/Showcase';
import InputLogin from '../components/InputLogin'
import '../App.css';



function App() {



  return (
    // <UsernameProvider>
    <body >
          <Box sx={{
            display: 'flex',
          }}>
            <section>
              <InputLogin />
            </section>
            <section>
              <Showcase />
            </section>
          </Box>
    </body>
  )                  
}



export default App;
