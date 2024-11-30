import {useEffect, useState} from "react";
import {drawTable, handleMouseDown, handleMouseMove, handleMouseUp, initBoard} from "./controller.js";

const Board = () => {
    const [listCell, setListCell] = useState([])

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
        drawTable(listCell)

        canvas.addEventListener("mousemove", (e) => {
            e.preventDefault()
            handleMouseMove({
                ctx,
                canvas: canvas,
                evt: e,
                listCell: listCell
            })
        })
        
        canvas.addEventListener("mouseup", (e) => {
            e.preventDefault()
            const location = handleMouseUp({
                canvas: canvas,
                evt: e
            })
            if (location) {
                handleClickSquare(location)
            }
        })
        
        canvas.addEventListener("mousedown", (e) => {
            e.preventDefault()
            handleMouseDown({
                canvas: canvas,
                evt: e
            })
        })

        return () => {
            canvas.removeEventListener("mousemove", () => {})
            canvas.removeEventListener("mouseup", () => {})
            canvas.removeEventListener("mousedown", () => {})
        }
    }, []);

    useEffect(() => {
    }, [listCell]);

    const handleClickSquare = (location) => {
        const side = 0
        listCell.push({x: location.x, y: location.y, side: side})
        setListCell([...listCell])
        console.log(listCell)
        drawTable(listCell)
    }

    return (
        <div className={'w-full h-full'} id={'containerBoard'}>
            <canvas id={'mainBoard'} className={'w-full h-full'}></canvas>
        </div>
    )
}

export default Board