class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.score = 0;
        this.speed = 100;
        this.showspeed = 1;
        this.init();
        this.loop();
        this.count = 0;
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 500;
        this.canvas.height = 500;
        document.body.appendChild(this.canvas);
        this.snake = new snake(this);
        this.food = new food(this);
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), this.speed);
    }

    update() {
        this.snake.update();
        if (selectGame === 2) {
            if (this.snake.eat(this.food.x, this.food.y)) {
                if (this.count % 5 === 0 && this.count !== 0) {
                    this.speed -= 10;
                    this.showspeed += 1;
                }
                this.food.update();
                this.count += 1;
                this.score += this.showspeed;
            }
        } else if (selectGame === 1) {
            if (this.snake.eat(this.food.x, this.food.y)) {
                this.food.update();
                this.score += 1 * this.showspeed;
            }
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let img = document.getElementById("image");
        this.context.drawImage(img, 0, 0, 500, 500);
        this.context.font = '20px Arial';
        this.context.fillText("Score: " + this.score, 400, 20);
        this.context.fillText("Speed: " + this.showspeed, 400, 50);
        this.context.fillText('Hight score: ' + localStorage.getItem('highScore') + " by " + localStorage.getItem('name'),5,20)
        this.snake.draw();
        this.food.draw();
    }
}

let g = new game();

