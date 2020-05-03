import React, { Component } from 'react';
import './Auth.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthService from '../../services/AuthService.js';

class Auth extends Component {
    render() {
        return (
			<div>
				<h1>Login</h1>
				<Formik
					initialValues={{ email: '', password: '' }}
					validate={values => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
						) {
							errors.email = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
                        let authService = new AuthService();
                        authService.login(values.email, values.password)
                            .then(res => {
                                setSubmitting(false);
                                authService.setUserInfo(res.data);
                                alert('refresh page because i do not know how to using React :D');
                            })
                            .catch(error => {
                                setSubmitting(false);
                                alert(error.response.data.error);
                            })
					}}
				>
				{({ isSubmitting }) => (
					<Form>
						<Field type="email" name="email" />
						<ErrorMessage name="email" component="div" />
						<Field type="password" name="password" />
						<ErrorMessage name="password" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
				</Formik>
		   </div>
       );
    }
}

export default Auth;
