import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { login } from '../actions/userActions';

const LoginScreen = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	const redirect = location.search ? location.search.split('=')[1] : '/';
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);
	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
