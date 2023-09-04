import { Hono, html } from "$deps/hono.ts";
import { bundle } from "$deps/deno_emit.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();

    app.get("/index.js", async (c) => {
        const { code } = await bundle(
            new URL("./components/mod.ts", import.meta.url),
            { cacheRoot: Deno.cwd() },
        );
        return c.text(code);
    });

    app.get("/:name?", (c) => {
        const name = c.req.param("name") || "Deno" 
        return c.html(html`
            <script src="/index.js" defer></script>
            <body>
                <hello-world name="${name}"></hello-world>
            </body>
        `);
    });

    Deno.serve(app.fetch);
}
