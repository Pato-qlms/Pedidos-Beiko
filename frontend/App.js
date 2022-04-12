import React from 'react';
import { GeneralProvider } from './contexts/GeneralContext';
import AppScreen from './components/AppScreen';

const App = () => {
  return (
    <GeneralProvider>
      <AppScreen />
    </GeneralProvider>
  );
};

export default App;
