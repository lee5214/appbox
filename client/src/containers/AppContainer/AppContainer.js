import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, NavbarToggler } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGuestUser, fetchCurrentUser } from 'actions';
import {CSSTransitionGroup} from 'react-transition-group'
// Components
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
import City from '../../views/City/';
import ChatRoom from '../../views/ChatRoom';
import SecretLinks from '../../views/SecretLinks';
import BannerLine from 'components/_Composite/BannerLine';
import Test from '../../views/Test/Test';
// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import style from './AppContainer.scss';


class AppContainer extends Component {
	// TODO theme3D -- done
	constructor (props) {
		super (props);
		this.state = {
			mode3d : false,
			roX : 0,
			roY : 0,
			videoURL : 'http://techslides.com/demos/sample-videos/small.mp4',
			test:false,
		};
		this.minimalInnerlWidth = 1200;
	}

	componentDidMount = () => {
		this.props.fetchCurrentUser ();
		window.addEventListener ('resize', this.handleResize);
		console.log ('host =>', window.location.host);
		console.log ('3d mode activation =>', this.state.mode3d);
		console.log ('app position =>', this.appbodyRef.getBoundingClientRect ());
	};

	onMouseMove = (e) => {
		let mX = e.clientX, mY = e.clientY;
		let maxRotateX = 10;
		let maxRotateY = 10;
		let view_option = 3;
		let {left, right, top, bottom, height, width} = this.appbodyRef.getBoundingClientRect ();
		let centerX = width / 2,
			centerY = height / 2,
			curRelPosX = mX - left,
			curRelPosY = mY - top,
			percentX = (curRelPosX - centerX) / centerX,
			percentY = (curRelPosY - centerY) / centerY;
		let roX = -percentY * maxRotateX, roY = percentX * maxRotateY;
		if (roX !== this.state.roX || roY !== this.state.roY) {
			this.setState ({roX, roY});
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
	// trigger 3d mode
	toggle3d = (e) => {
		e.preventDefault ();
		if (window.innerWidth >= this.minimalInnerlWidth) {
			document.body.classList.toggle ('mode-3d');
			this.setState ({mode3d : !this.state.mode3d});
			console.log ('3d mode activation =>', !this.state.mode3d);
		} else {
			console.log ('3d mode =>', 'disable');
		}
	};
	handleResize = () => {
		if (window.innerWidth < this.minimalInnerlWidth) {
			document.body.classList.remove ('mode-3d');
			this.setState ({mode3d : false});
			console.log (`resize detected, inner width breakpoint: --${this.minimalInnerlWidth}px--, 3d mode disable`);
		}
	};

	test = () => {
		console.log(this.state.test)
		this.setState({test: !this.state.test})
	}
	render () {
		const app3d = {
			transform : 'rotateX(' + this.state.roX + 'deg) rotateY(' + this.state.roY + 'deg)',
		};
		return (
			<div className="app" onMouseMove={ this.state.mode3d ? this.onMouseMove : null }
			     ref={ appbodyRef => {this.appbodyRef = appbodyRef;} }
			     style={ this.state.mode3d ? app3d : null }>

				<Header currentUserInfo={ this.props.currentUserInfo || null }
				        toggle3d={ this.toggle3d }
				/>
				<div className="app-body">
					<Sidebar { ...this.props }/>
					<main className="main animated">
						{/*<video id="background-video" loop autoPlay muted*/}
						       {/*style={{minHeight:'100%',minWidth:'100%',position:'fixed'}}*/}
						{/*>*/}
							{/*<source src={ this.state.videoURL } type="video/mp4"/>*/}
							{/*<source src={ this.state.videoURL } type="video/ogg"/>*/}
							{/*Your browser does not support the video tag.*/}
						{/*</video>*/}

						<div className={ style.breadcrumb_wrapper }>
							<BannerLine/>
							<Container>
								<Breadcrumb/>
							</Container>
							<button onClick = {this.test}>test</button>
							<CSSTransitionGroup
								transitionName="example"
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionEnter={false}
								transitionLeave={false}>
								<h1 key={'test'} style={{opacity:this.state.test?0:1}}>Fading at Initial Mount</h1>
							</CSSTransitionGroup>
						</div>

						<NavbarToggler className="d-md-down-none position-absolute sidebar-btn"
						               onClick={ this.sidebarToggle }>
							<i className={ 'fa fa-arrow-left fa-2x text-white' }/>
							{ /*<span className="navbar-toggler-icon"/>*/ }
						</NavbarToggler>
						<NavbarToggler className="d-md-down-none position-absolute aside-btn"
						               onClick={ this.asideToggle }>
							<i className={ 'fa fa-arrow-right fa-2x text-white' }/>
							{ /*<span className="navbar-toggler-icon"/>*/ }
						</NavbarToggler>

						<Container className={ style.block }>
							<Switch>
								<Route path="/dashboard" name="Dashboard"
								       component={ Dashboard }/>
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

								<Route path="/chatroom" name="Chat Room"
								       component={ ChatRoom }/>

								<Route path="/chatrooms/:id" component={ ChatRoom }/>
								<Route path="/secretlinks" name="Secret Links"
								       component={ SecretLinks }/>

								<Route path="/test" name="Test"
								       component={ Test }
								/>
								<Redirect from="/" to="/dashboard"/>
							</Switch>
						</Container>
					</main>
					<Aside/>
				</div>
				<Footer/>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {currentUserInfo : state.currentUserInfo};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCurrentUser}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (AppContainer);

// TODO intro that ppl could send me msg through app messager with my name, add feature that auto fullfill search name
// when type
