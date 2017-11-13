import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchCity } from '../../../actions';

class SearchBar extends Component {
	constructor (props) {
		super (props);
		this.state = {term : '', searchedTerm : []};
	}

	onInputChange = (e) => {
		this.setState ({term : e.target.value});
	};

	onSearchSubmit = (e) => {
		e.preventDefault ();
		console.log(this.state)
		if (!this.state.searchedTerm.includes(this.state.term)) {
			console.log('you already searched this term')
			this.props.fetchCity (this.state.term);
			this.setState ({term : '', searchedTerm : [...this.state.searchedTerm, this.state.term]});
		}
	};

	componentDidMount () {
		// test purpose
		this.props.fetchCity ('Hayward');
	}

	render () {
		return (
			<form className={ 'input-group' } onSubmit={ (e) => {this.onSearchSubmit (e);} }>
				<input
					placeholder={ 'input your target city' }
					onChange={ (e) => this.onInputChange (e) }
					value={ this.state.term }/>
				<span className={ 'input-group-btn' }>
					<Button
						outline
						color={ 'primary' }
						type={ 'submit' }>
						Search
					</Button>
				</span>
				<div>
					{ this.state.term }
				</div>
			</form>
		);
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCity}, dispatch);
}

SearchBar.propType = {
	fetchCity : PropTypes.object.isRequired,
};

export default connect (null, mapDispatchToProps) (SearchBar);
