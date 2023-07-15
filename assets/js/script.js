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

        this.shuffleCircles();
    }

    flipCircle(circle) {
        if(this.canFlipCircle(circle)){
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            circle.classList.add("visible");
        }
    }

    shuffleCircles() {
        for(let i = this.circlesArray.length -1; i > 0; i--){
            let randIndex = Math.floor(Math.random()* (i+1));
            this.circlesArray[randIndex].style.order = i;
            this.circlesArray[i].style.order = randIndex;
        }
    }

    canFlipCircle(circle) {
        return true;
        // return !this.busy && !this.matchedCircles.includes(circle) && card !== this.circleToCheck;
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