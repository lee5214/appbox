import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchCity } from 'actions';
import { Button, Col, Form, Input, InputGroup, InputGroupButton } from 'reactstrap';
import { fetchUserLocation } from 'utils';

class SearchBar extends Component {
	constructor (props) {
		super (props);
		this.state = {term : '', searchedTerm : [], duplicatedSearch : false};
	}

	onInputChange = (e) => {
		this.setState ({term : e.target.value.toLowerCase ()});
	};

	onSearchSubmit = (e) => {
		e.preventDefault ();
		//console.log (this.state);
		if (!this.state.searchedTerm.includes (this.state.term)) {
			//TODO warning implementation

			this.setState ({duplicatedSearch : false});
			this.props.fetchCity (this.state.term);
			this.setState ({term : '', searchedTerm : [ ...this.state.searchedTerm, this.state.term ]});
		} else {
			this.setState ({duplicatedSearch : true});
		}
	};

	componentDidMount () {

		//TODO implement this function later

		//console.log ('your current location=>', fetchUserLocation ());

		// test purpose
		this.setState ({term : '', searchedTerm : [ 'San Francisco' ]});
		this.props.fetchCity ('San Francisco');
		//this.props.fetchCityNews('Hayward');

	}

	warningToggle () {
		if (this.state.duplicatedSearch) {
			return <h1>Duplicated!!!!</h1>;
		}
	}

	render () {
		return (
			<div>
				{ /*{this.warningToggle()}*/ }
				<Form className={ 'input-group' } onSubmit={ (e) => {this.onSearchSubmit (e);} }>
					<Col md="12">
						<InputGroup>
							<Input type="text" id="input1-group2" name="input1-group2" placeholder={ 'city name' }
							       onChange={ (e) => this.onInputChange (e) }
							       value={ this.state.term }/>
							<InputGroupButton>
								<Button color={ 'primary' } type={ 'submit' }><i className="fa fa-search"></i>
									Search</Button>
							</InputGroupButton>
						</InputGroup>
					</Col>

				</Form>

				{ /*<form className={ 'input-group' } onSubmit={ (e) => {this.onSearchSubmit (e);} }>*/ }
				{ /*<input*/ }
				{ /*style={ {backgroundColor : '#353535', border : 0, color : 'white'} }*/ }
				{ /*placeholder={ '  city name' }*/ }
				{ /*onChange={ (e) => this.onInputChange (e) }*/ }
				{ /*value={ this.state.term }/>*/ }
				{ /*<span className={ 'input-group-btn' }>*/ }
				{ /*<Button bsStyle={ 'primary' } type={ 'submit' }>*/ }
				{ /*Search*/ }
				{ /*</Button>*/ }
				{ /*</span>*/ }
				{ /*<div>*/ }
				{ /*</div>*/ }
				{ /*</form>*/ }
			</div>
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
