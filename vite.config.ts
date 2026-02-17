import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: false,
        modulePreload: true,
        rolldownOptions: {
            experimental: {
                viteMode: false,
            },
        },
        target: "esnext",
    },
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
    experimental: {
        enableNativePlugin: true,
    },
    plugins: [],
});
