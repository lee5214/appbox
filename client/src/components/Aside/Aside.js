import React, { Component } from 'react';
import { Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMode, setMouseTrack } from "actions/setting";
import axios from 'axios';

class Aside extends Component {
	constructor (props) {
		super (props);
		this.toggle = this.toggle.bind (this);
		this.state = {
			mode : '',
			activeTab : '1',
			cameraFixed : false,
			allGoogleUsers : [],
			allFacebookUsers : [],
		};
	}

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState ({
				activeTab : tab,
			});
		}
	};
	componentDidMount = () => {
		axios.get ('/api/all_google_users')
		     .then (res => {
			     Object.keys (res.data).map (key => res.data[ key ]);
			     this.setState ({allGoogleUsers : res.data});
		     })
		     .catch (err => {
			     console.log (err);
		     });
		axios.get ('/api/all_facebook_users')
		     .then (res => {
			     Object.keys (res.data).map (key => res.data[ key ]);
			     this.setState ({allFacebookUsers : res.data});
		     })
		     .catch (err => {
			     console.log (err);
		     });

	};

	componentWillReceiveProps (nextProps) {
		if (nextProps.mode) {
			this.setState ({mode : nextProps.mode});
		}
	}

	renderUser = (obj) => {
		return (
			<div key={ obj._id } className="avatar avatar-xs">
				<img src={ obj.local.avatar } className="img-avatar"
				     alt={ obj.local.displayName }
				     title={ obj.local.displayName }
				/>
			</div>
		);
	};

	render () {
		let {mode, mouseTrack} = this.props;
		return (
			<aside className="aside-menu">
				<Nav tabs>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '1'}) }
						         onClick={ () => { this.toggle ('1'); } }>
							<i className="icon-list"/>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '2'}) }
						         onClick={ () => { this.toggle ('2'); } }>
							<i className="icon-speech"/>
						</NavLink>
					</NavItem>
					{/*<NavItem>*/}
						{/*<NavLink className={ classnames ({active : this.state.activeTab === '3'}) }*/}
						         {/*onClick={ () => { this.toggle ('3'); } }>*/}
							{/*<i className="icon-settings"/>*/}
						{/*</NavLink>*/}
					{/*</NavItem>*/}
				</Nav>
				<TabContent className={ 'd-flex' } activeTab={ this.state.activeTab }>
					<TabPane tabId="1" className={ `p-3 ${mode === '3D' ? 'align-self-center' : null}` }>
						<h6 className={ 'translatex-40 text-right' }>SETTINGS</h6>
						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-4 ">
								<small><b>MODE </b></small>
								<span className={ 'badge' +
								' badge-info' }> { mode }</span>
								<Label for='mode-button'
								       className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input id='mode-button' type="checkbox" className="switch-input"
									       checked={ this.state.mode === '3D' }
									       onChange={ (e) => {
										       //this.props.mode3DToggle(e)
										       this.props.setMode (this.props.mode === '3D' ? '2D' : '3D');
										       // document.body.classList.toggle ('mode-3D-on');
									       } }
									/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
							<div>
								<small className="text-muted">
									2D/3D switch, 3D mode is disabled on mobile device
								</small>
							</div>
						</div>
						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-3">
								<small><b>CURSOR TRACK </b></small>
								<Label for='cursor-button'
								       className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input id='cursor-button' type="checkbox" className="switch-input"
									       checked={ this.props.mouseTrack === true }
									       onChange={ () => {
										       this.props.setMouseTrack (!this.props.mouseTrack);
										       this.setState ({cameraFixed : false});
									       } }
									/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
							<div>
								<small className="text-muted">
									For mouse tracking function, it will change user view based on cursor
									position, I implemented from my old website and tweeked a little for performance.
								</small>
							</div>
						</div>

						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-3">
								<small><b>CAMERA FIXED</b></small>
								<Label for='cameraFixed-button'
								       className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input id='cameraFixed-button' type="checkbox" className="switch-input"
									       checked={ this.state.cameraFixed }
									       onChange={ () => {
										       this.props.resetCamera ();
										       this.setState ({cameraFixed : !this.state.cameraFixed});
									       } }/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
							<div>
								<small className="text-muted">
									To reset camera position and disable cursor tracking function
								</small>
							</div>
						</div>

						<hr/>
						<h6 className={ 'translatex-40 text-right' }>SERVER UTILIZATION</h6>

						{/*<div className="text-uppercase mb-1 mt-4">
							<small><b>CPU Usage</b></small>
						</div>
						<Progress className="progress-xs" color="info" value="25"/>
						<small className="text-muted">348 Processes. 1/4 Cores.</small>

						<div className="text-uppercase mb-1 mt-2">
							<small><b>Memory Usage</b></small>
						</div>
						<Progress className="progress-xs" color="warning" value="70"/>
						<small className="text-muted">11444GB/16384GB</small>

						<div className="text-uppercase mb-1 mt-2">
							<small><b>SSD 1 Usage</b></small>
						</div>
						<Progress className="progress-xs" color="danger" value="95"/>
						<small className="text-muted">243GB/256GB</small>

						<div className="text-uppercase mb-1 mt-2">
							<small><b>SSD 2 Usage</b></small>
						</div>
						<Progress className="progress-xs" color="success" value="10"/>
						<small className="text-muted">25GB/256GB</small>
*/}
						<div className="text-uppercase mb-1 mt-2">
							<a href={ '/api/current_user' } target={ '_blank' }>client info</a>
						</div>
						<div className="text-uppercase mb-1 mt-2">
							<a href={ '/api/clientLog' } target={ '_blank' }>client log</a>
						</div>
					</TabPane>

					<TabPane tabId="2" className={ `p-3 ${mode === '3D' ? 'align-self-center' : null}` }>
						<div className="callout m-0 py-2 text-white text-center bg-dark text-uppercase">
							<small><b>Connect</b></small>
						</div>
						<hr className="transparent mx-3 my-0"/>
						<div className="callout callout-warning m-0 py-3">
							<div className="avatar float-right">
								<img src={ 'img/dynanic-anime.gif' } className="img-avatar"
								     alt="cong-li@cong-li.com"/>
							</div>
							<div>
								<small>Find</small>
								&nbsp;<strong>Cong</strong>?
							</div>
							<small className="text-muted mr-3 text-bold"><i className="fa fa-code mr-2 text-white"/>
								<a href={ 'https://blog.cong-li.com' }
								   target={ '_blank' }>blog</a>
							</small>
							<br/>
							<small className="text-muted mr-3 text-bold"><i className="fa fa-google mr-2 text-white"/>
								<a href={ 'https://groups.google.com/a/cong-li.com/forum/#!forum/discuss' }
								   target={ '_blank' }>google group</a>
							</small>
							<br/>
							<small className="text-muted mr-3 bold"><i className="fa fa-envelope mr-2 text-white"/>
								<a href={ 'mailto:cong-li@cong-li.com' }>cong-li@cong-li.com</a>
							</small>

						</div>
						<hr className="mx-3 my-0"/>
						{ /*<div className="callout callout-info m-0 py-3">*/ }
						{ /*<div className="avatar float-right">*/ }
						{ /*<img src={ 'img/avatars/4.jpg' } className="img-avatar"*/ }
						{ /*alt="admin@bootstrapmaster.com"/>*/ }
						{ /*</div>*/ }
						{ /*<div>Skype with <strong>Megan</strong></div>*/ }
						{ /*<small className="text-muted mr-3"><i className="icon-calendar"/>&nbsp; 4 - 5pm</small>*/ }
						{ /*<small className="text-muted"><i className="icon-social-skype"/>&nbsp; On-line</small>*/ }
						{ /*</div>*/ }
						<hr className="transparent mx-3 my-0"/>
						<div className="callout m-0 py-2 text-muted text-center bg-white text-uppercase">
							<small><b>Users Database</b></small>
						</div>
						<hr className="transparent mx-3 my-0"/>
						<div className="callout callout-danger m-0 py-3">
							<div><strong> Google Users</strong></div>
							<small className="text-muted mr-3"><i
								className="icon-calendar"/>&nbsp; total: { this.state.allGoogleUsers.length } users
							</small>
							<div className="avatars-stack mt-2">
								{ this.state.allGoogleUsers.length > 0 ?
									this.state.allGoogleUsers.map (item => this.renderUser (item))
									: <div>Loading</div>
								}
							</div>
						</div>
						<hr className="transparent mx-3 my-0"/>
						<div className="callout callout-danger m-0 py-3">
							<div><strong> Facebook Users</strong></div>
							<small className="text-muted mr-3"><i
								className="icon-calendar"/>&nbsp; total: { this.state.allFacebookUsers.length } users
							</small>
							<div className="avatars-stack mt-2">
								{ this.state.allFacebookUsers.length > 0 ?
									this.state.allFacebookUsers.map (item => this.renderUser (item))
									: <div>Loading</div>
								}
							</div>
						</div>

						{/*<hr className="mx-3 my-0"/>
						<div className="callout callout-primary m-0 py-3">
							<div><strong>Team meeting</strong></div>
							<small className="text-muted"><i className="icon-home"/>&nbsp; creativeLabs HQ</small>
							<div className="avatars-stack mt-2">
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/2.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/3.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/4.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/5.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/6.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/8.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
							</div>
						</div>
						<hr className="mx-3 my-0"/>*/}
					</TabPane>

					{/*<TabPane tabId="3" className={ `p-3 ${mode === '3D' ? 'align-self-center' : null}` }>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
					</TabPane>*/}
				</TabContent>
			</aside>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		setting : state.setting,
	};
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators ({setMode, setMouseTrack}, dispatch);
};
export default connect (mapStateToProps, mapDispatchToProps) (Aside);
