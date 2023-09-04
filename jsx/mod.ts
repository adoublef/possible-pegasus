import { HtmlEscapedString,html } from "$deps/hono.ts";

// <link rel="preload" href="/static/htmx.org@1.9.5.min.js" as="script" />
// <link rel="preload" href="/static/index.js" as="script" />

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
    <link rel="preload" crossOrigin href="/static/index.js" as="script" />
    <script src="/static/htmx.org@1.9.5.min.js" defer></script>
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
<hello-world data-name=${name}>
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
export const DropDown = ()=>
    html`
<drop-down role="navigation" aria-label="primary">
<template data-shadowroot>
<button
    aria-expanded="false"
    aria-controls="options"
    data-action="click:drop-down#expand"
    data-target="drop-down.button"
>
    custom
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
</template>
</drop-down>`