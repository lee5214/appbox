import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, } from 'reactstrap';

class HeaderDropdown extends Component {

	constructor (props) {
		super (props);

		this.toggle = this.toggle.bind (this);
		this.state = {
			dropdownOpen : false,
		};
	}

	toggle () {
		this.setState ({
			dropdownOpen : !this.state.dropdownOpen,
		});
	}

	dropAccnt () {
		const {avatar, displayName} = this.props.currentUserInfo.local;
		return (
			<Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
				<DropdownToggle nav>
					<img src={ avatar || 'img/avatars/6.jpg' } className="img-avatar"
					     alt={ displayName }/>
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem header tag="div" className="text-center"><strong>Account - {displayName}</strong></DropdownItem>
					<DropdownItem><i className="fa fa-bell-o"/> Updates<Badge color="info">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-envelope-o"/> Messages<Badge
						color="success">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-tasks"/> Tasks<Badge color="danger">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-comments"/> Comments<Badge
						color="warning">42</Badge></DropdownItem>
					<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
					<DropdownItem><i className="fa fa-user"/> Profile</DropdownItem>
					<DropdownItem><i className="fa fa-wrench"/> Settings</DropdownItem>
					{ /* <DropdownItem><i className="fa fa-usd" /> Payments<Badge*/ }
					{ /* color="secondary">42</Badge></DropdownItem>*/ }
					{ /* <DropdownItem><i className="fa fa-file" /> Projects<Badge*/ }
					{ /* color="primary">42</Badge></DropdownItem>*/ }
					{ /* /!*<DropdownItem divider/>*!/*/ }
					{ /* <DropdownItem><i className="fa fa-shield" /> Lock Account</DropdownItem>*/ }
					<DropdownItem href={ '/api/logout' }><i className="icon-logout"/> Logout</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}

	render () {
		const {...attributes} = this.props;
		return (
			this.dropAccnt ()
		);
	}
}


export default connect()(HeaderDropdown);
