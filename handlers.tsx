import { Handler, html, HtmlEscapedString } from "$deps/hono.ts";
import { bundle } from "$deps/deno_emit.ts";

export function handleBundle(path: string): Handler {
    return async (c) => {
        // href - https://github.com/denoland/deno_emit
        const { code } = await bundle(
            new URL(path, import.meta.url),
            { cacheRoot: Deno.cwd() },
        );
        c.header("content-type", "application/javascript; charset=utf-8");
        return c.newResponse(code);
    };
}

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
            <span>
                Clicked
            </span>,
        );
    };
}

const Content = (
    { children, title }: {
        children?: HtmlEscapedString | HtmlEscapedString[];
        title?: string;
    },
) => html`
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <script src="https://unpkg.com/htmx.org@1.9.5" defer></script>
    <script type="module" src="/index.js" defer></script>
</head>
<body>
    ${children}
</body>
</html>`;

const HelloWorld = ({ name = "World" }) =>
    html`
<hello-world data-name=${name}>
<template data-shadowroot>
    <button data-action="click:hello-world#greet">
        Hello
    </button>
    <span data-target="hello-world.output">
    </span>
</template>
</hello-world>`;
