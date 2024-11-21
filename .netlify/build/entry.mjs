import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BJFPk-XB.mjs';
import './_astro-internal_middleware.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/clients.astro.mjs');
const _page2 = () => import('./pages/contact.astro.mjs');
const _page3 = () => import('./pages/services.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const _page5 = () => import('./pages/_image.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["src/pages/clients.astro", _page1],
    ["src/pages/contact.astro", _page2],
    ["src/pages/services.astro", _page3],
    ["src/pages/index.astro", _page4],
    ["node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic.js", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "a53083bd-603b-4e66-a52e-d8cc682c949f"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
