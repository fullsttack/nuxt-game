import {RenderResponse} from "nitropack";

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:response', (response: RenderResponse) => {
        const buildVersion = useRuntimeConfig().public.BUILD_VERSION;
        const cssRegex = /<link rel="stylesheet" href="([^"]+)"/g;
        const jsRegex = /<link rel="modulepreload" as="script" crossorigin href="([^"]+)"/g;
       // let headContent = html.head.join('');
        let match;
        while ((match = cssRegex.exec(response.body))) {
            const cssUrl = match[1];
            if (cssUrl) {
                const updatedUrl = `${cssUrl}?v=${buildVersion}`;
                const updatedCssTag = match[0].replace('<link rel="stylesheet"', '<link rel="stylesheet" rel="preload" as="style"');
                response.body = response.body.replace(match[0], updatedCssTag.replace(cssUrl, updatedUrl));
            }
        }
        while ((match = jsRegex.exec(response.body))) {
            const jsUrl = match[1];
            if (jsUrl) {
                const updatedUrl = `${jsUrl}?v=${buildVersion}`;
                response.body = response.body.replace(jsUrl,updatedUrl);
            }
        }
        delete response.headers['X-Powered-By'];
        //console.log('render:response', response);
    })
    // nitroApp.hooks.hook('render:html', (html, { event }) => {

    // });
})
