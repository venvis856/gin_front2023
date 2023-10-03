import React from 'react'

function PageNotFound() {
    const {REACT_APP_ENV}= process?.env || {}
    console.log(REACT_APP_ENV,33333)
    return (
        <div>
            <h1>404</h1>
        </div>
    )
}

export default PageNotFound;
