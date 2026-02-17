class ChangeEvent<T extends object> extends Event {
    readonly detail: T;
    constructor(name: "change", data: T) {
        super(name, {
            bubbles: true,
            composed: true,
        });
        this.detail = data;
    }
}

const isExists = <T extends object>(obj: T, key: PropertyKey): key is keyof T => key in obj;

const isNumber = (value: unknown): value is number => typeof value === "number";

const createReactiveStore = () => {
    const emitter = new EventTarget();

    const emit = <O extends object>(obj: O) => {
        emitter.dispatchEvent(
            new ChangeEvent("change", {
                bubbles: true,
                composed: true,
                detail: obj,
            }),
        );
    };

    const subscribe = (cb?: EventListenerOrEventListenerObject) => {
        console.debug("subscribe", cb);
        if (!cb) {
            return;
        }
        emitter.addEventListener("change", cb);
    };
    const describe = (cb?: EventListenerOrEventListenerObject) => {
        console.debug("describe", cb);
        if (!cb) {
            return;
        }
        emitter.removeEventListener("change", cb);
    };

    const obj = { counter: 0, describe, subscribe };
    return new Proxy(obj, {
        get(target, property, receiver) {
            if (!isExists(target, property)) {
                return;
            }
            return Reflect.get(target, property, receiver);
        },

        set(target, property, newValue: (typeof target)[keyof typeof target]) {
            if (!isExists(target, property)) {
                return false;
            }
            if (property === "counter" && isNumber(newValue)) {
                target[property] = newValue;
                emit(target);
            }
            return true;
        },
    });
};

const store = createReactiveStore();

export default store;
