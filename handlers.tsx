import { Handler } from "$deps/hono.ts";
import { Html,HelloWorld } from "./jsx/mod.ts";

// TODO - link to settings, about, and another page
export function handleHome(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();

        return c.html(
            <Html title={`Hello, ${name}`}>
                <button hx-post={`/clicked?name=${name}`} hx-swap="outerHTML">
                    Click Me
                </button>
            </Html>,
        );
    };
}

export function handleClick(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();

        return c.html(
            <HelloWorld name={name} />
        );
    };
}

