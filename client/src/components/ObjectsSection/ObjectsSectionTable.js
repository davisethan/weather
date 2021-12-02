import React from 'react';

class ObjectsSectionTable extends React.Component {
    render() {
        /**
         * Render objects section table
         * @returns Object section table
         */
        return (
            <div className="objects-section-table">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Low Temperature</th>
                            <th>High Temperature</th>
                            <th>Mean Temperature</th>
                            <th>Median Temperature</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.objects.map((object, index) => {
                            return (
                                <tr key={`crime-${index}`}>
                                    <td>{object.latitude}</td>
                                    <td>{object.longitude}</td>
                                    <td>{object.lowTemperature}</td>
                                    <td>{object.highTemperature}</td>
                                    <td>{object.meanTemperature}</td>
                                    <td>{object.medianTemperature}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                type="button"
                                                className="btn btn-dark dropdown-toggle"
                                                data-toggle="dropdown">Delete</button>
                                            <div className="dropdown-menu">
                                                <button
                                                    type="button"
                                                    className="btn dropdown-item"
                                                    onClick={(event) => {
                                                        this.props.rowDelete(event, index);
                                                    }}>Confirm</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ObjectsSectionTable;
