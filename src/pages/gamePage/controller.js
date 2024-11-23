// Global
let HEIGHT, WIDTH
let CTX
let PAN_DIRECTION = {
    isMouseDown: false,
    beginX: 0,
    beginY: 0,
    moveX: 0,
    moveY: 0,
}

export const initBoard = (ctx, height, width) => {
    CTX = ctx

    HEIGHT = height
    WIDTH = width
}

export const drawTable = (offsetX = 0, offsetY = 0) => {
    CTX.clearRect(0, 0, WIDTH, HEIGHT)

    const MAX_SIZE = 100
    const GAP_LINE = 50

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
}

export const handleMouseMove = ({canvas, evt}) => {
    if (!PAN_DIRECTION.isMouseDown) {
        return
    }

    const rect = canvas.getBoundingClientRect()
    drawTable(
        evt.clientX - rect.left - PAN_DIRECTION.beginX + PAN_DIRECTION.moveX,
        evt.clientY - rect.top - PAN_DIRECTION.beginY + PAN_DIRECTION.moveY
    )
}

export const handleMouseDown = ({canvas, evt}) => {
    const rect = canvas.getBoundingClientRect()
    PAN_DIRECTION.beginX = evt.clientX - rect.left
    PAN_DIRECTION.beginY = evt.clientY - rect.top

    PAN_DIRECTION.isMouseDown = true
}

export const handleMouseUp = ({canvas, evt}) => {
    const rect = canvas.getBoundingClientRect()

    PAN_DIRECTION.moveX = PAN_DIRECTION.moveX + evt.clientX - rect.left - PAN_DIRECTION.beginX
    PAN_DIRECTION.moveY = PAN_DIRECTION.moveY + evt.clientY - rect.top - PAN_DIRECTION.beginY

    PAN_DIRECTION.isMouseDown = false

    if (evt.clientX - rect.left - PAN_DIRECTION.beginX === 0 && evt.clientY - rect.top - PAN_DIRECTION.beginY === 0) {
        console.log('You are click!')
    }
}