import React from 'react'
import { Spinner } from 'reactstrap'

function Loading() {
    return (
        <div>
            <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} type="grow"/>
        </div>
    )
}

export default Loading;