import { Handler } from "$deps/hono.ts";
import { DropDown, HelloWorld, Html } from "./jsx/mod.ts";

// TODO - link to settings, about, and another page
export function handleHome(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();

        return c.html(
            <Html title={`Hello, ${name}`}>
                <header>
                    <nav>
                        <a href="/">Home</a>
                        <DropDown />
                    </nav>
                </header>
                <main>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <button
                        hx-post={`/clicked?name=${name}`}
                        hx-swap="outerHTML"
                    >
                        Click Me
                    </button>
                </main>
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
