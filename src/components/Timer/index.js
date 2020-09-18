import React from 'react'

const Timer = (props) => {
    return (
        <div>
            {new Date(props.elapsedTimeInSeconds * 1000).toISOString().substr(11, 8)}
        </div>
    )
}

export default Timer
