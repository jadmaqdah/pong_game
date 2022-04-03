const INITIAL_VELOCITY = .01
const VELOCITY_INCREASE = 0.00001

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    }

    // helper function to get the x coordinate of the ball using the CSS variable --x
    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    // helper function that sets the x coordinate value of the ball element
    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }

    // helper function to get the y coordinate of the ball using the CSS variable --y
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    // helper function that sets the y coordinate value of the ball element
    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    // function to get position of ball
    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    // helper function to set ball properties in constructer when ball is created
    reset() {
        this.x = 50
        this.y = 50
        this.direction =  { x: 0, y: 0 }
        // making sure the inital x direction is not very 'vertical' nor 'horizontal'
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= .9) {
            // angle wrt to x axis by which the ball is initally heading 
            const heading = randomeNumberBetween(0, 2 * Math.PI)
            // unit vectors 
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        // initialising velocity
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, paddleRecs) {
        // finding the new distances for new frame 
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        // increasing velocity with each frame
        this.velocity += VELOCITY_INCREASE * delta

        const rect = this.rect()

        // ensuring ball bounces when reaches top or bottom of page
        if (rect.bottom >= window.innerHeight || rect.top <=0) {
            this.direction.y *= -1
        }

        /* loops over all the paddle ectangles and if isCollision is true
        for at least one paddle, the if statement wil be executed */
        if (paddleRecs.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
    }
}

// function that generates a random number between two numbers
function randomeNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}

// checks if there is a collision between two rectangles by checking any overlaps
function isCollision(rect1, rect2) {
    return (
         rect1.left <= rect2.right &&
         rect1.right >= rect2.left &&
         rect1.top <= rect2.bottom &&
         rect1.bottom >= rect2.top
         )

}
