class food{
	constructor(game) {
		this.game = game;
		this.x = 10;
		this.y = 10;
		this.grid = 10;
		this.update();
	}

	update() {
		this.x = (Math.floor(Math.random()*47) + 2)*this.grid;
		this.y = (Math.floor(Math.random()*47) + 2)*this.grid;
	}

	draw() {
				this.game.context.beginPath();
				this.game.context.arc(this.x, this.y, this.grid, 0, 2 * Math.PI);
				this.game.context.fill();
			}
}