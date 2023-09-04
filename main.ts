// https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
import { Hono, logger, serveStatic } from "$deps/hono.ts";
import { customElements } from "$components/handlers.ts";
import { handleClick, handleHome } from "./handlers.tsx";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();
    app.use("*", logger());
    // NOTE - cache this endpoint
    app.get("/", handleHome());
    app.post("/clicked", handleClick());
    app.get("/static/index.js", customElements());
    // serveStatic https://hono.dev/getting-started/nodejs#serve-static-files
    app.get("/static/*", serveStatic({ root: "/" }));
    Deno.serve(app.fetch);
}
