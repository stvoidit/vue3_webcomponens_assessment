import "./style.css";
import viteLogo from "/vite.svg";

import { type CounterComponent } from "./counter";
import store from "./store";
import typescriptLogo from "./typescript.svg";

const mount = () => {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div id="counter">count: ${store.counter}</div>
      <div class="card" id="btns">
        <counter-button></counter-button>
        <counter-button></counter-button>
      </div>
      <p class="read-the-docs">
        Click on the Vite and TypeScript logos to learn more
      </p>
    </div>
  `;

    const btnsElem = document.querySelector<HTMLDivElement>("#btns")!;
    const btn = document.createElement("counter-button") as CounterComponent;
    btn.setAttribute("step", "2");
    btnsElem.appendChild(btn);

    return document.querySelector<HTMLDivElement>("#counter")!;
};
const counterElem = mount();

const rerenderCounter = () => {
    counterElem.innerText = `count: ${store.counter}`;
};
store.subscribe(rerenderCounter);
