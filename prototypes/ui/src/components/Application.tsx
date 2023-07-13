import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import './Application.sass';

import { SettingForm, Settings } from './Settings';
import { useSendToAI } from './useSendToAi';
import { Loader } from './widgets/Loader';

import { Menu, ChevronRight, ChevronLeft, EmojiEmotionsTwoTone } from '@mui/icons-material';
import { AppBar, CssBaseline, Drawer, IconButton, Button } from '@mui/material';
import { Screen } from './loadState';


const defaultTheme = createTheme();

export const Application: React.FC = () => {
  const [validInputs, setValidInputs] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 400; // Define the drawer width here

  const[currentScreen, setCurrentScreen] = React.useState<Screen>('Create');

  const [loadState, response, sendRequest] = useSendToAI();
  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.target as HTMLFormElement);
      const theData = Object.fromEntries(formData.entries()) as unknown as SettingForm;
      e.preventDefault();
      e.stopPropagation();
      if (theData['integration-platform'] && theData['build-tool'] && theData['deployment-target'] && theData['database']) {
        sendRequest(`generate ${theData['integration-platform']} config for ${theData['build-tool']}, ${theData['deployment-target']}, ${theData['database']}`);
        setValidInputs(true);
      } else {
        setValidInputs(false);
      }
    },
    []
  );

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          marginLeft: open ? `${drawerWidth}px` : 0, // Updated line
          transition: 'margin-left 0.2s',
        }}
      >
        <AppBar position="fixed" sx={{ zIndex: defaultTheme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeft /> : <Menu />}
            </IconButton>
            <Typography component="div" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              AI Wizards Almighty Generator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
        >
          <Toolbar>
            <IconButton onClick={handleDrawerToggle}>
              {defaultTheme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Toolbar>
          <h2 className="underline">Please Choose Your Required Function</h2>
          {/* Drawer Content */}
          <Box p={2}>
            <Button 
              color="inherit"
              sx={{
                width: '100%',
                mb: 1,
                fontWeight: 'bold',
                justifyContent: 'flex-start',
                fontSize: '2rem',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              //startIcon={<EmojiEmotionsTwoTone />}
              onClick={() => setCurrentScreen("Create")}
            >
              <span role="img" aria-label="wand" style={{ fontSize: '2rem', marginRight: '1rem' }}>
                🧙🏻‍♀️🪄
              </span>
              <span style={{ marginRight: '1rem' }}>Create</span>
              <span role="img" aria-label="wand" style={{ fontSize: '2rem' }}>
               🦄🦄
              </span>
              
            </Button>
            <Button
              color="inherit"
              sx={{
                width: '100%',
                mb: 1,
                fontWeight: 'bold',
                justifyContent: 'flex-start',
                fontSize: '2rem',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              //startIcon={<EmojiEventsIcon />}
              onClick={() => setCurrentScreen("Convert")}
            >
              <span role="img" aria-label="wand" style={{ fontSize: '2rem', marginRight: '1rem' }}>
                🧙🏻‍♂️🪄
              </span>
              <span style={{ marginRight: '1rem' }}>Convert</span>
              <span role="img" aria-label="hat" style={{ fontSize: '2rem' }}>
                🦄🦄
              </span>
            </Button>
            <Button
              color="inherit"
              sx={{
                width: '100%',
                mb: 1,
                fontWeight: 'bold',
                justifyContent: 'flex-start',
                fontSize: '2rem',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              //startIcon={<StarsIcon />}
              onClick={() => setCurrentScreen("Review")}
            >
              <span role="img" aria-label="wand" style={{ fontSize: '2rem', marginRight: '1rem' }}>
                🧙🏻‍♂️🪄
              </span>
              <span style={{ marginRight: '1rem' }}>Review</span>
              <span role="img" aria-label="star" style={{ fontSize: '2rem' }}>
               🦄🦄
              </span>
            </Button>
          </Box>
        </Drawer>
        <Toolbar /> {/* Added a toolbar to create space for the blue box */}
        <Container
          maxWidth={false}
          sx={{
            flexGrow: 1,
            transition: 'margin-left 0.2s',
          }}
        >
          <Grid container spacing={3} sx={{ height: '100%' }}>
            <Grid item xs={6}>
              <Grid container rowSpacing={3} sx={{ height: 'calc(100% - 20px)' }}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'calc(100% - 32px)',
                    }}
                  >
                    <form onSubmit={onSubmit}>
                      <Settings validInputs={validInputs} pending={loadState === 'pending'} />
                    </form>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'calc(100% - 8px)',
                    }}
                  ><div>{currentScreen}</div>
                    <div>Terminal</div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'calc(100% - 32px)',
                }}
              >
                {!loadState ? (
                  <div>Waiting for a unicorn to appear...</div>
                ) : loadState === 'pending' ? (
                  <Loader />
                ) : loadState === 'error' ? (
                  <div>Oh no! All the unicorns died! 😱😱😱 Try again!</div>
                ) : (
                  <pre>{response}</pre>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};