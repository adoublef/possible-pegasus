import { Hono, html } from "$deps/hono.ts";
import { bundle } from "$deps/deno_emit.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();
    // NOTE - cache this endpoint
    app.get("/index.js", async (c) => {
        const { code } = await bundle(
            new URL("./components/mod.ts", import.meta.url),
            { cacheRoot: Deno.cwd() },
        );
        c.header("content-type", "application/javascript; charset=utf-8")
        return c.newResponse(code);
    });

    app.get("/", (c) => {
        const { name = "Deno" } = c.req.query();
        return c.html(html`
            <script type="module" src="/index.js" defer></script>
            <body>
                <hello-world data-name="${name}">
                    <template data-shadowroot>
                        <button
                            data-action="click:hello-world#greet"
                        >Hello</button>
                        <span
                            data-target="hello-world.output">
                        </span>
                    </template>
                </hello-world>
            </body>
        `);
    });

    // TODO - link to settings, about, and another page
    Deno.serve(app.fetch);
}
