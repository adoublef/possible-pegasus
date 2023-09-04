// https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
import { Hono, logger } from "$deps/hono.ts";
import { handleBundle, handleHome } from "./handlers.tsx";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();
    app.use("*", logger())
    // NOTE - cache this endpoint
    app.get("/index.js", handleBundle("./components/mod.ts"));
    app.get("/", handleHome());
    Deno.serve(app.fetch);
}
