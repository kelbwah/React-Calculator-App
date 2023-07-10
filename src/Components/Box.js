import React from "react"

export default function Box(props){
    const styles = {
        backgroundColor: props.color
    }

    return (
        <div
            style={styles}
            className="box"
            onClick={props.handleClick}
        >
            <p style={styles}> {props.id}</p>
        </div>
    )

}