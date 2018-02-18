import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, NavbarToggler } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGuestUser, fetchCurrentUser, setMode, setMouseTrack } from 'actions';
// Route & Components
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';
import Projects from '../../views/Projects/Projects';

import Panel from '../../views/Panel';
import City from '../../views/City/';
// import ChatRoom from '../../views/ChatRoom';
import ChatRoomV2 from '../../views/ChatRoomV2/';
import SecretLinks from '../../views/SecretLinks/';


import BannerLine from 'components/_Composite/BannerLine/';
import { Myself } from '../../views/About';
import Test from '../../views/Test/Test';
//
// Icons & Style
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import { calcAngleDegrees } from 'utils';
import style from './AppContainer.scss';

//
// Socket Client
//

/*
 let webSocketUri = window.location.host;
 console.log ('react gets window.location.host =>', webSocketUri);
 if (webSocketUri === 'localhost:3000') { webSocketUri = 'localhost:4000';} // rewrite host in dev env

 const socket = socketIOClient (webSocketUri);
 */

class AppContainer extends Component {
	// TODO theme3D -- done
	constructor (props) {
		super (props);
		this.state = {
			mode3D_permission : true,
			roX : 0,
			roY : 0,
			roZ : 0,
			videoURL : 'http://techslides.com/demos/sample-videos/small.mp4',
		};
		this.minimalInnerlWidth = 1200;
	}

	componentDidMount = () => {
		this.props.fetchCurrentUser ();
		this.handleResize ();

		window.addEventListener ('resize', this.handleResize);

		console.log ('Host =>', window.location.host);
		console.log ('Mode Activation =>', this.props.setting.layout.mode);
		//console.log ('Socket Connection =>', socket);
		console.log ('App Rect =>', this.appBodyRef.getBoundingClientRect ());
	};

