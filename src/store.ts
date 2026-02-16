
class ChangeEvent<T extends object> extends Event {
    readonly detail: T;
    constructor(name: "change", data: T) {
        super(name, {
            bubbles: true,
            composed: true
        })
        this.detail = data
    }
}


const isExists = <T extends object>(obj: T, key: PropertyKey): key is keyof T => {
    return key in obj
}


 function createReactiveStore(initialData={counter:0}) {

    const emitter = new EventTarget();

    const emit = <T extends object>(obj: T) => {
        emitter.dispatchEvent(new ChangeEvent("change", {
            detail: obj,
            bubbles: true,
            composed: true
        }))
    }

    const subscribe = (cb: EventListenerOrEventListenerObject) => {
        console.debug("subscribe", cb)
        emitter.addEventListener("change", cb)
    }
    const describe = (cb: EventListenerOrEventListenerObject) => {
        console.debug("describe", cb)
        emitter.removeEventListener("change", cb)
    }




    return new Proxy({
        ...initialData,
        subscribe,
        describe
    }, {
        set(target, property, newValue) {
            if (isExists(target, property) && target[property] !== newValue) {
                target[property] = newValue;
                emit(target)
            }
            return true;
        },

        get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
        }
    });
}

const store = createReactiveStore()

export default store
