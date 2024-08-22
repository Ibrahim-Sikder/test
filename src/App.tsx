import React from 'react';
import './App.css';
import InspectionScreen from './pages/InspectionScreen';
import UltimatePage from './pages/UltimatePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <UltimatePage />
      <InspectionScreen />

    </div>
  );
};

export default App;
