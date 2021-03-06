import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';
import MessageDropdown from './MessageDropdown';

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
	mobileAsideMenuToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('aside-menu-mobile-show');
	};

	asideToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('aside-menu-hidden');
	};
	renderUserInfo = () => {
		switch (this.props.currentUserInfo) {
			case null:
				return <div>Loading</div>;
			case false:
				return (
					<NavItem className="d-md-down-none">
						<NavLink href={ '/login' }><i className="icon-login"/></NavLink>
					</NavItem>
				);
			default:
				return <HeaderDropdown currentUserInfo={ this.props.currentUserInfo }/>;
		}
	};

	renderHeaderMessageDropdown = () => {

	};
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
		let msgList = {
			1: {
				read:false,
				avatar : '1',
				displayName : '2',
				message : '233333',
			},
			2: {
				read:true,
				avatar : '1',
				displayName : '2',
				message : '233333',
			},
			3: {
				read:false,
				avatar : '1',
				displayName : '2',
				message : '233333',
			}
    };
		return (
			<header className="app-header navbar">

				<NavbarToggler className="d-lg-none" onClick={ this.mobileSidebarToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>
        <NavbarBrand href="/"/>
				<NavbarToggler className="d-md-down-none" onClick={ this.sidebarToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>
				<Nav className="d-md-down-none" navbar>
					{/*<NavItem className="px-3">
						<NavLink disabled href="/"><i className="fa fa-address-book mr-2"/>Users</NavLink>
					</NavItem>
					<NavItem className="px-3">
						<NavLink disabled href="#"><i className="fa fa-cogs mr-2"/>Settings</NavLink>
					</NavItem>*/}

					<Route path="/login" name="login">
						<NavItem className="px-3">
							<Link to="/login"><i className="fa fa-sign-in mr-2"/> Login / Register</Link>
						</NavItem>
					</Route>
				</Nav>

				<Nav className="ml-auto" navbar>
					{ /*<NavItem className="d-md-down-none">*/ }
					{ /*<NavLink href="#"><i className="fa fa-bell"/><Badge pill*/ }
					{ /*color="danger"> { this.props.message ? this.props.message.serverToClient.length : 0 } </Badge></NavLink>*/ }
					{ /*</NavItem>*/ }
					<MessageDropdown messages={msgList}/>
					{ this.renderUserInfo () }
				</Nav>
				<NavbarToggler className="d-md-down-none" onClick={ this.asideToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>

				<NavbarToggler className="d-lg-none" onClick={ this.mobileAsideMenuToggle }>
					<span className="navbar-toggler-icon"/>
				</NavbarToggler>
			</header>
		);
	}
}

export default connect () (Header);
