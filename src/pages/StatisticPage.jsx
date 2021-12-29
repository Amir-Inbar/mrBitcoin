import React, { Component } from 'react';
import { Chart } from '../cmps/Chart';

export default class StatisticPage extends Component {
  render() {
    return (
      <section className="statistics-page">
        <Chart />
      </section>
    );
  }
}
