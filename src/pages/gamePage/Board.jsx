import {useEffect, useState} from "react";
import {drawTable, handleMouseDown, handleMouseMove, handleMouseUp, initBoard} from "./controller.js";

const Board = (props) => {
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
        initBoard(ctx, canvas, containerHeight, containerWidth)
        drawTable(props.listCell)

        // canvas.addEventListener("mousemove", onMouseMove)
        
        // canvas.addEventListener("mouseup", (e) => {
        //     e.preventDefault()
        //     const location = handleMouseUp({
        //         canvas: canvas,
        //         evt: e
        //     })
        //     if (location) {
        //         handleClickSquare(location)
        //     }
        // })
        
        // canvas.addEventListener("mousedown", (e) => {
        //     e.preventDefault()
        //     handleMouseDown({
        //         canvas: canvas,
        //         evt: e
        //     })
        // })

        return () => {
            // canvas.removeEventListener("mousemove", () => {})
            // canvas.removeEventListener("mouseup", () => {})
            // canvas.removeEventListener("mousedown", () => {})
        }
    }, []);

    // const onMouseMove = (e) => {
    //     e.preventDefault()
    //     handleMouseMove({
    //         evt: e,
    //         listCell: props.listCell
    //     })
    // }

    useEffect(() => {
        drawTable(props.listCell)
    }, [props.listCell]);

    const handleClickSquare = (location) => {
        props.onAddCell({x: location.x, y: location.y, side: props.side})
    }

    return (
        <div className={'w-full h-full'} id={'containerBoard'}>
            <canvas
                id={'mainBoard'}
                className={'w-full h-full'}
                onMouseUp={(e) => {
                    e.preventDefault()
                    const location = handleMouseUp({
                        evt: e
                    })
                    if (location) {
                        handleClickSquare(location)
                    }
                }}
                onMouseDown={(e) => {
                    e.preventDefault()
                    handleMouseDown({
                        evt: e
                    })
                }}
                onMouseMove={(e) => {
                    e.preventDefault()
                    handleMouseMove({
                        evt: e,
                        listCell: props.listCell
                    })
                }}
            ></canvas>
        </div>
    )
}

export default Board