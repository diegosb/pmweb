import React, {Component} from 'react'
import {DateRange} from 'react-date-range'
import * as rdrLocales from 'react-date-range/src/locale'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './Calendar.scss'

class CustomCalendar extends Component {
  state = {
    dateRange: {
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        color: '#53B17F',
        key: 'selection',
      },
    },
    showCalendarRange: window.innerWidth < 800,
  }
  handleRangeChange = payload => {
    this.setState({
      dateRange: {
        ...this.state.dateRange,
        ...payload,
      },
    })
  }

  toggleCalendar = () => {
    if (window.innerWidth < 800) {
      this.setState(prevState => ({
        showCalendarRange: !prevState.showCalendarRange,
      }))
    }
  }
  render() {
    const {showCalendarRange} = this.state
    return (
      <div className={showCalendarRange ? 'calendar--show' : ''}>
        <DateRange
          locale={rdrLocales.pt}
          onChange={this.handleRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={[this.state.dateRange.selection]}
          dateDisplayFormat="D MMM YYYY"
          rangeColors={['#53B17F', '#53B17F', '#53B17F']}
          color="#53B17F"
          showMonthArrow={false}
        />
        <FontAwesomeIcon icon={faCalendarAlt} onClick={this.toggleCalendar} />
      </div>
    )
  }
}

export default CustomCalendar
