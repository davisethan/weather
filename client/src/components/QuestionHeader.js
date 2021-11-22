import React from 'react';

class QuestionHeader extends React.Component {
    render() {
        return (
            <div className="question-header">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">?</button>
                    <div className="dropdown-menu">
                        <p>View historical weather statistics for hikes, sightseeing sights, and star gazing sights</p>
                        <p>Search new sights to add to each table, e.g. Do hikes table latitude 45 and longitude 120 search to add sight to hikes table</p>
                        <p>Also delete sights from each table, e.g. Do hikes table first sight delete to delete first sight from hikes table</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionHeader;
