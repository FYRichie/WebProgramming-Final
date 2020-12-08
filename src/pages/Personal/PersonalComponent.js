import React from 'react';

export default (settings) => {
    console.log(settings);
    console.log("testing");
    if (!settings) return (
        <h1>
            Wrong URL!
        </h1>
    );
    else {
        return (
            <h1>
                testing
            </h1>
        );
    }
};