import React from 'react';

import {localStorageGet} from "./localStorage";

export const getSiteId = () => {
    const siteInfo = localStorageGet("siteInfo")
    if(!siteInfo) {
        return -1
    }
    return siteInfo.id
};
