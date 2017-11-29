import React  from 'react';
import PropTypes from 'prop-types';
import {
    Grid
} from 'react-bootstrap';

const Footer = props => {
    const { fluid, children, ...otherProps } = props;

    return (
        <footer { ...otherProps }>
            <Grid fluid={ props.fluid }>
                { children }
            </Grid>
        </footer>
    );
}

Footer.propTypes = {
    fluid: PropTypes.bool
};

export default Footer;
