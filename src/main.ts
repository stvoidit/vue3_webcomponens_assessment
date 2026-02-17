import "./style.css";
import viteLogo from "/vite.svg";

import CounterComponent from "./components/counter";
import store from "./store";
import typescriptLogo from "./typescript.svg?url";

// Регистрация кастомного элемента
customElements.define("counter-button", CounterComponent);

const mount = () => {
    const app = document.querySelector<HTMLDivElement>("#app");
    if (!app) {
        return;
    }
    app.innerHTML = `

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

  `;

    const btnsElem = app.querySelector<HTMLDivElement>("#btns");
    const counterElem = app.querySelector<HTMLDivElement>("#counter");
    const btn = document.createElement("counter-button");
    btn.setAttribute("step", "2");
    btnsElem?.append(btn);

    return () => {
        if (counterElem) {
            counterElem.textContent = `count: ${store.counter}`;
        }
    };
};
const rerenderCounter = mount();
store.subscribe(rerenderCounter);
