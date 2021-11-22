import React from 'react';
import HikesSection from './ObjectsSection/HikesSection';

// import CrimesSection from './ObjectsSection/CrimesSection';
// import SightseeingSightsSection from './sightseeingSights/SightseeingSights';
// import StargazingSightsSection from './stargazingSights/StarGazingSights';


class HistoricalWeatherBody extends React.Component{
    render(){
        return(
            <div className="historical-weather-body">
                <HikesSection/>
                {/* <CrimesSection/> */}
            </div>
        )
    }
}

export default HistoricalWeatherBody;
