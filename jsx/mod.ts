import { html, HtmlEscapedString } from "$deps/hono.ts";

// <head> - https://htmlhead.dev/
export const Html = (
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
    <link rel="preload" href="/static/hyperscript.org@0.9.11.min.js" as="script" />
    <link rel="preload" crossOrigin href="/static/index.js" as="script" />
    <script src="/static/htmx.org@1.9.5.min.js" defer></script>
    <script src="/static/hyperscript.org@0.9.11.min.js" defer></script>
    <script src="/static/index.js" defer type="module"></script>
</head>
<body>
    ${children}
</body>
</html>`;
// NOTE if defined with component, then it imports everything
// GitHub do recommend to define the templates in the DOM
// so this may be ok
export const HelloWorld = ({ name = "World" }) =>
    html`
<hello-world data-name="${name}">
<template data-shadowroot>
    <button data-action="click:hello-world#greet">
        Hello
    </button>
    <span data-target="hello-world.output">
    </span>
</template>
</hello-world>`;
/**
 * DropDown
 */
export const DropDown = (
    { children, role, id = "menu", textContent = "button" }: {
        children?: HtmlEscapedString | HtmlEscapedString[];
        role?: string;
        id?: string;
        textContent?: string
    },
) => html`
<button
    role="${role}"
    type="button"
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls="${id}"
    _="
    on click toggle @hidden on my nextElementSibling then
    if target's @aria-expanded is 'true'
        set target's @aria-expanded to 'false'
    else set target's @aria-expanded to 'true'
    "
>
    ${textContent} <span aria-hidden="true">&#x25be;</span>
</button>
<ul id="${id}" hidden>
    ${children}
</ul>`;
