class snake {
    constructor(game) {
        this.game = game;
        this.x = 100;
        this.y = 200;
        this.grid = 10;
        this.dx = this.grid;
        this.dy = 0;
        this.cell = [];
        this.maxCells = 4;
        this.catchHandle();
    }

    update() {
        if (this.endGame()) {
            this.x += this.dx;
            this.y += this.dy;
        }
        this.cell.unshift({x: this.x, y: this.y});
        if (this.cell.length > this.maxCells) {
            this.cell.pop();
        }
    }

    draw() {

        for (let i = 0; i < this.cell.length; i++) {
            this.game.context.fillStyle = 'white';
            this.game.context.beginPath();
            this.game.context.arc(this.cell[i].x, this.cell[i].y, this.grid, 0, 2 * Math.PI);
            this.game.context.fill();
        }
        if (!this.endGame()) {
            this.game.context.font = '70px Arial';
            this.game.context.fillText("Game Over!!!", 58, 260);
            if (localStorage.getItem('highScore') < this.game.score) {
                localStorage.setItem('highScore', this.game.score);
                let name = prompt("Bạn đã đạt kỷ lục mới, mời nhập tên");
                localStorage.setItem('name', name);
            }
        }
    }

    catchHandle() {
        document.addEventListener('keydown', (e) => {
            if (e.which === 37 && this.dx === 0) {
                this.dx = -this.grid;
                this.dy = 0;
            } else if (e.which === 38 && this.dy === 0) {
                this.dx = 0;
                this.dy = -this.grid;
            } else if (e.which === 39 && this.dx === 0) {
                this.dx = this.grid;
                this.dy = 0;
            } else if (e.which === 40 && this.dy === 0) {
                this.dx = 0;
                this.dy = this.grid;
            } else if (e.which === 32) {
                this.game.speed -= 10;
                this.game.showspeed += 1;
            } else if (e.which === 65) {
                this.game.speed += 10;
                this.game.showspeed -= 1;
            }

        });
    }

    eat(x, y) {
        if (this.x === x && this.y === y ||
            this.x === x - this.grid && this.y === y - this.grid ||
            this.x === x + this.grid && this.y === y - this.grid ||
            this.x === x + this.grid && this.y === y + this.grid ||
            this.x === x - this.grid && this.y === y + this.grid
        ) {
            this.maxCells++;
            return true;
        }
        return false;
    }

    endGame() {
        for (let i = 1; i < this.cell.length; i++) {
            if (this.x === this.cell[i].x && this.y === this.cell[i].y) {
                return false;
            } else if (this.x === 0 || this.y === 0 || this.x === this.game.canvas.width || this.y === this.game.canvas.height) {
                return false;
            }
        }
        return true;
    }
}