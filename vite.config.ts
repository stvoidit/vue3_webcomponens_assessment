import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    experimental: {
        enableNativePlugin: true,
    },
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
    build: {
        target: "esnext",
        minify: false,
        modulePreload: false,
        rolldownOptions: {
            experimental: {
                viteMode: false,
            },
            optimization: {
                inlineConst: true,
            },
        },
    },
});
