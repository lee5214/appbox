import React, { Component } from 'react';
//import classNames from 'classnames';
import {Row} from 'reactstrap'
//import classes from './Divider.scss';

class Divider extends Component {
	// static propTypes = {
	// 	textPosition: PropTypes.string,
	// 	children: PropTypes.oneOfType([
	// 		PropTypes.string,
	// 		PropTypes.node
	// 	]),
	// 	componentClass: PropTypes.string,
	// };

	static defaultProps = {
		textPosition: 'left',
		componentClass: 'h6'
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			customBackgroundColor: ''
		};
	}

	componentDidMount() {
		// Determine if there is a modal under the component which has a
		// different background Color
		// (Note: For performance concerns we are only searching for modals,
		// as finding the closest backgroundColor with getComputedStyle would generate
		// great overhead)
		const findModalUnderneath = element => {
			if(element && element.parentElement
				&& element.parentElement.tagName !== 'BODY') {
				return element.parentElement.classList.contains('modal-content') ?
					element.parentElement : findModalUnderneath(element.parentElement);
			}
			return null;
		};

		const modal = findModalUnderneath(this.refs.divider);

		if(modal) {
			const computedStyle = window.getComputedStyle(modal);
			const modalBackgroundColor = computedStyle.getPropertyValue('background-color');

			this.setState({
				customBackgroundColor: modalBackgroundColor
			});
		}
	}

	render() {
		const {
			textPosition,
			className,
			componentClass: ComponentClass,
			children,
			...otherProps
		} = this.props;


		return (
			<Row className={ 'hr-text-left hr-text divider mt-2 mb-2' }>
				{children}
			</Row>
		)
	}
}

export default Divider;
