import { defineConfig } from "vite";

export default defineConfig({
    build: {
        cssMinify: "lightningcss",
        minify: false,
        modulePreload: true,
        rolldownOptions: {
            experimental: {
                viteMode: true,
            },
        },
        target: "esnext",
    },
    css: {
        lightningcss: {
            cssModules: true,
            nonStandard: {
                deepSelectorCombinator: true,
            },
        },
        transformer: "lightningcss",
    },
    experimental: {
        enableNativePlugin: true,
    },
    plugins: [],
});
