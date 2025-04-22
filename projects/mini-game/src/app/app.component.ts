import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { createApp } from './utils/createApp'
import { Game } from './game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
       <form name="blogForm" [formGroup]="blogForm" (change)="handleChanges()">
        <section>
          <label for="fallingSpeed"  >Falling Speed </label>
          <input type="number" min="0" step="0.00001" oninput="validity.valid||(value='');" formControlName="fallingSpeed" id="fallingSpeed"/>
          <label for="interval" >Falling Frequency</label>
          <input type="number" min="0" step="0.00001" oninput="validity.valid||(value='');" formControlName="interval"  id="interval" />
          <label for="playerSpeed">Player Speed</label>
          <input type="number" min="0" step="0.00001" oninput="validity.valid||(value='');" formControlName="playerSpeed" id="playerSpeed"/>
          <label for="timeout">Game Time</label>
          <input type="number" min="0"   oninput="validity.valid||(value='');" formControlName="timeout" id="timeout"/>
        </section>
        </form>
    </article>
  `,
  styles: [],
})

export class AppComponent {
  game: Game

  blogForm = new FormGroup({
    interval: new FormControl(),
    fallingSpeed: new FormControl(),
    playerSpeed: new FormControl(),
    timeout: new FormControl()
  })

  constructor() {
    const app = createApp(400, 600)
    const root: HTMLElement | null = document.getElementById("root")
    //@ts-ignore
    root?.appendChild(app.view)
    const stage = app.stage
    //@ts-ignore
    this.game = new Game(stage)
  }



  handleChanges() {
    if (typeof this.blogForm.value.interval === 'number' &&
      typeof this.blogForm.value.fallingSpeed === 'number' &&
      typeof this.blogForm.value.playerSpeed === 'number' &&
      typeof this.blogForm.value.timeout === 'number'
    ) {
      this.game.setNewInterval(this.blogForm.value.interval)
      this.game.setfallingSpeed(this.blogForm.value.fallingSpeed)
      this.game.setplayerSpeed(this.blogForm.value.playerSpeed)
      this.game.setTime(this.blogForm.value.timeout)
    }
  }
}
