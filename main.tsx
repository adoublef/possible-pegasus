import { Hono, html, HtmlEscapedString } from "$deps/hono.ts";
import { bundle } from "$deps/deno_emit.ts";

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

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();
    // NOTE - cache this endpoint
    app.get("/index.js", async (c) => {
        // href - https://github.com/denoland/deno_emit
        const { code } = await bundle(
            new URL("./components/mod.ts", import.meta.url),
            { cacheRoot: Deno.cwd() },
        );
        c.header("content-type", "application/javascript; charset=utf-8");
        return c.newResponse(code);
    });
    // Render home page
    app.get("/", (c) => {
        const { name = "Deno" } = c.req.query();
        return c.html(
            <Content title={`Hello, ${name}`}>
                <HelloWorld name={name} />
            </Content>,
        );
    });
    // TODO - link to settings, about, and another page
    Deno.serve(app.fetch);
}
