import "./style.css";
import viteLogo from "/vite.svg";

import CounterComponent from "./components/counter";
import LogoLink from "./components/logo";
import store from "./store";
import typescriptLogo from "./typescript.svg";

// Регистрация кастомного элемента
customElements.define("logo-link", LogoLink);
customElements.define("counter-button", CounterComponent);

const mount = () => {
    const app = document.querySelector<HTMLDivElement>("#app");
    if (!app) {
        return;
    }
    app.innerHTML = `
    <div>
      <logo-link href="https://vite.dev" src="${viteLogo}" alt="Vite logo"></logo-link>
      <logo-link href="https://www.typescriptlang.org/" src="${typescriptLogo}" alt="TypeScript logo"></logo-link>
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
