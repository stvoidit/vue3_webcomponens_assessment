import store from "./store"

export class CounterComponent extends HTMLElement {
  // Приватные свойства
  // private _counter: number = 0;
  private _buttonElement: HTMLButtonElement;
  private _step: number = 1;

  // Статический метод для определения отслеживаемых атрибутов
  static get observedAttributes(): string[] {
    return ['initial-count', 'step'];
  }

  constructor() {
    super();
    // this._counter = store.counter

    // Создаем теневой DOM
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Создаем кнопку
    this._buttonElement = document.createElement('button');
    this._buttonElement.addEventListener('click', () => this.incrementCounter());
    shadowRoot.appendChild(this._buttonElement);

  }

  disconnectedCallback() {
    store.describe(()=>this.updateButtonText())
  }
  // Lifecycle метод при подключении элемента
  connectedCallback() {
    store.subscribe(()=>this.updateButtonText())
    // Чтение начальных атрибутов
    // const initialCount = this.getAttribute('initial-count');
    const step = this.getAttribute('step');

    // Установка начального значения
    // this._counter = initialCount ? parseInt(initialCount, 10) : store.counter;
    this._step = step ? parseInt(step, 10) : 1;

    // Обновляем текст кнопки
    this.updateButtonText();

  }

  // Метод для обработки изменений атрибутов
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (oldValue == oldValue) {
      return
    }
    switch(name) {
      case 'initial-count':
        store.counter = parseInt(newValue, 10);
        this.updateButtonText();
        break;
      case 'step':
        this._step = parseInt(newValue, 10);
        break;
    }
  }

  // Метод для обновления текста кнопки
  private updateButtonText(): void {
    this._buttonElement.textContent = `count is ${store.counter}`;
    if (store.counter > 10) {
      this.remove()
    }
  }

  // Метод для инкрементации счетчика
  private incrementCounter(): void {
    store.counter += this._step;
    this.updateButtonText();

    // Диспетчеризация события при изменении счетчика
    const event = new CustomEvent('counter-change', {
      detail: {
        currentCount: store.counter
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);

  }

  // Геттеры для программного доступа к значениям
  get count(): number {
    return store.counter;
  }

  set count(value: number) {
    store.counter = value;
    this.updateButtonText();
  }
}

// Регистрация кастомного элемента
customElements.define('counter-button', CounterComponent);
