/**
 * ShownValue.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    removeValue: PropTypes.func,
    label: PropTypes.string
};

export default class ShownValue extends React.Component {
    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.removeValue}
                title="Click to remove filter."
                aria-label={`Applied filter: ${this.props.label}`}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" alt="Close icon" />
                </span> {this.props.label}
            </button>
        );
    }
}
ShownValue.propTypes = propTypes;
