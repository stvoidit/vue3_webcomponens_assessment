import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import store from "./store"
import './counter'




const mount = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div id="counter">count: ${store.counter}</div>
      <div class="card">
        <counter-button></counter-button>
        <counter-button></counter-button>
      </div>
      <p class="read-the-docs">
        Click on the Vite and TypeScript logos to learn more
      </p>
    </div>
  `
  return document.querySelector<HTMLDivElement>('#counter')!
}
const counterElem = mount()

const rerenderCounter = () => {
  counterElem.innerText = `count: ${store.counter}`
}
store.subscribe(rerenderCounter)
