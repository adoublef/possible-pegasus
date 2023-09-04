import {
    attr,
    controller,
    target,
} from "$deps/catalyst.ts";

// TODO - use @github/catalyst
// decorators - https://catalyst.rocks/guide/decorators/
@controller
export class HelloWorldElement extends HTMLElement {
    // @target - https://catalyst.rocks/guide/targets/
    @target
    declare output: HTMLElement;

    // @attr - https://catalyst.rocks/guide/attrs/
    @attr
    name = "World";

    greet() {
        this.output.textContent = `Hello, ${this.name}!`;
    }
}