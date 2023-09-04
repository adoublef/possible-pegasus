import { Handler } from "$deps/hono.ts";
import { DropDown, HelloWorld, Html } from "./jsx/mod.ts";

// TODO - link to settings, about, and another page
export function handleHome(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();

        return c.html(
            <Html title={`Hello, ${name}`}>
                <button hx-post={`/clicked?name=${name}`} hx-swap="outerHTML">
                    Click Me
                </button>
                <hr />
                <DropDown/>
                <hr />
                <nav>
                    <button
                        aria-expanded={false}
                        aria-controls="options"
                        onclick={`
                        this.setAttribute("aria-expanded", !(this.getAttribute("aria-expanded") === "true" || false));

                        const menu = this.nextElementSibling;
                        menu.hidden = !menu.hidden;`}
                        type="button"
                    >
                        normal
                    </button>
                    <ul id="options" hidden>
                        <li>
                            <a href="#a">a</a>
                        </li>
                        <li>
                            <a href="#b">b</a>
                        </li>
                        <li>
                            <a href="#c">c</a>
                        </li>
                    </ul>
                </nav>
            </Html>,
        );
    };
}

export function handleClick(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();

        return c.html(
            <HelloWorld name={name} />,
        );
    };
}
