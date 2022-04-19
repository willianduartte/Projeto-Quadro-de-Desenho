// Initial Data
let currentColor = 'black'
let canDraw = false

let usercolor = document.querySelector('.colorArea .colorcamp .color')
let linesize = document.querySelector('.linesize')
let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')

// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})
document.querySelector('.clear').addEventListener('click', clearScreen)
usercolor.addEventListener('change', mudarCor)
linesize.addEventListener('change', lineheight)

// Functions
function mudarCor() {
    usercolor.setAttribute('data-color', usercolor.value)
}
function lineheight() {
    linesize = document.querySelector('.colorArea .linecamp .linesize').value
}
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.color.active').classList.remove('active')
    e.target.classList.add('active')
}
function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}
// Pc
if(window.innerWidth > 800) {
    let mouseX = 0
    let mouseY = 0

    screen.addEventListener('mousedown', mouseDownEvent)
    screen.addEventListener('mousemove', mouseMoveEvent)
    screen.addEventListener('mouseup', mouseUpEvent)

    function mouseDownEvent(e) {
        canDraw = true
        mouseX = e.pageX - screen.offsetLeft
        mouseY = e.pageY - screen.offsetTop
    }
    function mouseMoveEvent(e) {
        if(canDraw) {
            draw(e.pageX, e.pageY)
        }
    }
    function mouseUpEvent() {
        canDraw = false
    }
    function draw(x, y) {
        let pointX = x  - screen.offsetLeft
        let pointY = y - screen.offsetTop
    
        ctx.beginPath()
        ctx.lineWidth = linesize
        ctx.lineJoin = 'round'
        ctx.moveTo(mouseX, mouseY)
        ctx.lineTo(pointX, pointY)
        ctx.closePath()
        ctx.strokeStyle = currentColor
        ctx.stroke()
    
        mouseX = pointX
        mouseY = pointY
    }
}
// Cellphone
if(window.innerWidth <= 800) {
    let touchX = 0
    let touchY = 0

    screen.addEventListener('touchstart', touchStartEvent)
    screen.addEventListener('touchmove', touchMoveEvent)
    screen.addEventListener('touchend', touchEndEvent)

    function touchStartEvent(e) {
        canDraw = true
        touchX = e.pageX - screen.offsetLeft
        touchY = e.pageY - screen.offsetTop
        console.log('Tocou')
    }
    function touchMoveEvent(e) {
        if(canDraw) {
            draw(e.pageX, e.pageY)
            console.log('Desenhando...')
            console.log(e.pageX, e.pageY) // Era para ser mostrado as cordenadas mas aparece undefined
        }
    }
    function touchEndEvent() {
        canDraw = false
        console.log('Soltou')
    }
    function draw(x, y) {
        let pointX = x  - screen.offsetLeft
        let pointY = y - screen.offsetTop
    
        ctx.beginPath()
        ctx.lineWidth = linesize
        ctx.lineJoin = 'round'
        ctx.moveTo(touchX, touchY)
        ctx.lineTo(pointX, pointY)
        ctx.closePath()
        ctx.strokeStyle = currentColor
        ctx.stroke()
    
        touchX = pointX
        touchY = pointY
    }
}