import { attr, controller, target } from "../deps/catalyst.ts";

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
export class DropDownElement extends HTMLElement {
    @target
    declare button: HTMLButtonElement;

    expand() {
        const expanded = this.button.getAttribute("aria-expanded") === "true" ||
            false;
        this.button.setAttribute("aria-expanded", (!expanded).toString());

        const menu = this.button.nextElementSibling as HTMLElement | null;
        menu && (menu.hidden = !menu.hidden);
    }
}

@controller
export class SawtoothPulseElement extends HTMLElement {
    play() {
        const sawtooth = new OscillatorNode(audioContext, { type: "sawtooth", frequency: 110 });

        sawtooth.connect(audioContext.destination)
        
        sawtooth.start(audioContext.currentTime)
        sawtooth.stop(audioContext.currentTime + 2)
    }
}
/* global context */
const audioContext = new AudioContext()