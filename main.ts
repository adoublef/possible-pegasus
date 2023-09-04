import { Hono, html, raw } from "$deps/hono.ts";
import { bundle } from "$deps/deno_emit.ts";

const { code } = await bundle(
    new URL("./components/mod.ts", import.meta.url),
    { cacheRoot: Deno.cwd() }
);

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();

    app.get("/", (c) => {
        return c.html(html`
            <body>
                <hello-world></hello-world>
                <hello-world name="Rahim"></hello-world>
            </body>
            <script>
                ${raw(code)}
            </script>
        `);
    });

    Deno.serve(app.fetch);
}
