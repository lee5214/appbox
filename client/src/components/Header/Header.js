import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

	constructor (props) {
		super (props);
	}

	sidebarToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-hidden');
	};

	sidebarMinimize = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-minimized');
	};

	mobileSidebarToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-mobile-show');
	};

	asideToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('aside-menu-hidden');
	};

	renderUserInfo () {
		switch (this.props.currentUserInfo) {
			case null:
				return 'null';
			case false:
				return (
					<NavItem className="d-md-down-none">
						<NavLink href={ '/login' }><i className="icon-login"/></NavLink>
					</NavItem>
				);
			default:
				return <HeaderDropdown currentUserInfo={ this.props.currentUserInfo }/>;
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
		return (
			<header className="app-header navbar">

				<NavbarToggler className="d-lg-none" onClick={ this.mobileSidebarToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>
				<NavbarBrand href="#"><p>LEE</p></NavbarBrand>
				<NavbarToggler className="d-md-down-none" onClick={ this.sidebarToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>
				<Nav className="d-md-down-none" navbar>
					<NavItem className="px-3">
						<NavLink href="#"><i className="fa fa-address-book mr-2"/>Users</NavLink>
					</NavItem>
					<NavItem className="px-3">
						<NavLink href="#"><i className="fa fa-cogs mr-2"/>Settings</NavLink>
					</NavItem>
					<NavItem className="px-3">
						<NavLink href="/login"><i className="fa fa-sign-in-alt mr-2"/> Login / Register</NavLink>
					</NavItem>
				</Nav>

				<Nav className="ml-auto" navbar>
					<NavItem className="d-md-down-none">
						<NavLink href="#"><i className="fa fa-bell"/><Badge pill color="danger">5</Badge></NavLink>
					</NavItem>

					{ this.renderUserInfo () }
				</Nav>
				<NavbarToggler className="d-md-down-none" onClick={ this.asideToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>
			</header>
		);
	}
}

export default connect () (Header);
