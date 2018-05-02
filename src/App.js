import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'

import BoxInfo from './Components/BoxInfo'
import Calendar from './Components/Calendar'
import Loader from './Components/Loader'
import './App.scss'
import Contato from './Components/Contato'
import Chart from './Components/Chart'

const CAMPAIGN_API =
  'http://teste-frontend.agencia-linux.pmweb.com.br/api/intranet/campaigns.php'
const NOTIFICATION_API =
  'http://teste-frontend.agencia-linux.pmweb.com.br/api/intranet/notification.php'
const TRANSACTION_API =
  'http://teste-frontend.agencia-linux.pmweb.com.br/api/intranet/transaction.php'
const CHARTDATA_API =
  'http://teste-frontend.agencia-linux.pmweb.com.br/api/intranet/healthstatus.php'

function replacePercentage(string) {
  return string.replace('%', '')
}

class App extends Component {
  state = {
    campaign: {
      date: '',
      time: '',
      healthstatus: '',
      difference: '',
      inbound: 0,
      outbound: 0,
      campaigns: [],
    },
    notification: {
      date: '',
      time: '',
      healthstatus: '',
      difference: '',
      inbound: 0,
      outbound: 0,
      campaigns: [],
    },
    transaction: {
      date: '',
      time: '',
      healthstatus: '',
      difference: '',
      inbound: 0,
      outbound: 0,
      campaigns: [],
    },
    chart: {
      chartdata: [],
      date: '',
      time: '',
    },
    modalContactIsOpen: false,
  }

  componentDidMount() {
    axios
      .get(CAMPAIGN_API)
      .then(response => this.setState({campaign: response.data}))
      .catch(err => console.error(err))
    axios
      .get(NOTIFICATION_API)
      .then(response => this.setState({notification: response.data}))
      .catch(err => console.error(err))
    axios
      .get(TRANSACTION_API)
      .then(response => this.setState({transaction: response.data}))
      .catch(err => console.error(err))
    axios
      .get(CHARTDATA_API)
      .then(response => this.setState({chart: response.data}))
      .catch(err => console.error(err))
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalContactIsOpen: !prevState.modalContactIsOpen,
    }))
  }

  render() {
    const {
      campaign,
      notification,
      transaction,
      chart,
      modalContactIsOpen,
    } = this.state
    if (
      !campaign.inbound &&
      !notification.inbound &&
      !transaction.inbound &&
      chart.chartdata.length
    ) {
      return (
        <div className="App">
          <Loader />
        </div>
      )
    }
    return (
      <div className="App">
        <Grid>
          <Row className="App-header">
            <div className="breadcrumbs">
              <ol>
                <li>
                  Pmweb <FontAwesomeIcon icon={faChevronRight} size="xs" />
                </li>
                <li className="active">Health Status</li>
              </ol>
            </div>
            <div className="calendar">
              <Calendar />
            </div>
          </Row>

          <Row>
            <Col xs={12}>
              <Chart data={chart} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <BoxInfo
                lastUpdate={`${campaign.date} ${campaign.time}`}
                inbound={campaign.inbound}
                inboundPercentage={replacePercentage(campaign.difference)}
                outbound={campaign.outbound}
                title="Campaigns"
                percentage={replacePercentage(campaign.healthstatus)}
                campaign={campaign.campaigns}
              />
            </Col>
            <Col xs={12} md={4}>
              <BoxInfo
                lastUpdate={`${notification.date} ${notification.time}`}
                inbound={notification.inbound}
                inboundPercentage={replacePercentage(notification.difference)}
                outbound={notification.outbound}
                title="Notification"
                percentage={replacePercentage(notification.healthstatus)}
                campaign={notification.campaigns}
              />
            </Col>
            <Col xs={12} md={4}>
              <BoxInfo
                lastUpdate={`${transaction.date} ${transaction.time}`}
                inbound={transaction.inbound}
                inboundPercentage={replacePercentage(transaction.difference)}
                outbound={transaction.outbound}
                title="Transaction"
                percentage={replacePercentage(transaction.healthstatus)}
                campaign={transaction.campaigns}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row center="md">
                <Col xs={12} md={4}>
                  <button
                    type="button"
                    className="btn btn-contact"
                    onClick={this.toggleModal}
                  >
                    Entrar em contato
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <Contato isOpen={modalContactIsOpen} toggle={this.toggleModal} />
      </div>
    )
  }
}

export default App
