import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2'
import Loader from './Loader'
import './Chart.scss'

class Chart extends Component {
  static propTypes = {
    data: PropTypes.shape({
      chartdata: PropTypes.arrayOf(PropTypes.object),
      date: PropTypes.string,
      time: PropTypes.string,
    }).isRequired,
  }

  state = {
    chart: {
      media: [],
      ontem: [],
      hoje: [],
    },
  }

  options = {
    // responsive: false,

    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: '#f9f9f9',
      bodyFontColor: '#555',
      titleFontColor: '#555',
      titleFontFamily: "'Gotham', 'sans-serif'",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 4000,
          },
        },
      ],
    },
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.chartdata.length) {
      const chart = this.updateChart(nextProps.data.chartdata)
      this.setState({chart})
    }
  }

  updateChart = data => {
    return data.reduce(
      (accum, info) => {
        accum.hoje.push(info.hoje)
        accum.ontem.push(info.ontem)
        accum.media.push(info.media)
        return accum
      },
      {hoje: [], ontem: [], media: []},
    )
  }

  render() {
    const {data} = this.props
    const {chart} = this.state
    if (!this.state.chart.media.length) {
      return <Loader />
    }

    const dataset = {
      labels: [
        '0h',
        '1h',
        '2h',
        '3h',
        '4h',
        '5h',
        '6h',
        '7h',
        '8h',
        '9h',
        '10h',
        '11h',
        '12h',
        '13h',
        '14h',
        '15h',
        '16h',
        '17h',
        '18h',
        '19h',
        '20h',
        '21h',
        '22h',
        '23h',
      ],
      datasets: [
        {
          label: 'Média',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(135, 135, 135,0.1)',
          borderColor: 'rgb(135, 135, 135)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(180, 180, 180)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(135, 135, 135)',
          pointHoverBorderColor: 'rgb(135, 135, 135)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chart.media,
        },
        {
          label: 'Ontem',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(180, 180, 180)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(135, 135, 135,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chart.ontem,
        },
        {
          label: 'Hoje',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(103,68,177,0.4)',
          borderColor: 'rgba(103, 68, 177,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(180, 180, 180)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(103, 68, 177,1)',
          pointHoverBorderColor: 'rgba(135, 135, 135,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chart.hoje,
        },
      ],
    }

    return (
      <div className="chartdata">
        <header>
          <h2>Status - Messages</h2>
          <small>
            Last Update:{' '}
            <time>
              {data.date} {data.time}
            </time>
          </small>
          <div className="chartdata__legenda">
            <ul>
              <li className="legenda__item">
                <small>Média</small>
              </li>
              <li className="legenda__item">
                <small>Ontem</small>
              </li>
              <li className="legenda__item">
                <small>Hoje</small>
              </li>
            </ul>
          </div>
        </header>
        <div className="chartdata__grafico">
          {window.innerWidth > 1000 ? (
            <Line data={dataset} options={this.options} height={80} />
          ) : (
            <Line data={dataset} options={this.options} height={180} />
          )}
        </div>
      </div>
    )
  }
}

export default Chart
