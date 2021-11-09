import React from 'react';
import Hikes from './Hikes';
import SightseeingSights from './SightseeingSights';
// import StarGazingSights from './StarGazingSights';
import Question from './Question';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Question />
        <Hikes />
        <SightseeingSights />
        {/* <StarGazingSights /> */}
      </div>
    );
  }
}

export default App;
