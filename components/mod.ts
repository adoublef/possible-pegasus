class HelloWorld extends HTMLElement {
    name;
    static get observedAttributes() {
        return ["name"];
    }

    constructor() {
        super();
        this.name = "World";
    }

    connectedCallback() {
        this.textContent = `Hello ${this.name}!`;
    }

    attributeChangedCallback(
        property: string,
        oldValue: string,
        newValue: string,
    ) {
        if (oldValue === newValue) return;
        // @ts-ignore currently only supports `name`
        this[property] = newValue;
    }
}

customElements.define("hello-world", HelloWorld);
