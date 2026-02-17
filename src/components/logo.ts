import classes from "./logo.module.css";

const createAnchor = (attrs: Partial<Record<"href" | "target", string>>) => {
    const el = document.createElement("a");
    el.setAttribute("target", "_blank");
    const keys = ["href", "target"] as const;
    for (const k of keys) {
        const value = attrs[k] ?? "";
        if (value !== "") {
            el.setAttribute(k, value);
        }
    }
    return el;
};

const createImg = (attrs: Partial<Record<"src" | "alt", string>>) => {
    const el = document.createElement("img");
    el.className = classes.logo;
    const keys = ["src", "alt"] as const;
    for (const k of keys) {
        const value = attrs[k] ?? "";
        if (value !== "") {
            el.setAttribute(k, value);
        }
    }
    return el;
};

class LogoLink extends HTMLElement {
    private _anchorElement: HTMLAnchorElement;

    static get observedAttributes(): string[] {
        return ["alt", "src", "href", "target"] as const;
    }

    connectedCallback(): void {
        console.debug({ connectedCallback: LogoLink.name }, this);
        this.append(this._anchorElement);
    }

    constructor() {
        super();
        const attributes = Object.fromEntries(
            LogoLink.observedAttributes.map((k) => [k, this.getAttribute(k)]),
        );
        this._anchorElement = createAnchor(attributes);
        this._anchorElement.append(createImg(attributes));
    }
}

export default LogoLink;
