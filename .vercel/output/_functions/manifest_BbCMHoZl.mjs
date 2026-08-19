import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_DhKHfgZ1.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cme6AvBV.mjs';
import 'es-module-lexer';

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
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Projects/Portfolio/","cacheDir":"file:///D:/Projects/Portfolio/node_modules/.astro/","outDir":"file:///D:/Projects/Portfolio/dist/","srcDir":"file:///D:/Projects/Portfolio/src/","publicDir":"file:///D:/Projects/Portfolio/public/","buildClientDir":"file:///D:/Projects/Portfolio/dist/client/","buildServerDir":"file:///D:/Projects/Portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.F427_jfz.css"}],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.F427_jfz.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Projects/Portfolio/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["D:/Projects/Portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/Projects/Portfolio/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["D:/Projects/Portfolio/src/components/sections/SelectedWork.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"pages/projects/_---slug_.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BbCMHoZl.mjs","D:/Projects/Portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DlMGX-sd.mjs","D:\\Projects\\Portfolio\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","D:\\Projects\\Portfolio\\.astro\\content-modules.mjs":"chunks/content-modules_DfvW42bh.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BosNHwYp.mjs","D:/Projects/Portfolio/src/content/projects/hrms.mdx?astroPropagatedAssets":"chunks/hrms_BOUtc6kJ.mjs","D:/Projects/Portfolio/src/content/projects/projects.mdx?astroPropagatedAssets":"chunks/projects_DLvNCEZC.mjs","D:/Projects/Portfolio/src/content/projects/personal-website.mdx?astroPropagatedAssets":"chunks/personal-website_rQkKud1A.mjs","D:/Projects/Portfolio/src/content/projects/smart-shooting-gallery.mdx?astroPropagatedAssets":"chunks/smart-shooting-gallery_CFAeBvzJ.mjs","D:/Projects/Portfolio/src/content/experience/education.mdx?astroPropagatedAssets":"chunks/education_4YtY6H0h.mjs","D:/Projects/Portfolio/src/content/blog/welcome.mdx?astroPropagatedAssets":"chunks/welcome_BmKmCt4z.mjs","D:/Projects/Portfolio/src/content/projects/hrms.mdx":"chunks/hrms_CrqOTlXi.mjs","D:/Projects/Portfolio/src/content/projects/projects.mdx":"chunks/projects_CpNmaHNR.mjs","D:/Projects/Portfolio/src/content/projects/personal-website.mdx":"chunks/personal-website_C75xef7o.mjs","D:/Projects/Portfolio/src/content/projects/smart-shooting-gallery.mdx":"chunks/smart-shooting-gallery_CoKPgGtB.mjs","D:/Projects/Portfolio/src/content/experience/education.mdx":"chunks/education_Cyyzfl3M.mjs","D:/Projects/Portfolio/src/content/blog/welcome.mdx":"chunks/welcome_KSLPV65V.mjs","@/components/interactive/CommandPalette":"_astro/CommandPalette.DoeRyIeG.js","@/components/interactive/ContactForm":"_astro/ContactForm.B10Aq343.js","@/components/interactive/HeroMotion":"_astro/HeroMotion.Cff7O5EF.js","@/components/interactive/SkillsMotion":"_astro/SkillsMotion.Qd8josKu.js","@/components/interactive/TerminalMode":"_astro/TerminalMode.C0k0sqNP.js","@/components/projects/ProjectsGrid":"_astro/ProjectsGrid.B0omRGE6.js","D:/Projects/Portfolio/src/components/layout/NavbarInteractive":"_astro/NavbarInteractive.DMtAHn3K.js","@astrojs/react/client.js":"_astro/client.BlZe1zq3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.F427_jfz.css","/favicon.svg","/resume.pdf","/_astro/arrow-right.CIeHLXHM.js","/_astro/client.BlZe1zq3.js","/_astro/CommandPalette.DoeRyIeG.js","/_astro/ContactForm.B10Aq343.js","/_astro/createLucideIcon.D_8GrN1K.js","/_astro/HeroMotion.Cff7O5EF.js","/_astro/index.qNTDzdXh.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/NavbarInteractive.DMtAHn3K.js","/_astro/ProjectsGrid.B0omRGE6.js","/_astro/react.DOYPFlCX.js","/_astro/SkillsMotion.Qd8josKu.js","/_astro/TerminalMode.C0k0sqNP.js","/_astro/x.BnY7kyro.js","/projects/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"zfxiNKS6jQLWkSAro0jJ6s3vO31kzv22Gz1wFPB7TRg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
