/**
  * AwardTypeContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AwardType from 'components/search/filters/awardType/AwardType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    toggleAwardType: React.PropTypes.func,
    bulkAwardTypeChange: React.PropTypes.func
};

class AwardTypeContainer extends React.Component {

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleAwardType = this.toggleAwardType.bind(this);
        this.bulkAwardTypeChange = this.bulkAwardTypeChange.bind(this);
    }

    toggleAwardType(selection) {
        this.props.toggleAwardType(selection);
    }

    bulkAwardTypeChange(selection) {
        this.props.bulkAwardTypeChange(selection);
    }

    render() {
        return (
            <AwardType
                {...this.props}
                toggleCheckboxType={this.toggleAwardType} />
        );
    }
}

AwardTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters.awardType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainer);
