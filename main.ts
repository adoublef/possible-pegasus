// https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
import { Hono, logger } from "$deps/hono.ts";
import { handleBundle, handleClick, handleHome } from "./handlers.tsx";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const app = new Hono();
    app.use("*", logger())
    // NOTE - cache this endpoint
    app.get("/", handleHome())
    app.post("/clicked", handleClick());
    app.get("/index.js", handleBundle("./components/mod.ts"));
    Deno.serve(app.fetch);
}
