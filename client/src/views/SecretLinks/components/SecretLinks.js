import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LinkCreateForm from './LinkCreatForm';
import LinksList from './LinksList';
//import urlRegex from 'url-regex';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import {urlPrefix} from 'utils/'
class SecretLinks extends Component {
	constructor (props) {
		super (props);
		this.state = {
			activeTab : '1',
			errorMessage : '',
			publicList : null,
			privateList : null,
		};
	}

	// onLinkClick = () =>{
	//
	// }
	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState ({
				activeTab : tab,
			});
		}
	};
	handleSubmit = (e, origionalUrl, goPublic) => {
		e.preventDefault ();
		try {
			if (true){//(!urlRegex ({exact : true, strict : false}).test (origionalUrl)) {
				this.setState ({errorMessage : 'not an url, please try again'});
			} else {
				origionalUrl = urlPrefix(origionalUrl)
				const inputData = {
					origionalUrl : origionalUrl,
					userId : this.props.currentUserInfo._id,
					goPublic : goPublic,
					token : Math.random ().toString (36).slice (-5),
				};
				axios.post ('/api/secretLinks/generateLink', inputData)
				     .then (res => {
					     if (res.data.goPublic) {
						     this.setState ({
							     publicList : [ res.data, ...this.state.publicList ],
							     privateList : [ res.data, ...this.state.privateList ],
						     });
					     } else {
						     this.setState ({
							     privateList : [ res.data, ...this.state.privateList ],
						     });
					     }

				     })
				     .catch (error => {
					     this.setState ({errorMessage : `${error.response.data.error}`});
				     });
				this.setState ({errorMessage : ''});
			}
		}
		catch (err) {
			console.log (err);
		}


		// const origionalUrl = e.target.value()
		// axios.post ('/api/secretLinks/generateLink', {
		// 	"origionalUrl" : origionalUrl,
		// 	"userId" : `${this.props.currentUserInfo._id}`
		// }).then (res => {console.log ('res', res);}).catch (error => {
		// 	this.setState ({errorMessage : error.response.data.error});
		// });
	};

	renderListItem = ({origionalUrl, userId}) => {
		console.log (origionalUrl);
		return (
			<div>
				<h4>{ origionalUrl }</h4>
				<h4>{ userId }</h4>
			</div>
		);
	};

	componentDidMount = () => {
		axios.get ('/api/secretLinks/publicLinksList').then ((res) => {
			this.setState ({publicList : res.data});
		});
	};

	render () {
		return (
			<div>
				<Row>
					<Col xs={12} md={{size:6, offset:3}} >
						<LinkCreateForm handleSubmit={ this.handleSubmit } errorMessage={ this.state.errorMessage }/>
					</Col>
				</Row>
				<Nav tabs className={ 'mb-2' }>
					<NavItem className={ 'mr-2' }>
						<NavLink className={ classnames ({active : this.state.activeTab === '1'}) }
						         onClick={ () => {this.toggle ('1');} }
						>
							Public Links List
						</NavLink>
					</NavItem>
					<NavItem className={ 'mr-2' }>
						<NavLink className={ classnames ({active : this.state.activeTab === '2'}) }
						         onClick={ () => {this.toggle ('2');} }
						>
							Private Links List
						</NavLink>
					</NavItem>
				</Nav>

				<TabContent activeTab={ this.state.activeTab }>
					<TabPane tabId={ '1' }>
						<Row>
							<Col>
								{ this.state.publicList ? <LinksList list={ this.state.publicList }/> :
									<div>loading</div> }
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId={ '2' }>
						<Row>
							<Col>
								{ this.state.privateList ? <LinksList list={ this.state.privateList }/> :
									<div>loading</div> }
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentUserInfo : state.currentUserInfo,
	};
};

export default connect (mapStateToProps) (SecretLinks);
