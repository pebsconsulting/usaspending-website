/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const defaultProps = {
    awardTypeMapping: [
        {
            id: 'award-contracts',
            name: 'Contracts',
            filters: awardTypeGroups.contracts
        },
        {
            id: 'award-grants',
            name: 'Grants',
            filters: awardTypeGroups.grants
        },
        {
            id: 'award-direct-payments',
            name: 'Direct Payments',
            filters: awardTypeGroups.direct_payments
        },
        {
            id: 'award-loans',
            name: 'Loans',
            filters: awardTypeGroups.loans
        },
        {
            id: 'award-insurance',
            name: 'Insurance',
            filters: [],
            value: awardTypeGroups.insurance[0]
        }
    ]
};

const propTypes = {
    awardTypeMapping: React.PropTypes.arrayOf(React.PropTypes.object),
    awardType: React.PropTypes.object,
    bulkAwardTypeChange: React.PropTypes.func
};

export default class AwardType extends React.Component {

    render() {
        const awardTypes = (
            this.props.awardTypeMapping.map((type, index) =>
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={awardTypeCodes}
                    filterType="Award"
                    selectedCheckboxes={this.props.awardType}
                    bulkTypeChange={this.props.bulkAwardTypeChange}
                    enableAnalytics />
    ));

        return (
            <div className="award-type-filter search-filter">
                <ul className="award-types">
                    {awardTypes}
                </ul>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
