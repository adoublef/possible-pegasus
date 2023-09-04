import { Handler, html, HtmlEscapedString } from "$deps/hono.ts";

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

// <head> - https://htmlhead.dev/
const Content = (
    { children, title }: {
        children?: HtmlEscapedString | HtmlEscapedString[];
        title?: string;
    },
) => html`
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <script src="/static/htmx.org@1.9.5.min.js" defer></script>
    <script type="module" src="/static/index.js" defer></script>
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