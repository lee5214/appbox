import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade, Alert, Badge, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

	constructor (props) {
		super (props);
	}

	sidebarToggle (e) {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-hidden');
	}

	sidebarMinimize (e) {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-minimized');
	}

	mobileSidebarToggle (e) {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-mobile-show');
	}

	asideToggle (e) {
		e.preventDefault ();
		document.body.classList.toggle ('aside-menu-hidden');
	}

	renderUserInfo () {
		switch (this.props.userInfo) {
			case null:
				return 'null';
			case false:
				return (
					<NavItem className="d-md-down-none">
						<NavLink href={ '/login' }><i className="icon-login"/></NavLink>
					</NavItem>
				);
			default:
				return <HeaderDropdown userInfo={ this.props.userInfo }/>;
		}
	}

	// renderLogInAlert () {
	// 	if (this.props.userInfo) {
	// 		return (
	// 				<Alert className={'alertFadeOut'} color="primary">
	// 					Welcome { this.props.userInfo.local.email || '' }
	// 				</Alert>
	// 		);
	// 	}
	// 	return null;
	// }
	//
	// componentDidMount(){
	// 	{ this.renderLogInAlert () }
	// }
	render () {
		console.log ('header user=>', this.props);
		return (
			<header className="app-header navbar">

				<NavbarToggler className="d-lg-none" onClick={ this.mobileSidebarToggle }>
					<span className="navbar-toggler-icon"></span>
				</NavbarToggler>
				<NavbarBrand href="#"><p>LEE</p></NavbarBrand>
				<NavbarToggler className="d-md-down-none" onClick={ this.sidebarToggle }>
					<span className="navbar-toggler-icon"></span>
				</NavbarToggler>
				<Nav className="d-md-down-none" navbar>
					<NavItem className="px-3">
						<NavLink href="#">Users</NavLink>
					</NavItem>
					<NavItem className="px-3">
						<NavLink href="#">Settings</NavLink>
					</NavItem>
					<NavItem className="px-3">
						<NavLink href="/login">Login / Register</NavLink>
					</NavItem>
				</Nav>

				<Nav className="ml-auto" navbar>
					<NavItem className="d-md-down-none">
						<NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
					</NavItem>
					<NavItem className="d-md-down-none">
						<NavLink href="#"><i className="icon-list"></i></NavLink>
					</NavItem>
					<NavItem className="d-md-down-none">
						<NavLink href="#"><i className="icon-location-pin"></i></NavLink>
					</NavItem>
					{ this.renderUserInfo () }
				</Nav>
				<NavbarToggler className="d-md-down-none" onClick={ this.asideToggle }>
					<span className="navbar-toggler-icon"></span>
				</NavbarToggler>
			</header>
		);
	}
}

export default connect () (Header);
