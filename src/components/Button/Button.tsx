import React, {FunctionComponent, MouseEventHandler, useEffect, useRef, useState} from "react";
import styles from './Button.module.css'

const Button: FunctionComponent<{className?: string, onClick: MouseEventHandler<HTMLDivElement>, enabled?: boolean, enabledStyle: string, disabledStyle: string}> = (props) => {

    const [disabledStyle, setDisabledStyle] = useState(styles.disabled);


    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (props.enabled)
        {
            props.onClick(e);
        }
    }


    useEffect(() => {
        if (props.enabled !== undefined)
        {
            setDisabledStyle(props.enabled ? `${props.enabledStyle} ${styles.enabled}` : props.disabledStyle);

        }
    }, [props.enabled])



    return (
        <div className={`${styles.btn} ${props.className} ${disabledStyle}`} onClick={clickHandler}>{props.children}</div>

    )
}



export {
    Button
}
