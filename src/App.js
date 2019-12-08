import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import RouterComponents from './routes';
import Provider from './providers/index';

function App() {

  return (
    <Router>
      <Provider>
        <Navigation />
          <MainContainer>
            <RouterComponents/>
          </MainContainer>
        <Footer />
      </Provider>
    </Router>
  );
}

export default App;
