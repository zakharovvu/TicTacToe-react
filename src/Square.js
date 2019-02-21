import React from 'react';

function Square(props) {
    return (
        <div className="Square" onClick={props.click}>{props.value}</div>
    )
}

export default Square