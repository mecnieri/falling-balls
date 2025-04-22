import { Game } from "./game";
import { Container, Graphics } from "pixi.js";

export class Ball extends Container {
    public game: Game
    public speed: number
    public radius: number

    constructor(game: Game) {
        super()
        this.game = game
        const gr = new Graphics();
        this.radius = 20
        gr.beginFill(0xdd00dd);
        gr.drawCircle(0, 0, this.radius);
        gr.endFill();
        this.addChild(gr)

        this.x = Math.random() * 400
        this.y = 0
        this.game.pool.addChild(this)
        this.speed = game.fallingSpeed
    }

    move(deltaTime: number) {
        if (this.y > 600 + this.radius) this.destroyBall()
        this.y += this.speed * deltaTime
    }

    destroyBall() {
        this.game.pool.removeChild(this)
    }

    cought() {
        this.game.addScore()
        this.destroyBall()
    }
}