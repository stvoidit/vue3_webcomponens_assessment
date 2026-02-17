import store from "../store";

import classs from "./counter.module.css";

class CounterComponent extends HTMLElement {
    private _buttonElement: HTMLButtonElement;
    private _step = 1;

    // Статический метод для определения отслеживаемых атрибутов
    static get observedAttributes(): string[] {
        return ["initial-count", "step"];
    }

    // Lifecycle метод при отключения элемента
    disconnectedCallback(): void {
        store.describe(() => {
            this.render();
        });
    }

    // Lifecycle метод при подключении элемента
    connectedCallback(): void {
        store.subscribe(() => {
            this.render();
        });
        const step = this.getAttribute("step");
        if (step !== null && step !== "") {
            this._step = Number.parseInt(step, 10);
        }
        this.render();
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        this._buttonElement = document.createElement("button");
        this._buttonElement.addEventListener("click", () => {
            this.incrementCounter();
        });
        this._buttonElement.className = classs.btn;
        shadowRoot.append(this._buttonElement);
    }

    // Метод для обработки изменений атрибутов
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (newValue === oldValue) {
            return;
        }
        switch (name) {
            case "initial-count": {
                store.counter = Number.parseInt(newValue, 10);
                this.render();
                break;
            }
            case "step": {
                this._step = Number.parseInt(newValue, 10);
                break;
            }
            default: {
                console.warn(`unknown prop: "${name}"`);
            }
        }
    }

    // Метод для обновления текста кнопки
    private render(): void {
        this._buttonElement.textContent = `count is ${store.counter}`;
        if (store.counter > 10) {
            this.remove();
        }
    }

    // Метод для инкрементации счетчика
    private incrementCounter(): void {
        store.counter += this._step;
        this.render();

        // Диспетчеризация события при изменении счетчика
        const event = new CustomEvent("counter-change", {
            bubbles: true,
            composed: true,
            detail: {
                currentCount: store.counter,
            },
        });
        this.dispatchEvent(event);
    }
}

export default CounterComponent;
