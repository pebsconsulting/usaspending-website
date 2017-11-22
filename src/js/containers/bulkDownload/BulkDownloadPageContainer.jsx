/**
 * BulkDownloadPageContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import BulkDownloadPage from 'components/bulkDownload/BulkDownloadPage';

require('pages/bulkDownload/bulkDownloadPage.scss');

const propTypes = {
    bulkDownload: PropTypes.object,
    setDataType: PropTypes.func,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func
};

export class BulkDownloadPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.request = null;

        this.startAwardDownload = this.startAwardDownload.bind(this);
    }

    startAwardDownload() {
        const formState = this.props.bulkDownload.awards;

        // Create the Award Levels array from the Redux state
        const awardLevels = [];
        for (let i = 0; i < awardDownloadOptions.awardLevels.length; i++) {
            if (formState.awardLevels[awardDownloadOptions.awardLevels[i].name]) {
                awardLevels.push(awardDownloadOptions.awardLevels[i].apiName);
            }
        }

        // Create the Award Types array from the Redux state
        const awardTypes = [];
        for (let j = 0; j < awardDownloadOptions.awardTypes.length; j++) {
            if (formState.awardTypes[awardDownloadOptions.awardTypes[j].name]) {
                awardTypes.push(awardDownloadOptions.awardTypes[j].apiName);
            }
        }

        // Convert undefined to the empty string for open-ended dates
        let startDate = '';
        if (formState.dateRange.startDate) {
            startDate = formState.dateRange.startDate;
        }
        let endDate = '';
        if (formState.dateRange.endDate) {
            endDate = formState.dateRange.endDate;
        }

        const params = {
            award_levels: awardLevels,
            filters: {
                award_types: awardTypes,
                agency: formState.agency.id,
                sub_agency: formState.subAgency.id,
                date_type: formState.dateType,
                date_range: {
                    start_date: startDate,
                    end_date: endDate
                }
            },
            columns: [],
            file_format: formState.fileFormat
        };

        this.requestDownload(params, 'awards');
    }

    requestDownload(params, type) {
        if (this.request) {
            this.request.cancel();
        }

        this.request = BulkDownloadHelper.requestBulkDownload(params, type);

        this.request.promise
            .then((res) => {
                this.props.setDownloadExpectedUrl(res.data.url);
                this.props.setDownloadExpectedFile(res.data.file_name);
                this.props.setDownloadPending(true);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // something went wrong
                    console.log(err);

                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    else {
                        console.log(err.message);
                    }
                }
            });
    }

    render() {
        return (
            <BulkDownloadPage
                bulkDownload={this.props.bulkDownload}
                setDataType={this.props.setDataType}
                dataType={this.props.bulkDownload.dataType}
                startDownload={this.startAwardDownload} />
        );
    }
}

BulkDownloadPageContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(BulkDownloadPageContainer);
