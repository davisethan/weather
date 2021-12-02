import React from 'react';

class ObjectsSectionForm extends React.Component {
    render() {
        /**
         * Render objects section form
         * @returns objects section form
         */
        return (
            <div className="objects-section-form">
                <form className="form-inline">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        className="form-control"
                        id="latitude"
                        onChange={this.props.latitudeInputChange} />
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        className="form-control"
                        id="longitude"
                        onChange={this.props.longitudeInputChange} />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.props.coordinateFormSubmit}>Search</button>
                </form>
            </div>
        );
    }
}

export default ObjectsSectionForm;
