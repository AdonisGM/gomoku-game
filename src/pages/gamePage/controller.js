// Global
let HEIGHT, WIDTH
let CTX
let CANVAS
let MAX_SIZE
let GAP_LINE
let PAN_DIRECTION = {
    isMouseDown: false,
    beginX: 0,
    beginY: 0,
    moveX: 0,
    moveY: 0,
}
let offsetX = 0, offsetY = 0;
let listCell = []

export const initBoard = (ctx, canvas, height, width) => {
    CTX = ctx
    CANVAS = canvas

    HEIGHT = height
    WIDTH = width

    MAX_SIZE = 20
    GAP_LINE = 40

    listCell = []
}

export const drawTable = (cells) => {
    listCell = cells

    CTX.clearRect(0, 0, WIDTH, HEIGHT)

    const BEGIN_X_TABLE = (MAX_SIZE / 2) * GAP_LINE * (-1) + WIDTH / 2 + offsetX
    const END_X_TABLE = (MAX_SIZE / 2) * GAP_LINE + WIDTH / 2 + offsetX

    const BEGIN_Y_TABLE = (MAX_SIZE / 2) * GAP_LINE * (-1) + HEIGHT / 2 + offsetY
    const END_Y_TABLE = (MAX_SIZE / 2) * GAP_LINE + HEIGHT / 2 + offsetY

    // Render x center line
    CTX.beginPath()
    CTX.strokeStyle = '#b1b1b1'
    CTX.moveTo(BEGIN_X_TABLE, HEIGHT / 2 + offsetY)
    CTX.lineTo(END_X_TABLE, HEIGHT / 2 + offsetY)
    CTX.lineWidth = 1
    CTX.stroke()

    // Render y center line
    CTX.beginPath()
    CTX.strokeStyle = '#b1b1b1'
    CTX.moveTo(WIDTH / 2 + offsetX, BEGIN_Y_TABLE)
    CTX.lineTo(WIDTH / 2 + offsetX, END_Y_TABLE)
    CTX.lineWidth = 1
    CTX.stroke()

    // Render bottom side
    for (let i = 1; i <= MAX_SIZE / 2; i++) {
        CTX.beginPath()
        CTX.strokeStyle = '#d5d5d5'
        CTX.moveTo(BEGIN_X_TABLE, HEIGHT / 2 + GAP_LINE * i + offsetY)
        CTX.lineTo(END_X_TABLE, HEIGHT / 2 + GAP_LINE * i + offsetY)
        CTX.lineWidth = 1
        CTX.stroke()
    }

    // Render top side
    for (let i = 1; i <= MAX_SIZE / 2; i++) {
        CTX.beginPath()
        CTX.strokeStyle = '#d5d5d5'
        CTX.moveTo(BEGIN_X_TABLE, HEIGHT / 2 - GAP_LINE * i + offsetY)
        CTX.lineTo(END_X_TABLE, HEIGHT / 2 - GAP_LINE * i + offsetY)
        CTX.lineWidth = 1
        CTX.stroke()
    }

    // Render left side
    for (let i = 1; i <= MAX_SIZE / 2; i++) {
        CTX.beginPath()
        CTX.strokeStyle = '#d5d5d5'
        CTX.moveTo(WIDTH / 2 - GAP_LINE * i + offsetX, BEGIN_Y_TABLE)
        CTX.lineTo(WIDTH / 2 - GAP_LINE * i + offsetX, END_Y_TABLE)
        CTX.lineWidth = 1
        CTX.stroke()
    }

    // Render right side
    for (let i = 1; i <= MAX_SIZE / 2; i++) {
        CTX.beginPath()
        CTX.strokeStyle = '#d5d5d5'
        CTX.moveTo(WIDTH / 2 + GAP_LINE * i + offsetX, BEGIN_Y_TABLE)
        CTX.lineTo(WIDTH / 2 + GAP_LINE * i + offsetX, END_Y_TABLE)
        CTX.lineWidth = 1
        CTX.stroke()
    }

    listCell.forEach(({x, y, side}, index) => {
        const isLastMove = index === listCell.length - 1
        renderCell(x, y, side, offsetX, offsetY, isLastMove)
    })
}

export const handleMouseMove = ({evt}) => {
    const rect = CANVAS.getBoundingClientRect()

    if (!PAN_DIRECTION.isMouseDown) {
        return
    }

    offsetX = evt.clientX - rect.left - PAN_DIRECTION.beginX + PAN_DIRECTION.moveX;
    offsetY = evt.clientY - rect.top - PAN_DIRECTION.beginY + PAN_DIRECTION.moveY

    drawTable(listCell)
}

export const handleMouseDown = ({evt}) => {
    const rect = CANVAS.getBoundingClientRect()
    PAN_DIRECTION.beginX = evt.clientX - rect.left
    PAN_DIRECTION.beginY = evt.clientY - rect.top

    PAN_DIRECTION.isMouseDown = true
}

export const handleMouseUp = ({evt}) => {
    const rect = CANVAS.getBoundingClientRect()

    PAN_DIRECTION.moveX = PAN_DIRECTION.moveX + evt.clientX - rect.left - PAN_DIRECTION.beginX
    PAN_DIRECTION.moveY = PAN_DIRECTION.moveY + evt.clientY - rect.top - PAN_DIRECTION.beginY

    PAN_DIRECTION.isMouseDown = false

    if (evt.clientX - rect.left - PAN_DIRECTION.beginX === 0 && evt.clientY - rect.top - PAN_DIRECTION.beginY === 0) {
        const location = handleClickStep(evt)

        if (- MAX_SIZE / 2 <= location.x && - MAX_SIZE / 2 <= location.y && MAX_SIZE / 2 - 1 >= location.x && MAX_SIZE / 2 - 1 >= location.y) {
            return location
        }
    }
}

export const handleClickStep = (evt) => {
    const rect = CANVAS.getBoundingClientRect()

    return {
        x: Math.floor((evt.clientX - rect.left - WIDTH / 2 - PAN_DIRECTION.moveX) / GAP_LINE),
        y: Math.floor((evt.clientY - rect.top - HEIGHT / 2 - PAN_DIRECTION.moveY) / GAP_LINE)
    }
}

export const renderCell = (x, y, side, offsetX, offsetY, isLastMove) => {
    // calc location

    CTX.beginPath();
    CTX.arc(
        WIDTH / 2 + x * GAP_LINE + offsetX + GAP_LINE / 2,
        HEIGHT / 2 +  y * GAP_LINE + offsetY + GAP_LINE / 2,
        16,
        0,
        2 * Math.PI
    );
    if (side === 1) {
        CTX.fillStyle = "orange";
    } else {
        CTX.fillStyle = "gray";
    }
    CTX.fill();
    if (isLastMove) {
        CTX.lineWidth = 2;
        CTX.strokeStyle = "red";
        CTX.stroke();
    }
}