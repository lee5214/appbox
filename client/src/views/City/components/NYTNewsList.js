import React, { Component } from 'react';
import NewsModal from './NewsModal';
import { CardDeck } from 'components';
import classes from './City.scss';

class NYTNewsList extends Component {

	renderNewsList () {
		if (this.props.newsList) {
			return this.props.newsList.map ((news) =>
				<NewsModal key={ news._id } news={ news }/>,
			);
		}
		return <div>Loading</div>;
	}

	render () {
		console.log (this.props.newsList);
		return (
			<div>
				<h1 className={ 'text-center font-weight-bold mb-4 mt-4' }> City News </h1>
				<CardDeck>{ this.renderNewsList () }</CardDeck>
			</div>
		);
	}
}

export default NYTNewsList;
