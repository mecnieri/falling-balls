import * as PIXI from 'pixi.js'

export const createApp = (width = 600, height = 600, color = '0x65d2eb') => {
  //@ts-ignore
  const app = new PIXI.Application({
    width: width,
    height: height,
    antialias: true,
    backgroundColor: color,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  })

  const root: HTMLElement | null = document.getElementById("root")
  //@ts-ignore
  root?.appendChild(app.view)
  return app
}
