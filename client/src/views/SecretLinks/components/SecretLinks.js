import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LinkCreateForm from './LinkCreatForm';
import LinksList from './LinksList';
import isUrl from 'is-url';
import urlRegex from 'url-regex';
import { TabContent,TabPane,Nav,NavItem,NavLink,Col, Row } from 'reactstrap';
import classnames from 'classnames';

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
	handleSubmit = (e, origionalUrl) => {
		e.preventDefault ();
		try {
			console.log (isUrl (origionalUrl));
			if (!urlRegex ({exact : true, strict : false}).test (origionalUrl)) {
				this.setState ({errorMessage : 'not an url, please try again'});
			} else {
				const inputData = {
					origionalUrl : origionalUrl,
					userId : this.props.currentUserInfo._id,
					//dateCreated: Date.now(),
					token : Math.random ().toString (36).slice (-5),
				};
				axios.post ('/api/secretLinks/generateLink', inputData)
				     .then (res => {
					     this.setState ({
						     publicList : [ res.data, ...this.state.publicList ],
						     privateList : [ res.data, ...this.state.privateList ],
					     });
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
			console.log ('didmount', res.data);
			this.setState ({publicList : res.data});
		});
		axios.get ('/api/secretLinks/privateLinksList').then ((res) => {
			console.log ('didmount', res.data);
			this.setState ({privateList : res.data});
		});


	};

	render () {
		return (
			<div>
				<LinkCreateForm handleSubmit={ this.handleSubmit } errorMessage={ this.state.errorMessage }/>

				<Nav tabs>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '1'}) }
						         onClick={ () => {this.toggle('1')}}
						>
							Public Links List
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '2'}) }
						         onClick={ () => {this.toggle('2')}}
						>
							Private Links List
						</NavLink>
					</NavItem>
				</Nav>

				<TabContent activeTab ={this.state.activeTab}>
					<TabPane tabId={'1'}>
						<Row>
							<Col>
								{ this.state.publicList ? <LinksList list={ this.state.publicList }/> : <div>loading</div> }
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId={'2'}>
						<Row>
							<Col>
								{ this.state.privateList ? <LinksList list={ this.state.privateList }/> : <div>loading</div> }
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
