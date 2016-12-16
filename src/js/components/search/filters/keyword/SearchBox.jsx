/**
 * SearchBox.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

export default class SearchBox extends React.Component {

    render() {
        return (
            <div className="keyword-filter search-filter">
                <div>
                    <input
                        id="search"
                        type="text"
                        className="keyword-input"
                        placeholder="eg: Education" />
                </div>
            </div>
        );
    }
}