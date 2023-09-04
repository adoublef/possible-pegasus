import { bundle } from "$deps/deno_emit.ts";
import { Handler } from "$deps/hono.ts";

// href - https://github.com/denoland/deno_emit
const { code } = await bundle(
    new URL("./mod.ts", import.meta.url),
    { cacheRoot: Deno.cwd(), allowRemote: true },
);

export function handleCatalyst(): Handler {
    return /* async */ (c) => {
        c.header("content-type", "application/javascript; charset=utf-8");
        return c.newResponse(code);
    };
}