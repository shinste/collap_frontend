import Box from '@mui/material/Box';
import calendar from '../images/Desktop.png';
import '../App.css'



const Showcase = () => {
    return (
      // <ThemeProvider theme={theme}>
      <body className='dark-green'>
        <Box className="container-fluid container-height">
            <Box className='mb-0 mt-5 ms-3 px-5'>
              <h1> Start Planning Events with Collap</h1>
              <h5> Efficient event planning and enhanced participation begins here.</h5>            
            </Box>
            <Box className="p-n5 m-n5" >
              <img className="img overflow-y-hidden" src={calendar} alt="calendar" />
            </Box>
        </Box>
      </body>
      // </ThemeProvider>
    );
  };

export default Showcase;