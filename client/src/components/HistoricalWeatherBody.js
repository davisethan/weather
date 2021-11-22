import React from 'react';
// import HikesSection from './ObjectsSection/HikesSection';
// import CrimesSection from './ObjectsSection/CrimesSection';
import SightseeingSection from './ObjectsSection/SightseeingSection';
// import StargazingSightsSection from './stargazingSights/StarGazingSights';


class HistoricalWeatherBody extends React.Component{
    render(){
        return(
            <div className="historical-weather-body">
                {/* <HikesSection/> */}
                <SightseeingSection/>
                {/* <CrimesSection/> */}
            </div>
        )
    }
}

export default HistoricalWeatherBody;
