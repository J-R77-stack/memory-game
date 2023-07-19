class Memory {
    constructor(totalTime, circles) {
        this.circlesArray = circles;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("flips");
    }
    startGame(){
        this.circleToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCircles = [];
        this.busy = true;
        setTimeout(()=> {
            this.shuffleCircles();
            this.countDown =this.startCountDown();
            this.busy = false
        }, 500);
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('overlay-text-winner').classList.add('visible');
        this.hideCircles();
    }

    victory() {
        clearInterval(this.countdown);
        document.getElementById('overlay-text-you-did-it').classList.add('visible');
        this.hideCircles();
    }

    hideCircles() {
        this.circlesArray.forEach(circle => {
            circle.classList.remove("visible");
            circle.classList.remove("matched");
        });
    }

    flipCircle(circle) {
        if(this.canFlipCircle(circle)){
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            circle.classList.add("visible");

            if(this.circleToCheck) {
                this.checkForCircleMatch(circle);
            } else {
                this.circleToCheck = circle;
            }
        }
    }

    checkForCircleMatch(circle) {
        if(this.getCircleType(circle) === this.getCircleType(this.circleToCheck))
            this.circleMatch(circle, this.circleToCheck);
        else 
            this.circleMismatch(circle, this.circleToCheck);

        this.circleToCheck = null;
    }

    circleMatch(circle1, circle2) {
        this.matchedCircles.push(circle1);
        this.matchedCircles.push(circle2);
        circle1.classList.add('matched');
        circle2.classList.add('matched');
        if(this.matchedCircles.length === this.circlesArray.length)
            this.victory();
    }
    circleMismatch(circle1, circle2) {
        this.busy = true;
        setTimeout(() => {
            circle1.classList.remove('visible');
            circle2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    shuffleCircles() {
        for(let i = this.circlesArray.length -1; i > 0; i--){
            let randIndex = Math.floor(Math.random()* (i+1));
            this.circlesArray[randIndex].style.order = i;
            this.circlesArray[i].style.order = randIndex;
        }
    }

    getCircleType(circle) {
        return circle.getElementsByClassName('fas')[0].src;
    }

    canFlipCircle(circle) {
        return !this.busy && !this.matchedCircles.includes(circle) && circle !== this.circleToCheck;
    }
}



function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let circles = Array.from(document.getElementsByClassName("circle"));
    let game = new Memory(100, circles);

    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible");
            game.startGame();
        });
    });
    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            game.flipCircle(circle)
        });
    });
}

if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}