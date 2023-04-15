import React, { Component } from 'react';
import Charts from './Charts';
import '../../css/analytics.css';

class Analytics extends Component {

    render() {
        return (
            <div className="analytics-container">
                <Charts />
            </div>
        );
    }
}

export default Analytics;   