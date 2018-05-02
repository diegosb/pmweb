import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomModal from 'react-responsive-modal'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './Table.scss'
import './Modal.scss'

class BSTable extends React.Component {
  formatNumber(cell, row) {
    return cell.toLocaleString('pt-BR')
  }

  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn dataField="name" width="20%" isKey={true}>
            Campanha
          </TableHeaderColumn>
          <TableHeaderColumn dataField="goal" width="20%">
            Objetivo
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="impressions"
            width="10%"
            dataFormat={this.formatNumber}
          >
            Impressões
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="clicks"
            width="10%"
            dataFormat={this.formatNumber}
          >
            Cliques
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ctr" width="10%">
            CTR
          </TableHeaderColumn>
          <TableHeaderColumn dataField="cpm" width="10%">
            CPM (R$)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="cpc" width="10%">
            CPC (R$)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="custo" width="10%">
            Custo (R$)
          </TableHeaderColumn>
        </BootstrapTable>
      )
    } else {
      return <p>?</p>
    }
  }
}

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    info: PropTypes.array,
  }

  isExpandableRow(row) {
    if (row.campaign.length > 0) {
      return true
    }
    return false
  }

  expandComponent = row => {
    return <BSTable data={row.campaign} />
  }

  campaignFormatter(cell, row) {
    if (cell.length > 1) {
      return `${cell.length} campanhas`
    }
    return `${cell.length} campanha`
  }

  socialFormatter(cell, row) {
    return (
      <div>
        <FontAwesomeIcon
          icon={faFacebook}
          color={cell.includes('facebook') ? '#3b5998' : '#323232'}
        />
        <FontAwesomeIcon
          icon={faGoogle}
          color={cell.includes('google') ? '#ea4335' : '#323232'}
        />
      </div>
    )
  }

  progressBarFormatter(cell, row) {
    return (
      <div className="progress-bar" style={{maxWidth: '165px'}}>
        <svg height="10px" width="100px">
          <rect fill="#151515" width="100%" height="100%" rx="5" ry="5" />
          <g>
            <rect width={cell} height="95%" fill="#34a56b" rx="5" ry="5" />
          </g>
        </svg>
        {cell}
      </div>
    )
  }

  render() {
    const {isOpen, toggle, title, info} = this.props
    return (
      <CustomModal
        open={isOpen}
        onClose={toggle}
        center
        classNames={{overlay: 'custom-overlay', modal: 'custom-modal'}}
      >
        <h2>{title}</h2>
        <div className="modal__content">
          <BootstrapTable
            data={info}
            expandableRow={this.isExpandableRow}
            expandComponent={this.expandComponent}
          >
            <TableHeaderColumn dataField="kind" width="25%" isKey>
              Target
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="channels"
              dataFormat={this.socialFormatter}
              width="10%"
            >
              Canais
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="campaign"
              dataFormat={this.campaignFormatter}
              width="15%"
            >
              Campanhas
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="healthstatus"
              dataFormat={this.progressBarFormatter}
              width="20%"
            >
              Health Status
            </TableHeaderColumn>
            <TableHeaderColumn dataField="created" width="15%">
              Criado em
            </TableHeaderColumn>
            <TableHeaderColumn dataField="period" width="15%">
              Periodicidade
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </CustomModal>
    )
  }
}

export default Modal
