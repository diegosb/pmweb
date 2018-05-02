import React, {Component, Fragment} from 'react'
import CustomModal from 'react-responsive-modal'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-flexbox-grid'

import './Contato.scss'

class Contato extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
  }

  state = {
    errors: {
      nome: false,
      email: false,
      mensagem: false,
      data: false,
    },
    nome: '',
    email: '',
    mensagem: '',
    data: '',
    files: [],
    formSent: false,
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleFiles = event => {
    const files = [...this.state.files, ...event.target.files]
    this.setState({files})
  }

  removeFile = file => {
    const files = this.state.files.filter(f => f.name !== file.name)
    this.setState({files})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {nome, email, mensagem, data, errors, formSent} = this.state
    errors.nome = !nome
    errors.email = !email
    errors.mensagem = !mensagem
    errors.data = !data
    this.setState({errors})
    if (!Object.values(errors).find(error => error === true)) {
      this.setState({formSent: true})
      console.log('Enviado')
    }
  }

  cleanForm = () => {
    this.setState(
      {
        errors: {
          nome: false,
          email: false,
          mensagem: false,
          data: false,
        },
        nome: '',
        email: '',
        mensagem: '',
        data: '',
        files: [],
        formSent: false,
      },
      () => this.props.toggle(),
    )
  }

  renderError = () => (
    <span className="text-error">Preenchimento obrigatório</span>
  )

  renderSelectedFiles = files => (
    <ul className="list-files">
      {files.map(file => (
        <li key={file.lastModified} className="files__item">
          <a
            href="#"
            onClick={() => this.removeFile(file)}
            title="Excluir anexo"
          >
            x
          </a>
          {file.name} ({`${file.size}K`})
        </li>
      ))}
    </ul>
  )

  render() {
    const {isOpen, toggle} = this.props
    const {errors, nome, email, mensagem, data, files, formSent} = this.state
    return (
      <CustomModal
        open={isOpen}
        onClose={toggle}
        center
        classNames={{modal: `modal-contato ${formSent ? 'form-enviado' : ''}`}}
      >
        {!formSent ? (
          <Fragment>
            <header>
              <h2>Entre em contato</h2>
            </header>
            <div className="modal__content">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome *</label>
                      <input
                        type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={this.handleInputChange}
                        className={errors.nome ? 'error-field' : ''}
                      />
                      {errors.nome && this.renderError()}
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={this.handleInputChange}
                        className={errors.email ? 'error-field' : ''}
                      />
                      {errors.email && this.renderError()}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="form-group">
                      <label htmlFor="mensagem">Mensagem *</label>
                      <textarea
                        name="mensagem"
                        id="mensagem"
                        value={mensagem}
                        onChange={this.handleInputChange}
                        className={errors.mensagem ? 'error-field' : ''}
                      />
                      {errors.mensagem && this.renderError()}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <label htmlFor="data">Data de Nascimento *</label>
                      <input
                        type="text"
                        placeholder="__/__/____"
                        name="data"
                        id="data"
                        value={data}
                        onChange={this.handleInputChange}
                        className={errors.data ? 'error-field' : ''}
                      />
                      {errors.data && this.renderError()}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="form-group">
                      <label htmlFor="files">
                        Clique aqui
                        <input
                          type="file"
                          multiple="multiple"
                          id="files"
                          name="files[]"
                          onChange={this.handleFiles}
                        />
                      </label>
                      <span>
                        {' '}
                        para anexar arquivos a partir do seu computador.
                      </span>
                    </div>
                    <div className="form-group">
                      {this.renderSelectedFiles(files)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <button type="submit" className="btn btn-contact">
                      Enviar
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </Fragment>
        ) : (
          <div className="modal__contato-enviado">
            <h2>Mensagem enviada!</h2>
            <p>Agradecemos seu contato.</p>
            <p>Retornaremos o mais breve possível</p>
            <button
              type="button"
              className="btn btn-contact btn-return"
              onClick={this.cleanForm}
            >
              Voltar
            </button>
          </div>
        )}
      </CustomModal>
    )
  }
}

export default Contato
