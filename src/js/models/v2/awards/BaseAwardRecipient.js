/**
 * BaseAwardRecipient.js
 * Created by Kevin Li 2/22/18
 */

import { getBusinessTypes } from 'helpers/businessTypesHelper';
import { formatMoney } from 'helpers/moneyFormatter';
import CoreLocation from 'models/v2/CoreLocation';

const parseBusinessCategories = (data) => (
    getBusinessTypes().reduce((parsed, type) => {
        if (data[type.fieldName]) {
            parsed.push(type.displayName);
        }
        return parsed;
    }, [])
);

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = {};
    if (data) {
        for (let i = 1; i < 6; i++) {
            const name = data[`officer_${i}_name`] || '';
            const amount = formatMoney(data[`officer_${i}_amount`]) || 0;
            if (name) {
                executiveCompensation[`officer${i}`] = `${name} - ${amount}`;
            }
            else {
                executiveCompensation[`officer${i}`] = '--';
            }
        }
    }
    else {
        for (let i = 1; i < 6; i++) {
            executiveCompensation[`officer${i}`] = '--';
        }
    }
    return executiveCompensation;
};

const BaseAwardRecipient = {
    populate(data) {
        this.internalId = data.legal_entity_id || '';
        this.name = data.recipient_name || 'Unknown';
        this.duns = data.recipient_unique_id || '--';
        this.parentDuns = data.parent_recipient_unique_id || '--';
        this._businessTypes = data.business_types_description || '';
        this._businessCategories = parseBusinessCategories(data);

        // Recipient Location
        let locationData = {};
        if (data.location) {
            locationData = {
                address1: data.location.address_line1,
                address2: data.location.address_line2,
                address3: data.location.address_line3,
                province: data.location.foreign_province,
                city: data.location.city_name,
                county: data.location.county_name,
                stateCode: data.location.state_code,
                zip5: data.location.zip5,
                zip4: data.location.zip4,
                foreignPostalCode: data.location.foreign_postal_code,
                country: data.location.country_name || '',
                countryCode: data.location.location_country_code || '',
                congressionalDistrict: data.location.congressional_code
            };
        }
        const location = Object.create(CoreLocation);
        location.populateCore(locationData);
        this.location = location;

        // Executive Compensation
        if (data.officers) {
            this.officers = parseExecutiveCompensation(data.officers);
        }
        else {
            // data.officers is undefined
            this.officers = parseExecutiveCompensation(null);
        }
    },
    get businessTypes() {
        if (this._businessTypes) {
            return [this._businessTypes];
        }
        else if (this._businessCategories.length > 0) {
            return this._businessCategories;
        }
        return [];
    }
};

export default BaseAwardRecipient;
