import {MutableRefObject, useEffect, useState} from "react";


const useCssRotation = (detectionRef: MutableRefObject<HTMLElement | null>, changeRef: MutableRefObject<HTMLElement | null>, multiplier: number) => {

    const [relaX, relaY] = useElemMouseDetection(detectionRef);

    useEffect(() => {
        if (changeRef.current === null || detectionRef.current === null)
        {
            return;
        }

        const rect = detectionRef.current.getBoundingClientRect();


        const elem = changeRef.current;

        const degreesY = Math.round(multiplier * ((relaX - rect.width / 2) / rect.width));
        const degreesX = Math.round(-multiplier * ((relaY - rect.height / 2) / rect.height));




        elem.style.setProperty('--yRot', degreesY.toString() + "deg" )
        elem.style.setProperty('--xRot', degreesX.toString() + "deg" )



    }, [relaX, relaY]);
}

const useElemMouseDetection = (ref: MutableRefObject<HTMLElement | null>) => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        const elem = ref.current;
        if (elem === null)
        {
            return;
        }

        const mouseEvent = (e: MouseEvent) => {
            const rect = elem.getBoundingClientRect();

            setX(e.clientX - rect.left);
             setY(e.clientY - rect.top);
        }

        elem.addEventListener('mousemove', mouseEvent);


        return () => {
            elem.removeEventListener('mousemove', mouseEvent)
        }
    }, [ref]);

    return [x, y];
}







export {
    useCssRotation,
    useElemMouseDetection
}
