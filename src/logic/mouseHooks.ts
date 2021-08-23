import {MutableRefObject, useEffect} from "react";


const useCssRotation = (detectionRef: MutableRefObject<HTMLElement | null>, changeRef: MutableRefObject<HTMLElement | null>, multiplier: number) => {




    useEffect(() => {

        const detectionElem = detectionRef.current as HTMLElement;
        const changeElem = changeRef.current as HTMLElement
        if (detectionElem == null || changeElem == null)
        {
            return;
        }


        const mouseMoveEvent = (e: MouseEvent) => {
            const rect = detectionElem.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;


            const degreesY = multiplier * ((x - rect.width / 2) / rect.width)
            const degreesX = -multiplier * ((y - rect.height / 2) / rect.height)

            changeElem.style.setProperty('--yRot', degreesY.toString() + "deg" )
            changeElem.style.setProperty('--xRot', degreesX.toString() + "deg" )
        }

        const mouseLeaveEvent = (e: MouseEvent) => {
            changeElem.style.removeProperty('--yRot')
            changeElem.style.removeProperty('--xRot')
        }


        detectionElem.addEventListener('mousemove', mouseMoveEvent);
        detectionElem.addEventListener('mouseleave', mouseLeaveEvent);
        return () => {
            detectionElem?.removeEventListener('mousemove', mouseMoveEvent)
            detectionElem?.addEventListener('mouseleave', mouseLeaveEvent);
        }
    }, [multiplier, detectionRef, changeRef])
}

export {
    useCssRotation
}
