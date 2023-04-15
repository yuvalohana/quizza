import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Chart from './Chart';

@inject('store')
@observer
class Charts extends Component {


    getCharts = () => {
        // adding something with MOMENT package? adding dates/ months
        const charts = [
            {
                id: 'resultsAcquisition',
                title: 'Results Acquisition',
                chartType: 'pie',
                colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
                pieDataKey: 'results',
                pieNameKey: 'quiz'
            }
        ];
        return charts;
    };

    render() {
        return (
            <div className="charts-container main-container">
                {this.getCharts().map(c =>
                    <Chart
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        url={c.url}
                        chartType={c.chartType}
                        color={c.color}
                        colors={c.colors}
                        layout={c.layout}
                        pieDataKey={c.pieDataKey}
                        pieNameKey={c.pieNameKey}
                    />
                )}
            </div>
        )
    }
}

export default Charts;