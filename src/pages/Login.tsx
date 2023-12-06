import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Showcase from '../components/Showcase';
import InputLogin from '../components/InputLogin'
import '../App.css';


const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderColor: '#87976E', // Use the custom color
          },
          '&:hover': {
            borderColor: '#87976E', // Change border color on hover
          },
          '& fieldset': {
            borderColor: '#87976E', // Set border color when not focused
          }
        },
      },
      defaultProps: {
        InputLabelProps: {
          style: {
            color: '#87976E', // Use the custom color for label
          },
        },
      },
    },
  }
});



function App() {



  return (
    // <UsernameProvider>
    <body >
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </body>
  )                  
}



export default App;
