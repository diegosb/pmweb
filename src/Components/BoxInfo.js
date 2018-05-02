import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-flexbox-grid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretUp from '@fortawesome/fontawesome-free-solid/faCaretUp'
import Progress from './Progress'
import Modal from './Modal'
import './BoxInfo.scss'

class BoxInfo extends Component {
  state = {
    modalIsOpen: false,
  }

  toggleModal = () => {
    this.setState(prevState => ({modalIsOpen: !prevState.modalIsOpen}))
  }

  render() {
    const {props} = this
    const {modalIsOpen} = this.state
    return (
      <div className="box-info">
        <header className="box-info__header">
          <h2>{props.title}</h2>
          <small>
            Last Update: <time>{props.lastUpdate}</time>
          </small>
        </header>
        <Row>
          <Col xs={6} className="box-info__progress">
            <Progress
              value={props.percentage}
              color={+props.inboundPercentage > 0 ? '#34a56b' : '#E8C84F'}
            />
          </Col>
          <Col xs={6} className="box-info__details">
            <div className="details__inbound">
              <p>Inbound</p>
              <p>{props.inbound.toLocaleString('pt-BR')}</p>
              <div
                className="details__percentage"
                style={{
                  backgroundColor:
                    +props.inboundPercentage > 0 ? '#34a56b' : '#E6543E',
                }}
              >
                {+props.inboundPercentage > 0 ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
                {props.inboundPercentage.replace('-', '')}%
              </div>
            </div>
            <div className="details__outbound">
              <p>Outbound</p>
              <p>{props.outbound.toLocaleString('pt-BR')}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="modal__btn">
            <a href="#" onClick={this.toggleModal}>
              ver detalhes <FontAwesomeIcon icon={faCaretRight} />
            </a>
          </Col>
        </Row>
        <Modal
          title={props.title}
          isOpen={modalIsOpen}
          toggle={this.toggleModal}
          info={props.campaign}
        />
      </div>
    )
  }
}

BoxInfo.propTypes = {
  title: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  inbound: PropTypes.number.isRequired,
  inboundPercentage: PropTypes.string.isRequired,
  outbound: PropTypes.number.isRequired,
  percentage: PropTypes.string.isRequired,
  campaign: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BoxInfo
