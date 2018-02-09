import React, { Component } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Col,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	Row,
} from 'reactstrap';
import axios from 'axios'

class Register extends Component {
	constructor (props){
		super(props)
		this.state={
			userName: '',
			email: '',
			password: '',
			repeatPassword: ''
		}
	}
	hundleSubmit = () => {
		axios.post('/register',this.state.userRegisterInfo)
	}
	render () {
		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="6">
							<Card className="mx-4">
								<CardBody className="p-4">
									<h1>Register</h1>
									<p className="text-muted">Create your account</p>
									<InputGroup className="mb-3">
										<InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
										<Input type="text" placeholder="Username"
										       onChange={e => this.setState({userName:e.target.value})}
										       value = {this.state.userName}
										/>
									</InputGroup>
									<p>{this.state.userName}</p>
									<InputGroup className="mb-3">
										<InputGroupAddon>@</InputGroupAddon>
										<Input type="text" placeholder="Email"
										       onChange={e => this.setState({email:e.target.value})}
										       value = {this.state.email}/>
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
										<Input type="password" placeholder="Password"
										       onChange={e => this.setState({passWord:e.target.value})}
										       value = {this.state.passWord}/>
									</InputGroup>
									<InputGroup className="mb-4">
										<InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
										<Input type="password" placeholder="Repeat password"
										       onChange={e => this.setState({repeatPassword:e.target.value})}
										       value = {this.state.repeatPassword}/>
									</InputGroup>
									<Button color="success" block onSubmit={this.hundleSubmit}>Create Account</Button>
								</CardBody>
								<CardFooter className="p-4">
									<Row>
										<Col xs="12" sm="6">
											<Button href={ '/auth/facebook' } className="btn-facebook" block><span>facebook</span></Button>
										</Col>
										<Col xs="12" sm="6">
											<Button href={ '/auth/google' } className="btn-google-plus" block><span>google</span></Button>
										</Col>
									</Row>
								</CardFooter>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Register;
