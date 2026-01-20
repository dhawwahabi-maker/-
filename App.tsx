
import React, { useState } from 'react';
import { Screen, Experiment, Portal } from './types';
import Layout from './components/Layout';
import Welcome from './screens/Welcome';
import PortalSelection from './screens/PortalSelection';
import ExperimentList from './screens/ExperimentList';
import ExperimentDetail from './screens/ExperimentDetail';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const handlePortalSelect = (portal: Portal) => {
    setSelectedPortal(portal);
    setCurrentScreen(Screen.ExperimentList);
  };

  const handleExperimentSelect = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setCurrentScreen(Screen.ExperimentDetail);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Welcome:
        return <Welcome onStart={() => setCurrentScreen(Screen.PortalSelection)} />;
      case Screen.PortalSelection:
        return <PortalSelection onSelect={handlePortalSelect} />;
      case Screen.ExperimentList:
        return (
          <ExperimentList 
            portal={selectedPortal} 
            onSelect={handleExperimentSelect} 
            onBack={() => setCurrentScreen(Screen.PortalSelection)} 
          />
        );
      case Screen.ExperimentDetail:
        return selectedExperiment ? (
          <ExperimentDetail 
            experiment={selectedExperiment} 
            onBack={() => setCurrentScreen(Screen.ExperimentList)} 
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeScreen={currentScreen} 
      setScreen={setCurrentScreen}
      showNav={currentScreen !== Screen.Welcome}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;
