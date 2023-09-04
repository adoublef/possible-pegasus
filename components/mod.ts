import { controller, target, attr } from "https://esm.sh/@github/catalyst@1.6.0";

// TODO - use @github/catalyst
// src https://catalyst.rocks/guide/introduction/
@controller
export class HelloWorldElement extends HTMLElement {
    // gets the html element https://catalyst.rocks/guide/decorators/
    @target
    declare output: HTMLElement;

    // TODO - get attribute
    @attr name = "World"

    greet() {
        this.output.textContent = `Hello, ${this.name}!`;
    }
}