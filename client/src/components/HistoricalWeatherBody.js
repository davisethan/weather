import React from 'react';
import HikesSection from './ObjectsSection/HikesSection';
import SightseeingSection from './ObjectsSection/SightseeingSection';
import StargazingSection from './ObjectsSection/StargazingSection';
import CrimesSection from './ObjectsSection/CrimesSection';

class HistoricalWeatherBody extends React.Component {
    render() {
        return (
            <div className="historical-weather-body">
                <HikesSection />
                <SightseeingSection />
                <StargazingSection />
                <CrimesSection />
            </div>
        )
    }
}

export default HistoricalWeatherBody;
