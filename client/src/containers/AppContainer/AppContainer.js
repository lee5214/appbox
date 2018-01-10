import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGuestUser, fetchCurrentUser } from 'actions';
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
// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import style from './AppContainer.scss';

class Full extends Component {
	componentDidMount () {
		this.props.fetchCurrentUser ();
	}


	render () {
		return (
			<div className="app">
				<Header currentUserInfo={ this.props.currentUserInfo }/>
				<div className="app-body">
					<Sidebar { ...this.props }/>
					<main className="main">
						<video id="bgvid" autoPlay muted loop>
							<source src={process.env.PUBLIC_URL + '/img/sc-bg-video.mp4'} type="video/mp4"/>
						</video>
						<div className={ style.breadcrumb_wrapper }>
							<BannerLine/>
							<Container>
								<Breadcrumb/>
							</Container>
						</div>
						<Container className={ style.container_content }>
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
								<Route path="/test" name="Test"
								/>
								<Route path="/chatroom" name="Chat Room"
								       component={ ChatRoom }/>

								<Route path="/chatrooms/:id" component={ ChatRoom }/>
								<Route path="/secretlinks" name="Secret Links"
								       component={ SecretLinks }/>
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

export default connect (mapStateToProps, mapDispatchToProps) (Full);

// TODO intro that ppl could send me msg through app messager with my name, add feature that auto fullfill search name
// when type
