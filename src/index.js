import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './theme/theme';
import AuthProvider from './hooks/useAuth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <AuthProvider>
      <ChakraProvider theme={customTheme}>
          <App/>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
);