import React from 'react';
import LoginPopup from './components/LoginPopup';

const App: React.FC = () => {
  return (
    <div className="app-shell bg-transparent overflow-hidden">
      <LoginPopup />
    </div>
  );
};

export default App;
