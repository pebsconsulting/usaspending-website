/**
  * TopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

import TopFilterItem from './TopFilterItem';

const propTypes = {
    name: React.PropTypes.string,
    data: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

const defaultProps = {
    name: 'Name'
};

export default class TopFilterGroup extends React.Component {
    render() {
        const items = [];
        this.props.data.values.forEach((value) => {
            const item = (<TopFilterItem
                key={`top-item-${this.props.data.code}-${value}`}
                code={this.props.data.code}
                title={this.props.data.labels[items.length]}
                value={value}
                removeFilter={this.props.removeFilter} />);

            items.push(item);
        });

        return (
            <div className="filter-group-container">
                <div className="filter-group">
                    <div className="filter-name">
                        {this.props.name}:
                    </div>
                    <div className="filter-values">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

TopFilterGroup.propTypes = propTypes;
TopFilterGroup.defaultProps = defaultProps;