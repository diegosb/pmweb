import React from 'react'
import PropTypes from 'prop-types'

import './Progress.scss'

const Progress = props => {
  return (
    <div className="svg-item">
      <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
        <circle
          className="donut-hole"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
        />
        <circle
          className="donut-ring"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          strokeWidth="3.5"
        />
        <circle
          className="donut-segment"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          strokeWidth="3.5"
          strokeDasharray={` ${props.value} ${100 - props.value}`}
          strokeDashoffset="25"
          style={{stroke: `${props.color}`}}
        />
        <g className="donut-text">
          <text y="50%" transform="translate(0, 2)">
            <tspan x="50%" textAnchor="middle" className="donut-percent">
              {props.value}%
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}

Progress.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Progress
