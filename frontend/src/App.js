import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HealthForm from './components/HealthForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a77d4',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // 여기에 데이터 저장 로직 추가
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <HealthForm onSubmit={handleSubmit} />
      </Container>
    </ThemeProvider>
  );
}

export default App; 