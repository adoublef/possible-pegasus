import { Handler } from "$deps/hono.ts";
import { DropDown, HelloWorld, Html, Sawtooth, SimpleGreeting } from "./jsx/mod.ts";

// TODO - link to settings, about, and another page
export function handleHome(): Handler {
    return (c) => {
        const { name = "Deno" } = c.req.query();

        return c.html(
            <Html title={`Hello, ${name}`}>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="#1">1</a>
                            </li>
                            <li>
                                <DropDown textContent="cta">
                                    <li>
                                        <a href="#2">2</a>
                                    </li>
                                    <li>
                                        <a href="#3">3</a>
                                    </li>
                                    <li>
                                        <a href="#4">4</a>
                                    </li>
                                </DropDown>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <hr />
                    <button
                        hx-post={`/clicked?name=${name}`}
                        hx-swap="outerHTML"
                    >
                        Click Me
                    </button>
                    <hr />
                    <Sawtooth />
                    <hr />
                    <SimpleGreeting name={name} />
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
