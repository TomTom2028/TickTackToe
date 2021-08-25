import React, {FunctionComponent, MouseEventHandler, useEffect, useState} from "react";
import styles from './Button.module.css'

const Button: FunctionComponent<{className?: string, onClick: MouseEventHandler<HTMLDivElement>, enabled?: boolean, enabledStyle: string, disabledStyle: string}> = (props) => {

    const [disabledStyle, setDisabledStyle] = useState(styles.disabled);

    const [animationStyle, setAnimationStyle] = useState("");


    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (props.enabled)
        {
            setAnimationStyle("");
            // timeout needed to make sure that browser render happens before styles are re applied
            setTimeout(() => {
                setAnimationStyle(styles.anim);
            });

            props.onClick(e);
        }
    }


    useEffect(() => {
        if (props.enabled !== undefined)
        {
            setDisabledStyle(props.enabled ? props.enabledStyle : props.disabledStyle);

        }
    }, [props.enabled])

    return (
        <div className={animationStyle}>
            <div className={`${styles.btn} ${props.className} ${disabledStyle}`} onClick={clickHandler}>{props.children}</div>
        </div>

    )
}



export {
    Button
}
