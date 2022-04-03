const SPEED = 0.02

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        this.reset()
    }

    // helper function that gets the position of the paddle using the CSS '--position' variable
    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }

    // helper function that sets the position of the paddle using the CSS '--position' variable
    set position(value) {
        this.paddleElem.style.setProperty("--position", value)
    }

    // function that gets the paddle rectangle
    rect() {
        return this.paddleElem.getBoundingClientRect()
    }

    // resets position of the paddle
    reset() {
        this.position = 50
    }

    /* function that updates the position of the computer paddle
    depnding on the maximum speed set for the computer paddle 'SPEED' */
    update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)
    }
}