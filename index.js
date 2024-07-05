document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle");

    //ballX & ballY will help to set a starting point for the ball w.r.t the table
    let ballX = 50; //Distance of the top of the ball w.r.t the ping-pong table
    let ballY = 50; //Distance of the left of the ball w.r.t the ping-pong table

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    //dx & dy are displacement flactors on x-axis & y-axis respectively
    let dx = 2;
    let dy = 2;

    setInterval(function exec() {

        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        /*
        ballX < (paddle.offsetLeft + paddle.offsetWidth) -> if left of the ball (w.r.t) table is less than right of the paddle (w.r.t) table
        ballY > paddle.offsetTop    -> if top of the ball (w.r.t) table is greater than top of the paddle (w.r.t) table
        ballY + ball.offsetHeight -> bottom of the ball (w.r.t) table
        paddle.offsetTop + paddle.offsetHeight -> bottom of the paddle (w.r.t) table
       */

        //Collison of the ball & paddle
        if(ballX < (paddle.offsetLeft + paddle.offsetWidth) && (ballY > paddle.offsetTop) && ((ballY + ball.offsetHeight) < (paddle.offsetTop + paddle.offsetHeight)))
            dx *= -1;

        /*
        if(ballX > (900-20) || ballX <= 0)          //(Frame-width - ball width)
            dx *= -1;

        if(ballY > (400-20) || ballY <= 0)           //(Frame-width - ball width)
            dy *= -1;
        */
        
        if(ballX > (table.offsetWidth - ball.offsetWidth) || ballX <= 0)
            dx *= -1;
        
        if(ballY > (table.offsetHeight - ball.offsetHeight) || ballY <= 0)
            dy *= -1;
    }, 1)

    let paddleY = 0;
    let dPy = 10;

    document.addEventListener("keydown", (event) => {

        event.preventDefault();                             //Prevents default behaviour of keydown to scroll down
        
        if((event.keyCode === 38) && (paddleY > 0))        //Up-Arrow
            paddleY -= dPy;
        
        if((event.keyCode === 40) && (paddleY < (table.offsetHeight - paddle.offsetHeight)))        //Down-Arrow
            paddleY += dPy;
        
        paddle.style.top = `${paddleY}px`;
    })

    document.addEventListener("mousemove", (event) => {

        if(event.clientX > (table.offsetLeft + table.offsetWidth/2))        //Lets user control mouse till half of the table
            return;

        let distanceOfMouseFromTop = event.clientY;     //distance of mouse from top of the screen
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointControl = distanceOfMouseFromTop - distanceOfTableFromTop - paddle.offsetHeight/2;
        
        paddleY = mousePointControl;
        
        if((paddleY <= 0) || (paddleY > (table.offsetHeight - paddle.offsetHeight)))  //If bottom of the paddle touches bottom of the table then return
            return;

        paddle.style.top = `${paddleY}px`;
    })
});