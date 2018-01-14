import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LinkCreateForm from './LinkCreatForm';
import isUrl from 'is-url';

class SecretLinks extends Component {
	constructor (props) {
		super (props);
		this.state = {
			errorMessage : '',
			list : [],
		};
	}

	handleSubmit = (e, origionalUrl) => {
		e.preventDefault ();
		try {
			console.log (isUrl (origionalUrl));
			if (!isUrl (origionalUrl)) {
				this.setState({errorMessage:'not an url, please try again'}) ;
			} else {
				const inputData = {
					origionalUrl : origionalUrl,
					userId : this.props.currentUserInfo._id,
				};
				axios.post ('/api/secretLinks/generateLink', inputData)
				     .then (res => { this.setState ({list : [ res.data, ...this.state.list ]});})
				     .catch (error => {
					     this.setState ({errorMessage : `${error.response.data.error}`});
				     });
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
		console.log (this.state.list);
		return (
			<div>
				<h4>{ origionalUrl }</h4>
				<h4>{ userId }</h4>
			</div>
		);
	};

	render () {
		return (
			<div>
				<LinkCreateForm handleSubmit={ this.handleSubmit } errorMessage={ this.state.errorMessage }/>
				<div>{ this.state.list.map (item => {
					this.renderListItem (item);
				}) }
				</div>
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
