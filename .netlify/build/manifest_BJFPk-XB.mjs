import './chunks/index_ChEAcgVG.mjs';
import { q as NOOP_MIDDLEWARE_HEADER, t as decodeKey } from './chunks/astro/server_Yv2ZYSQT.mjs';
import './chunks/shared_CF51nmSd.mjs';

const NOOP_MIDDLEWARE_FN = (ctx, next) => {
  ctx.request.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return next();
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/hkbertoson/Dev/majic-astro-5/","adapterName":"@astrojs/netlify","routes":[{"file":"clients/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/clients","isIndex":false,"type":"page","pattern":"^\\/clients\\/?$","segments":[[{"content":"clients","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/clients.astro","pathname":"/clients","prerender":true,"fallbackRoutes":[],"distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"http://majicwebdesign.netlify.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/hkbertoson/Dev/majic-astro-5/src/components/atoms/GradientBG.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/index.ts",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/molecules/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/pages/clients.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/clients@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/pages/contact.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/contact@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/pages/services.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/services@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/About.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Contact.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Examples.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Landing.astro",{"propagation":"in-tree","containsHead":false}],["/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Services.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:src/pages/clients@_@astro":"pages/clients.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BJFPk-XB.mjs","\u0000astro:internal-actions":"chunks/_astro_internal-actions_Cuux9g4-.mjs","/Users/hkbertoson/Dev/majic-astro-5/node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/actions/runtime/virtual/get-action.js":"chunks/get-action_DBETCECG.mjs","/Users/hkbertoson/Dev/majic-astro-5/node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/dist/assets/services/sharp.js":"_astro/sharp.BxHzT8LE.js","$/components/molecules/MobilePackages.tsx":"_astro/MobilePackages.D8WFdTwl.js","$/components/molecules/ContactForm.tsx":"_astro/ContactForm.qgqcx3jm.js","$/components/molecules/MobileNav.tsx":"_astro/MobileNav.BeCFTYX2.js","@astrojs/solid-js/client.js":"_astro/client.LtvmYzr_.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/atoms/Stars.astro?astro&type=script&index=0&lang.ts":"_astro/Stars.astro_astro_type_script_index_0_lang.VsNcVPST.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/atoms/GradientBG.astro?astro&type=script&index=0&lang.ts":"_astro/GradientBG.astro_astro_type_script_index_0_lang.Brho8ZSq.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Landing.astro?astro&type=script&index=0&lang.ts":"_astro/Landing.astro_astro_type_script_index_0_lang.IsoS_T0j.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/About.astro?astro&type=script&index=0&lang.ts":"_astro/About.astro_astro_type_script_index_0_lang.CnpCCB3g.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Services.astro?astro&type=script&index=0&lang.ts":"_astro/Services.astro_astro_type_script_index_0_lang.DE9wnioU.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Packages.astro?astro&type=script&index=0&lang.ts":"_astro/Packages.astro_astro_type_script_index_0_lang.BKKV7h3G.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Examples.astro?astro&type=script&index=0&lang.ts":"_astro/Examples.astro_astro_type_script_index_0_lang.CLbARziq.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/sections/Contact.astro?astro&type=script&index=0&lang.ts":"_astro/Contact.astro_astro_type_script_index_0_lang.CD6mgXDB.js","/Users/hkbertoson/Dev/majic-astro-5/src/components/molecules/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.D3Jfcpqp.js","/Users/hkbertoson/Dev/majic-astro-5/node_modules/.pnpm/astro@5.0.0-beta.8_@types+node@22.9.0_jiti@1.21.6_rollup@4.27.2_typescript@5.6.3_yaml@2.6.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.2daoxv0f.js","/Users/hkbertoson/Dev/majic-astro-5/node_modules/.pnpm/astro-scroll-observer@0.5.3/node_modules/astro-scroll-observer/ScrollObserver.astro?astro&type=script&index=0&lang.ts":"_astro/ScrollObserver.astro_astro_type_script_index_0_lang.cfdd-9bY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/hkbertoson/Dev/majic-astro-5/src/components/atoms/Stars.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const a=document.getElementById(\"fading-stars-container\"),o=document.getElementById(\"normal-stars-container\");function n(e,t){return Math.random()*(t-e)+e}function r(e){let t=1;return e<=35&&(t=e/200),t}if(a)for(let e=0;e<100;e++){const t=document.createElement(\"figure\");t.id=\"star\",t.style.top=`${n(0,100)}%`,t.style.left=`${n(0,100)}%`,t.style.animationDuration=`${n(2,5)}s`,t.style.animationDelay=`${n(0,5)}s`;const s=parseInt(t.style.top.split(\".\")[0]);t.style.setProperty(\"--dynamic-opacity\",`${r(s)}`),a.appendChild(t)}if(o)for(let e=0;e<100;e++){const t=document.createElement(\"figure\");t.id=\"star\",t.style.top=`${n(0,100)}%`,t.style.left=`${n(0,100)}%`,t.style.animationDuration=`${n(2,5)}s`,t.style.animationDelay=`${n(0,5)}s`,o.appendChild(t)}});"],["/Users/hkbertoson/Dev/majic-astro-5/src/components/atoms/GradientBG.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const i=document.querySelector(\".interactive\");let e=0,t=0,n=0,r=0;function o(){e+=(n-e)/10,t+=(r-t)/10,i.style.transform=`translate(${Math.round(e)}px, ${Math.round(t)}px)`,requestAnimationFrame(()=>{o()})}window.addEventListener(\"mousemove\",a=>{n=a.clientX,r=a.clientY}),o()});"],["/Users/hkbertoson/Dev/majic-astro-5/node_modules/.pnpm/astro-scroll-observer@0.5.3/node_modules/astro-scroll-observer/ScrollObserver.astro?astro&type=script&index=0&lang.ts","function y(t){var e=typeof t;return t!=null&&(e==\"object\"||e==\"function\")}var B=typeof global==\"object\"&&global&&global.Object===Object&&global,M=typeof self==\"object\"&&self&&self.Object===Object&&self,L=B||M||Function(\"return this\")(),S=function(){return L.Date.now()},F=/\\s/;function U(t){for(var e=t.length;e--&&F.test(t.charAt(e)););return e}var _=/^\\s+/;function D(t){return t&&t.slice(0,U(t)+1).replace(_,\"\")}var h=L.Symbol,W=Object.prototype,G=W.hasOwnProperty,X=W.toString,m=h?h.toStringTag:void 0;function Y(t){var e=G.call(t,m),n=t[m];try{t[m]=void 0;var i=!0}catch{}var o=X.call(t);return i&&(e?t[m]=n:delete t[m]),o}var q=Object.prototype,z=q.toString;function J(t){return z.call(t)}var K=\"[object Null]\",Q=\"[object Undefined]\",I=h?h.toStringTag:void 0;function V(t){return t==null?t===void 0?Q:K:I&&I in Object(t)?Y(t):J(t)}function Z(t){return t!=null&&typeof t==\"object\"}var tt=\"[object Symbol]\";function et(t){return typeof t==\"symbol\"||Z(t)&&V(t)==tt}var $=NaN,nt=/^[-+]0x[0-9a-f]+$/i,rt=/^0b[01]+$/i,it=/^0o[0-7]+$/i,ot=parseInt;function H(t){if(typeof t==\"number\")return t;if(et(t))return $;if(y(t)){var e=typeof t.valueOf==\"function\"?t.valueOf():t;t=y(e)?e+\"\":e}if(typeof t!=\"string\")return t===0?t:+t;t=D(t);var n=rt.test(t);return n||it.test(t)?ot(t.slice(2),n?2:8):nt.test(t)?$:+t}var at=\"Expected a function\",ct=Math.max,ft=Math.min;function st(t,e,n){var i,o,l,s,a,f,d=0,O=!1,u=!1,p=!0;if(typeof t!=\"function\")throw new TypeError(at);e=H(e)||0,y(n)&&(O=!!n.leading,u=\"maxWait\"in n,l=u?ct(H(n.maxWait)||0,e):l,p=\"trailing\"in n?!!n.trailing:p);function v(r){var c=i,g=o;return i=o=void 0,d=r,s=t.apply(g,c),s}function C(r){return d=r,a=setTimeout(T,e),O?v(r):s}function N(r){var c=r-f,g=r-d,w=e-c;return u?ft(w,l-g):w}function E(r){var c=r-f,g=r-d;return f===void 0||c>=e||c<0||u&&g>=l}function T(){var r=S();if(E(r))return x(r);a=setTimeout(T,N(r))}function x(r){return a=void 0,p&&i?v(r):(i=o=void 0,s)}function P(){a!==void 0&&clearTimeout(a),d=0,i=f=o=a=void 0}function A(){return a===void 0?s:x(S())}function j(){var r=S(),c=E(r);if(i=arguments,o=this,f=r,c){if(a===void 0)return C(f);if(u)return clearTimeout(a),a=setTimeout(T,e),v(f)}return a===void 0&&(a=setTimeout(T,e)),s}return j.cancel=P,j.flush=A,j}var lt=\"Expected a function\";function dt(t,e,n){var i=!0,o=!0;if(typeof t!=\"function\")throw new TypeError(lt);return y(n)&&(i=\"leading\"in n?!!n.leading:i,o=\"trailing\"in n?!!n.trailing:o),st(t,e,{leading:i,maxWait:e,trailing:o})}let R=0,k=!1;const ut=document.documentElement;function b(t,e){ut.setAttribute(t,String(e))}function gt(){const t=window.scrollY,e=t-R,n=Math.sign(e)===-1,i=t+window.innerHeight>document.body.offsetHeight-100,o=t<50;(e<-15||e>15)&&(k=n),b(\"data-is-scrolling-up\",k),b(\"data-is-bottom\",i),b(\"data-is-top\",o),R=t}document.addEventListener(\"scroll\",dt(()=>gt(),100),{passive:!0});window.addEventListener(\"load\",()=>{const t=window.innerHeight;document.body.getBoundingClientRect().height/t>2?b(\"data-has-scroll\",!0):b(\"data-has-scroll\",!1)});"]],"assets":["/_astro/logo._wffao5Y.svg","/_astro/mailbox.BCBPR5HX.svg","/_astro/logo-light.abiBW9MN.svg","/_astro/dawnforge-bg.D5wX8LfK.webp","/_astro/tandt-bg.-FVXOKwz.webp","/_astro/bandc-bg.blrm1_TW.webp","/_astro/clients.Q5O5J4OB.css","/favicon.ico","/favicon.svg","/_astro/About.astro_astro_type_script_index_0_lang.CnpCCB3g.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.2daoxv0f.js","/_astro/Contact.astro_astro_type_script_index_0_lang.CD6mgXDB.js","/_astro/ContactForm.qgqcx3jm.js","/_astro/Examples.astro_astro_type_script_index_0_lang.CLbARziq.js","/_astro/Header.astro_astro_type_script_index_0_lang.D3Jfcpqp.js","/_astro/Landing.astro_astro_type_script_index_0_lang.IsoS_T0j.js","/_astro/MobileNav.BeCFTYX2.js","/_astro/MobilePackages.D8WFdTwl.js","/_astro/Packages.astro_astro_type_script_index_0_lang.BKKV7h3G.js","/_astro/Services.astro_astro_type_script_index_0_lang.DE9wnioU.js","/_astro/_commonjsHelpers.C932wzq6.js","/_astro/animate-style.Cr4Y-i43.js","/_astro/client.LtvmYzr_.js","/_astro/clients.Pklew7Aq.js","/_astro/index.BSRz_JDs.js","/_astro/index.JJnJj7vZ.js","/_astro/lottie.BquxVke5.js","/_astro/map.awJmtoE-.js","/_astro/sharp.BxHzT8LE.js","/_astro/stagger.eAK4007x.js","/_astro/store.fXrS1AwD.js","/_astro/supports-waapi.B2-zo84H.js","/_astro/web.DBoj6Yxx.js","/animations/businessPlan.json","/animations/commercePlan.json","/animations/personalPlan.json","/animations/spinner.json","/animations/wand-waving.json","/animations/workingV2.json","/fonts/Calistoga.woff2","/fonts/Inter.woff2","/icons/bag.svg","/icons/camera.svg","/icons/check-icon.svg","/icons/right-arrow-icon.svg","/icons/robot.svg","/icons/scroll.svg","/icons/seo.svg","/icons/wand.svg","/images/gradients.svg","/images/logo-light.svg","/images/logo.svg","/images/og-logo-v2.png","/clients/index.html","/contact/index.html","/services/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"/oW42ikND39iDRYHmONnxh0GBp0TgRCcDLRIRXpb9co=","envGetSecretEnabled":true});

export { manifest };
