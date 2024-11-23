import {useEffect} from "react";
import {drawTable, handleMouseDown, handleMouseMove, handleMouseUp, initBoard} from "./controller.js";

const Board = () => {

    useEffect(() => {
        const containerBoard = document.getElementById('containerBoard');
        const canvas = document.getElementById("mainBoard");

        const containerHeight = containerBoard.clientHeight;
        const containerWidth = containerBoard.clientWidth;

        canvas.width = containerWidth;
        canvas.height = containerHeight;

        const ctx = canvas.getContext("2d");

        // requestAnimationFrame((time) => {
        //     console.log(time)
        //
        // })
        initBoard(ctx, containerHeight, containerWidth)
        drawTable()

        canvas.addEventListener("mousemove", (e) => {
            e.preventDefault()
            handleMouseMove({
                ctx,
                canvas: canvas,
                evt: e
            })
        })
        
        canvas.addEventListener("mouseup", (e) => {
            e.preventDefault()
            handleMouseUp({
                canvas: canvas,
                evt: e
            })
        })
        
        canvas.addEventListener("mousedown", (e) => {
            e.preventDefault()
            handleMouseDown({
                canvas: canvas,
                evt: e
            })
        })

        return () => {
            canvas.removeEventListener("mousemove", (e) => {})
            canvas.removeEventListener("mouseup", (e) => {})
            canvas.removeEventListener("mousedown", (e) => {})
        }
    }, []);

    return (
        <div className={'w-full h-full'} id={'containerBoard'}>
            <canvas id={'mainBoard'} className={'w-full h-full'}></canvas>
        </div>
    )
}

export default Board