import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar as ReactBootstrapProgressBar } from 'react-bootstrap';

import bsStyleToColor from './../utils/bsStyleToColor';
import _ from 'underscore';
import { Colors } from 'consts';
const BS_STYLES = [
	'default',
	'link',
	'primary',
	'success',
	'warning',
	'danger',
	'info'
];
const ProgressBar = props => {
    const { bsStyle, customColor, style, children, ...otherProps } = props;

    const customStyle = bsStyle === 'custom' ? {
        ...style,
        backgroundColor: bsStyleToColor({ bsStyle, customColor })
    } : style;
	const isBsStyle = _.contains(BS_STYLES, bsStyle);
    return (
        <ReactBootstrapProgressBar
            { ...otherProps }
            style={ customStyle }
            bsStyle={ isBsStyle ? bsStyle : null }
        >
            { children }
        </ReactBootstrapProgressBar>
    );
}

ProgressBar.props = {
    bsStyle: PropTypes.string,
    customColor: PropTypes.string,
    style: PropTypes.object
};

ProgressBar.defaultProps = {
    bsStyle: null,
    customColor: Colors.brandPrimary,
    style: { }
};

export default ProgressBar;
