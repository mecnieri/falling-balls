import { Container, Graphics } from "pixi.js";
import * as PIXI from "pixi.js";
import { Game } from "./game";
import { fromEvent } from 'rxjs';

export class Rectangle extends Container {
    private direction: number
    public speed: number
    private w: number
    private h: number
    private game: Game
    private pressedDirections: string[]

    constructor(game: Game) {
        super()
        this.game = game
        this.x = 120
        this.y = 450
        this.w = 150
        this.h = 20
        const graphics = new Graphics();
        graphics.beginFill(0x1d00dd);
        graphics.drawRect(0, 0, this.w, this.h);
        graphics.endFill()
        game.stage.addChild(this)
        this.addChild(graphics)
        this.direction = 0
        this.speed = game.playerSpeed
        //@ts-ignore
        const ticker: any = new PIXI.Ticker();
        ticker.add((deltaTime: number) => this.move(deltaTime));

        this.pressedDirections = []


        fromEvent(document, 'keydown')
            .subscribe((e) => {
                ticker.start();
                //@ts-ignore
                if (e.key === "ArrowRight") {
                    this.direction = 1
                    this.pressedDirections.push("ArrowRight")
                }
                //@ts-ignore
                if (e.key === "ArrowLeft") {
                    this.direction = -1
                    this.pressedDirections.push("ArrowLeft")
                }
            });
        fromEvent(document, 'keyup')
            .subscribe((e) => {
                //@ts-ignore
                if (e.key === "ArrowRight") this.pressedDirections = this.pressedDirections.filter(d => d !== "ArrowRight")
                //@ts-ignore
                if (e.key === "ArrowLeft") this.pressedDirections = this.pressedDirections.filter(d => d !== "ArrowLeft")
                if (this.pressedDirections.length === 0) {
                    this.direction = 0
                    ticker.stop();
                    return
                }
                if (this.pressedDirections[this.pressedDirections.length - 1] === "ArrowLeft") this.direction = -1
                if (this.pressedDirections[this.pressedDirections.length - 1] === "ArrowRight") this.direction = 1
            });
    }


    checkCollision() {
        for (let i = 0; i < this.game.pool.children.length; i++) {
            const ball: any = this.game.pool.children[i]
            if (ball.y < this.y - ball.radius) continue
            if (ball.y > this.y + this.h + ball.radius) continue
            if (ball.x + ball.radius < this.x) continue
            if (ball.x - ball.radius > this.x + this.w) continue
            if (ball.x > this.x && ball.x < this.x + this.width) { ball.cought(); continue }
            if (ball.y > this.y && ball.y < this.y + this.h) { ball.cought(); continue }
            if (
                this.countDistance(ball.x, ball.y, this.x, this.y) < ball.radius ||
                this.countDistance(ball.x, ball.y, this.x + this.w, this.y) < ball.radius ||
                this.countDistance(ball.x, ball.y, this.x, this.y + this.h) < ball.radius ||
                this.countDistance(ball.x, ball.y, this.x + this.w, this.y + this.h) < ball.radius
            ) { ball.cought(); continue }

        }
    }
    move(deltaTime: number) {
        this.x += this.speed * deltaTime * this.direction
    }
    countDistance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
}


