import React, { Component } from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';

class LinksList extends Component {
	renderListItem = ({_id, origionalUrl, token, dateCreated, clickCounter, avatar, displayName}) => {
		const handleUrlClick = () => {
			origionalUrl += 1;
			clickCounter += 1;
		};
		return (
			<tr key={ _id }>
				<td><a target={ '_blank' }
				       href={ `http://${window.location.host}/l/${token}` }>{ `http://localhost:3000/l/${ token }` }</a>
				</td>
				<td onClick={ handleUrlClick }>{ origionalUrl }</td>
				<td>{ moment (dateCreated).format ('MM-DD hh:mm') }</td>
				<td>
					<div className={ 'avatar avatar-xs mr-1' }>
						<img className={ 'img-avatar' } src={ avatar } alt={ '' }/>
					</div>
					{ displayName }
				</td>
				<td>{ clickCounter }</td>
			</tr>
		);
	};

	render () {
		return (
			<Table responsive striped className={ 'text-white' }>
				<thead>
					<tr>
						<th>Generated Url</th>
						<th>Origional Url</th>
						<th>Created Date</th>
						<th>Author</th>
						<th>Clicks</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.list.map ((item) => this.renderListItem (item)) }
				</tbody>

			</Table>
		);
	}
}

export default LinksList;
