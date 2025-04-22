import { Ball } from './ball.js'
import { Rectangle } from './rectangle.js'
import { Text, Container } from "pixi.js"
import * as PIXI from "pixi.js"

export class Game {
    public score: number
    public scoreText: Text
    private resultText: Text

    public interval: number | null | undefined
    public pool: Container
    public fallingSpeed: number
    public playerSpeed: number
    public stage: any
    public rectangle: Rectangle
    private myInterval: undefined | ReturnType<typeof setTimeout> | number
    private timeOutInterval: undefined | ReturnType<typeof setTimeout> | number
    public time: number
    public timeText: Text
    private ticker: any
    constructor(stage: any) {
        this.stage = stage
        this.pool = new Container()
        stage.addChild(this.pool)

        this.time = 0
        this.timeText = new Text('Time: ' + this.time);
        stage.addChild(this.timeText)

        this.score = 0
        this.scoreText = new Text('Score: ' + this.score);
        this.scoreText.y = 30
        stage.addChild(this.scoreText)

        this.resultText = new Text(`Congrats ! 
Your score ${this.score}`, { fontSize: 50, align: 'center' });
        this.resultText.x = 65
        this.resultText.y = 200
        this.resultText.visible = false

        stage.addChild(this.resultText)

        this.interval = 1
        this.fallingSpeed = 2
        this.myInterval = undefined
        this.timeOutInterval = undefined
        this.playerSpeed = 5
        this.rectangle = new Rectangle(this)
        //@ts-ignore
        this.ticker = new PIXI.Ticker();
        this.ticker.add((deltaTime: number) => this.play(deltaTime));
    }

    setNewInterval(interval: number | null | undefined) {
        clearInterval(this.myInterval);
        this.myInterval = window.setInterval(() => {
            new Ball(this)
        }, interval! * 1000)
    }

    setfallingSpeed(fallingSpeed: number | null | undefined) {
        this.fallingSpeed = fallingSpeed!
    }
    setplayerSpeed(playerSpeed: number | null | undefined) {
        this.rectangle.speed = playerSpeed!
    }

    setTime(time: number | null | undefined) {
        this.time = time!
        this.timeText.text = 'Time: ' + this.time;
        this.clearScore()
        this.pool.removeChildren()
        this.setTimeInterval()
        this.ticker.start()
        this.resultText.visible = false
        new Ball(this)
    }

    setTimeInterval() {
        clearInterval(this.timeOutInterval!);
        this.timeOutInterval = window.setInterval(() => {
            this.time--
            this.timeText.text = 'Time: ' + this.time;
            if (this.time === 0) {
                this.ticker.stop()
                this.resultText.text = `Congrats ! 
Your score ${this.score}`;
                this.resultText.visible = true
                clearInterval(this.myInterval);
                clearInterval(this.timeOutInterval);
                this.pool.removeChildren()
            }
        }, 1000)
    }

    addScore() {
        this.score += 1
        this.scoreText.text = 'Score: ' + this.score;
    }
    clearScore() {
        this.score = 0
        this.scoreText.text = 'Score: ' + this.score;
    }
    play(deltaTime: number) {
        this.rectangle.checkCollision()
        for (let i = 0; i < this.pool.children.length; i++) {
            //@ts-ignore
            this.pool.children[i].move(deltaTime)
        }
    }
}
