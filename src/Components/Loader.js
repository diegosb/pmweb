import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

export default function Loader(props) {
  return (
    <div
      className={`loader ${props.big ? 'full-screen' : ''} ${
        props.content ? 'loader--content' : ''
      }`}
    >
      <div className={`loader__portal ${props.big ? 'loader--big' : ''}`}>
        <div className="icon-double-bounce">
          <div className="icon-double-bounce1" />
          <div className="icon-double-bounce2" />
        </div>
      </div>
    </div>
  );
}

Loader.propTypes = {
  big: PropTypes.bool,
  content: PropTypes.bool,
};

Loader.defaultProps = {
  big: false,
  content: false,
};
