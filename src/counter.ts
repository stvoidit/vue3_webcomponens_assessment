import store from "./store";

import classs from "./button.module.css";

export class CounterComponent extends HTMLElement {
    private _buttonElement: HTMLButtonElement;
    private _step: number = 1;

    // Статический метод для определения отслеживаемых атрибутов
    static get observedAttributes(): string[] {
        return ["initial-count", "step"];
    }

    // Lifecycle метод при отключения элемента
    disconnectedCallback() {
        store.describe(() => this.render());
    }

    // Lifecycle метод при подключении элемента
    connectedCallback() {
        store.subscribe(() => this.render());
        const step = this.getAttribute("step");
        this._step = step ? parseInt(step, 10) : 1;
        this.render();
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        this._buttonElement = document.createElement("button");
        this._buttonElement.addEventListener("click", () => this.incrementCounter());
        this._buttonElement.className = classs.btn;
        shadowRoot.appendChild(this._buttonElement);
    }

    // Метод для обработки изменений атрибутов
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue == oldValue) {
            return;
        }
        switch (name) {
            case "initial-count":
                store.counter = parseInt(newValue, 10);
                this.render();
                break;
            case "step":
                this._step = parseInt(newValue, 10);
                break;
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
            detail: {
                currentCount: store.counter,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}

// Регистрация кастомного элемента
customElements.define("counter-button", CounterComponent);
