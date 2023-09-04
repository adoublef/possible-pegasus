import {
    attr,
    controller,
    target,
} from "../deps/catalyst.ts";

@controller /* https://catalyst.rocks/guide/decorators/ */
export class HelloWorldElement extends HTMLElement {
    @target /* https://catalyst.rocks/guide/targets/ */
    declare output: HTMLElement;

    @attr /* https://catalyst.rocks/guide/attrs/ */
    name = "World";

    greet() {
        this.output.textContent = `Hello, ${this.name}!`;
    }
}

@controller
export class DropDownElement extends HTMLElement {}