import { HtmlEscapedString,html } from "$deps/hono.ts";

// <head> - https://htmlhead.dev/
export const Content = (
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
    <link rel="preload" href="/static/htmx.org@1.9.5.min.js" as="script" />
    <link rel="preload" href="/static/index.js" as="script" />
    <script src="/static/htmx.org@1.9.5.min.js" defer></script>
    <script type="module" src="/static/index.js" defer></script>
</head>
<body hx-boost="${true}">
    ${children}
</body>
</html>`;

export const HelloWorld = ({ name = "World" }) =>
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
