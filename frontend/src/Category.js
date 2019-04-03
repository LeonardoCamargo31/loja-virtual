import React, { Component, Fragment } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Category extends Component {
    renderForm() {
        return (
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <h3 class="h4">Cadastro de produtos</h3>
                    </div>
                    <div class="card-body">
                        <p>Informe os campos abaixo, para cadastrar um novo produto</p>
                        <div className="row">
                            <button className="btn btn-primary">Cadastrar</button>
                            <button className="btn btn-default">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <h3 class="h4">Produtos registrados</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Preço</th>
                                        <th>Revendedora</th>
                                        <th className="action">Editar</th>
                                        <th className="action">Deletar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    renderRows() {
        return (
            <tr>
                <td>Titulo</td>
                <td>R$ 200,00</td>
                <td>Nome</td>
                <td className="action"><a><div class="icon icon-search"></div></a></td>
                <td className="action"><a><div class="icon icon-close"></div></a></td>
            </tr>
        )
    }

    render() {
        return (<Fragment>

            <section>
                <div class="container-fluid">
                    <div class="row">
                        {this.renderForm()}
                        {this.renderTable()}
                    </div>
                </div>
            </section>
            <ToastContainer />
        </Fragment>)
    }
}