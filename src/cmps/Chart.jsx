import { Component } from 'react';
import { bitcoinService } from '../services/bitcoinService';
import moment from 'moment';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export class Chart extends Component {
  state = {
    chartData: null,
  };

  componentDidMount() {
    this.getChartData();
  }

  getChartData = async () => {
    let chartData = await bitcoinService.getMarketPrice();
    const chartDataFormat = chartData.values.map((value) => {
      let time = moment.unix(value.x).format('MMMM Do YYYY, h:mm');
      let amount = Math.round(value.y);
      return { x: time, value: amount };
    });
    console.log(chartData);
    this.setState({ chartData: chartDataFormat });
  };

  formatTicks = (tickItem) => {
    let momentObj = moment(tickItem, 'MMMM Do YYYY, h:mm');
    let time = momentObj.format('MMM YYYY');
    time =
      time.substring(0, 3) + time.substring(time.length - 3, time.length - 1);
    return time;
  };

  formatToolTip = (value) => {
    value += ' USD($)';
    return value;
  };

  render() {
    const { chartData } = this.state;
    if (!chartData) return <div>Loading...</div>;
    return (
      <section className="chart-container flex justify-center">
        <h1>Statistics: BTC value by date</h1>
        <LineChart
          width={window.innerWidth - 300}
          height={250}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            stroke="white"
            tick={{ fill: '#efefef' }}
            interval={window.innerWidth <= 500 ? 65 : 29}
            tickFormatter={this.formatTicks}
            dataKey="x"
          />
          <YAxis stroke="white" tick={{ fill: '#efefef' }} />
          <Tooltip formatter={this.formatToolTip} cursor={false} />
          <Line
            activeDot={true}
            dot={false}
            type="linear"
            dataKey="value"
            strokeWidth={2.5}
            stroke="#039BD3"
          />
        </LineChart>
      </section>
    );
  }
}
