import { Handler } from "$deps/hono.ts";
import { Content,HelloWorld } from "./jsx/mod.ts";

// TODO - link to settings, about, and another page
export function handleHome(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();
        return c.html(
            <Content title={`Hello, ${name}`}>
                <HelloWorld name={name} />
                <button hx-post="/clicked" hx-swap="outerHTML">
                    Click Me
                </button>
            </Content>,
        );
    };
}

export function handleClick(): Handler {
    return (c) => {
        return c.html(
            <div>
                Clicked
            </div>,
        );
    };
}

