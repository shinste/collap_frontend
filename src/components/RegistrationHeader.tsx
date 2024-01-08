import { AppBar, Container, Toolbar, Typography } from "@mui/material"


const RegistrationHeader = () => {

    return (

    <AppBar position="static" style={{ background: '#AFC38E' }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                className='centered-div'
                variant="h6"
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 750,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                Collap
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>        
    )

}

export default RegistrationHeader;