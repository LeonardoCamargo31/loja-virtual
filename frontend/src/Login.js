import React, { Component, Fragment } from 'react'
import * as yup from 'yup'
import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik'

import { browserHistory } from 'react-router';
import * as LoginActions from './data/actions/LoginActions';
import { connect } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    email: '', password: ''
}

const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
})

class Login extends Component {

    notifySuccess(message) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    notifyError(message) {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    handleSubmit(values) {
        const email = values.email
        const password = values.password

        this.props.dispatch(LoginActions.authorize(email, password))
    }

    render() {
        const { error, userToken } = this.props.auth;

        if (error != null && userToken == null) {
            this.notifyError('Não está autenticado')
        }
        if (userToken != null) {
            browserHistory.push('/index');
        }

        return (
            <Fragment>
                <ToastContainer />
                <div className="page login-page">
                    <div className="container d-flex align-items-center">
                        <div className="form-holder has-shadow">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="info d-flex align-items-center">
                                        <div className="content">
                                            <div className="logo">
                                                <h1>Autenticação</h1>
                                            </div>
                                            <p>Lorem ipsum </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 bg-white">
                                    <div className="form d-flex align-items-center">
                                        <div className="content">
                                            <Formik initialValues={initialValues} onSubmit={this.handleSubmit.bind(this)} validationSchema={validations}>
                                                <FormikForm className="Form">
                                                    <div className="form-group">
                                                        <Field className="input-material" name="email" type="text" autocomplete="off" />
                                                        <ErrorMessage className="Form-Error" component="span" name="email" />
                                                        <label for="login-username" className="label-material">E-mail</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <Field className="input-material" name="password" type="password" autocomplete="off" />
                                                        <ErrorMessage className="Form-Error" component="span" name="password" />
                                                        <label for="login-username" className="label-material">Senha</label>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Login</button>
                                                </FormikForm>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyrights text-center">
                        <p>Design by <a href="https://bootstrapious.com/p/admin-template" className="external">Bootstrapious</a></p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Login);
