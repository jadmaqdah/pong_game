// importing the Ball and Paddle classes
import Ball from './Ball.js'
import Paddle from './Paddle.js'

// creating an instance of the Ball class using the ball HTML element
const ball = new Ball(document.getElementById("ball"))
// creating an instance of the Paddle class using the player paddle HTML element
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
// creating an instance of the Paddle class using the computer paddle HTML element
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
// getting the player score HTML element
const playerScoreElem = document.getElementById("player-score")
// getting the computer score HTML element
const computerScoreElem = document.getElementById("computer-score")

// initialising the previous time
let lastTime

// function that takes as variable the time since the programe has started
function update(time) {
    // checking if lastTime exists
    if (lastTime != null) {
        // finding the time elapsed since the previous frame
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
            )

        // setting the '--hue' value and changing it wrt delta
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if (isLose()) handleLose()
    }

    // updating our previous time to our current time
    lastTime = time

    /* performing an animation before the next repaint. At each request, the 
    update function is called. This causes an infinte loop since it is called 
    within itself. */
    window.requestAnimationFrame(update)
}

// function that checks if the ball is out of bounds (i.e., lost)
function isLose() {
    const rect = ball.rect()
    return (rect.right >= window.innerWidth || rect.left <= 0) 
}

function handleLose() {
    // handling the score depending on the side the ball has touched
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }

    // resetting the ball and computer paddle to centre of screen
    ball.reset()
    computerPaddle.reset()
}

// the y position of the player paddle moves with the mouse
document.addEventListener("mousemove", e => {
    // in CSS, positions are set in percentages
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)