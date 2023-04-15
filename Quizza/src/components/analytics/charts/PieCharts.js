import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';

@inject('store')
@observer
class PieCharts extends Component {
    render() {
        return (
            <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
                <Tooltip />
                <Pie
                    data={this.props.data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    label
                >
                    {this.props.data.map((entry, index) => <Cell fill={this.props.colors[index % this.props.colors.length]} />)}
                </Pie>
            </PieChart>
        );
    }
}

export default PieCharts;