import React, { Component } from 'react';
import axios from 'axios';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardGroup,
	Col,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	Row,
} from 'reactstrap';


class Login extends Component {
	constructor (props) {
		super (props);
		this.state = {
			username : '',
			password : '',
		};
	}

	handleLoginButton = () => {
		axios.post (
			'/auth/local_login',
			{'username' : this.state.username, 'password' : this.state.password},
		).then ((res) => {
			// IMPORTANT read /authRoutes/important
			window.location = res.data.redirect;
			//browserHistory.push('/')

		}).catch (err => {
			console.log ('err =>', err);
		});
	};

	render () {
		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="8">
							<CardGroup>
								<Card className="p-4">
									<CardBody>
										<h1>Login</h1>
										<p className="text-muted">Sign In to your account</p>
										<InputGroup className="mb-3">
											<InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
											<Input type="text" placeholder="Username"
											       onChange={ (e) => this.setState ({username : e.target.value}) }
											/>
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
											<Input type="password" placeholder="Password"
											       onChange={ (e) => this.setState ({password : e.target.value}) }
											/>
										</InputGroup>
										<Row>
											<Col xs="12" className={'text-center'} >
												<Button color="primary" className="px-4"
												        onClick={ this.handleLoginButton }
												>Login</Button>
											</Col>
											{/*<Col xs="6" className="text-right">*/}
												{/*<Button color="link" className="px-0">Forgot password?</Button>*/}
											{/*</Col>*/}
										</Row>
									</CardBody>
									<CardFooter className="p-4">
										<Row>
											<Col xs="12" sm="6">
												<Button href={ '/auth/facebook' } className="btn-facebook mt-3"
												        block><span>facebook</span></Button>
											</Col>

											<Col xs="12" sm="6">
												<Button href={ '/auth/google' } className="btn-google-plus mt-3"
												        block><span>google</span></Button>
											</Col>
										</Row>
									</CardFooter>
								</Card>
								<Card className="text-white bg-primary py-5 d-md-down-none"
								      style={ {width : 44 + '%'} }>
									<CardBody className="text-center pt-0">
										<div>
											<h2>Sign up</h2>
											<p>
												OAuth2.0 implemented, recommend log in with social account, or register
												with your email address & password </p>
											<Button href={ '#/register' } color="primary" className="mt-3" active>
												Hit The Button
											</Button>
										</div>
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Login;