	onMouseMove = (e) => {
		let mX = e.clientX, mY = e.clientY;
		let maxRotateX = 10;
		let maxRotateY = 10;
		let maxRotateZ = 360;
		let view_option = 3;
		let {left, right, top, bottom, height, width} = this.appBodyRef.getBoundingClientRect ();
		let centerX = width / 2,
			centerY = height / 2,
			curRelPosX = mX - left,
			curRelPosY = mY - top,
			percentX = (curRelPosX - centerX) / centerX,
			percentY = (curRelPosY - centerY) / centerY;
		let roX = -percentY * maxRotateX, roY = percentX * maxRotateY;
		let roZ = calcAngleDegrees (curRelPosX - centerX, -(curRelPosY - centerY)).toFixed(2);//

		if (roX !== this.state.roX || roY !== this.state.roY) {
			this.setState ({roX, roY, roZ});
		}
	};
	sidebarToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-hidden');
	};
	sidebarMinimize = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('sidebar-minimized');
	};
	asideToggle = (e) => {
		e.preventDefault ();
		document.body.classList.toggle ('aside-menu-hidden');
	};
	// mode3DToggle = (e) => {
	// 	e.preventDefault ();
	// 	if (window.innerWidth < this.minimalInnerlWidth) {
	// 		document.body.classList.remove ('mode-3D-on');
	// 		this.setState ({mode3D_permission : false});
	// 		this.props.setMode ('2D');
	// 		this.props.setMouseTrack (false);
	// 		console.log (`force 2D mode, minimal width breakpoint: --${this.minimalInnerlWidth}px--, 3D mode
	// disable`); } else { document.body.classList.toggle ('mode-3D-on');
	// this.props.setMode(this.props.setting.layout.mode==='3D'?'2D':'3D') this.setState ({mode3D_permission : true});
	// } };
	handleResize = () => {
		if (window.innerWidth < this.minimalInnerlWidth) {
			document.body.classList.remove ('mode-3D-on');
			this.setState ({mode3D_permission : false});
			this.props.setMode ('2D');
			this.props.setMouseTrack (false);
			console.log (`resize detected, minimal width breakpoint: --${this.minimalInnerlWidth}px--, 3D mode disable`);
		} else {
			document.body.classList.add ('mode-3D-on');
			this.setState ({mode3D_permission : true});
		}
	};
	resetCamera = () => {
		this.setState ({roX : 0, roY : 0});
		this.props.setMouseTrack (false);
	};

	render () {
		let app3D = {
			transform : 'rotateX(' + this.state.roX + 'deg) rotateY(' + this.state.roY + 'deg)',
		};
		let {setMode, setMouseTrack, setting : {layout : {mode, mouseTrack}}} = this.props;
		return (
			<div className={ `app mode-${mode}` }
			     onMouseMove={ this.state.mode3D_permission && mouseTrack ? this.onMouseMove : null }
			     ref={ appBodyRef => {this.appBodyRef = appBodyRef;} }
			     style={ this.state.mode3D_permission && mode === '3D' ? app3D : null }>
				<Header currentUserInfo={ this.props.currentUserInfo }
				/>
				<div></div>
				<div className="app-body">
					<Sidebar { ...this.props }/>
					<main className="main animated">
						<div className={ style.breadcrumb_wrapper }>
							<BannerLine/>
							<Container>
								<Breadcrumb/>
							</Container>
						</div>

						<NavbarToggler className="d-md-down-none position-absolute sidebar-btn d-none"
						               onClick={ this.sidebarToggle }>
							<i className={ 'fa fa-angle-double-left fa-2x text-white' }/>
							{ /*<span className="navbar-toggler-icon"/>*/ }
						</NavbarToggler>
						<NavbarToggler className="d-md-down-none position-absolute aside-btn d-none"
						               onClick={ this.asideToggle }>
							<i className={ 'fa fa-angle-double-right fa-2x text-white' }/>
							{ /*<span className="navbar-toggler-icon"/>*/ }
						</NavbarToggler>

						<Container className={ style.block }>
							<Switch>
								<Route path="/panel" name="Panel"
								       render={ () => <Panel roZ={ this.state.roZ }/> }
								/>
								<Route path="/dashboard" name="Dashboard"
								       render={ () => < Dashboard/> }
									// component={ Dashboard }/>
								/>
								<Route path="/components/buttons" name="Buttons"
								       component={ Buttons }/>
								<Route path="/components/cards" name="Cards"
								       component={ Cards }/>
								<Route path="/components/forms" name="Forms"
								       component={ Forms }/>
								<Route path="/components/modals" name="Modals"
								       component={ Modals }/>
								<Route path="/components/social-buttons"
								       name="Social Buttons"
								       component={ SocialButtons }/>
								<Route path="/components/switches"
								       name="Switches"
								       component={ Switches }/>
								<Route path="/components/tables" name="Tables"
								       component={ Tables }/>
								<Route path="/components/tabs" name="Tabs"
								       component={ Tabs }/>
								<Route path="/icons/font-awesome"
								       name="Font Awesome"
								       component={ FontAwesome }/>
								<Route path="/icons/simple-line-icons"
								       name="Simple Line Icons"
								       component={ SimpleLineIcons }/>
								<Route path="/widgets" name="Widgets"
								       component={ Widgets }/>
								<Route path="/charts" name="Charts"
								       component={ Charts }/>

								<Route path="/projects" name="Projects"
								       component={ Projects }/>
								<Route path="/cityinfo" name="City Info"
								       component={ City }/>

								{ /* IMPORTANT below shows how to pass props in Route */ }

								<Route disable path="/chatroom" name="Chat Room"
									/*render={ () => < ChatRoom/> }
									 socket={ socket }*/
								/>

								<Route path="/chatroom-v2" name="Chat Room V2"
								       component={ ChatRoomV2 }
								/>

								{ /*<Route path="/chatrooms/:id" component={ ChatRoom }/>*/ }
								<Route path="/secretlinks" name="Secret Links"
								       component={ SecretLinks }/>

								<Route path="/about/myself" name="myself"
								       component={ Myself }
								/>
								<Route path="/test" name="Test"
								       render={ () => <Test roZ={ this.state.roZ }/> }
								/>
								<Redirect from="/" to="/dashboard"/>
							</Switch>
						</Container>
					</main>
					<Aside mode={ mode } mouseTrack={ mouseTrack } resetCamera={ this.resetCamera }/>
				</div>
				<Footer/>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {currentUserInfo : state.currentUserInfo, setting : state.setting};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCurrentUser, setMode, setMouseTrack}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (AppContainer);

// TODO intro that ppl could send me msg through app messager with my name, add feature that auto fullfill search name
// when type
