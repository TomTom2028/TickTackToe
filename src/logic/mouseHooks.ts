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


            const degreesY = Math.round(multiplier * ((x - rect.width / 2) / rect.width));
            const degreesX = Math.round(-multiplier * ((y - rect.height / 2) / rect.height));

            changeElem.style.setProperty('--yRot', degreesY.toString() + "deg" )
            changeElem.style.setProperty('--xRot', degreesX.toString() + "deg" )
        }


        detectionElem.addEventListener('mousemove', mouseMoveEvent);
        return () => {
            detectionElem?.removeEventListener('mousemove', mouseMoveEvent)
        }
    }, [multiplier, detectionRef, changeRef])
}



export {
    useCssRotation,
}
