import React from 'react';
import QuestionHeader from './components/QuestionHeader';
import HistoricalWeatherBody from './components/HistoricalWeatherBody';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <QuestionHeader/>
        <HistoricalWeatherBody/>
      </div>
    );
  }
}

export default App;
