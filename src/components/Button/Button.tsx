import React, {FunctionComponent, MouseEventHandler} from "react";
import styles from './Button.module.css'

const Button: FunctionComponent<{className?: string, onClick?: MouseEventHandler<HTMLDivElement>}> = (props) => {
    return (
        <div className={`${styles.btn} ${props.className}`} onClick={props.onClick}>{props.children}</div>
    )
}



export {
    Button
}
