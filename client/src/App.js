import React from 'react';
import Hikes from './Hikes';
import SightseeingSights from './SightseeingSights';
import StarGazingSights from './StarGazingSights';
import Crimes from './Crimes';
import Question from './Question';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Question />
        <Hikes />
        <SightseeingSights />
        <StarGazingSights />
        <Crimes />
      </div>
    );
  }
}

export default App;
