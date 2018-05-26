import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavItem } from 'reactstrap';

class HeaderMessageDropdown extends Component {

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
		return (
			<Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
				<DropdownToggle nav>
					<NavItem className="d-md-down-none">
						<div className={ 'nav-link' } href="#"><i className="fa fa-bell"/><Badge pill
						                                                                         color="danger"> { this.props.message ? this.props.message.serverToClient.length : 0 } </Badge>
						</div>
					</NavItem>
				</DropdownToggle>

				<DropdownMenu right>
					<DropdownItem header tag="div" className="text-center"><strong>MessageBox</strong></DropdownItem>
					{ this.props.messages ?
						Object.keys (this.props.messages).map (obj => {
							<div>{ obj.avatar }</div>;
						}) :
						<div>Empty</div>
					}
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


export default connect () (HeaderMessageDropdown);
