import {LOCALES_AVAILABLE, getLocaleRoutePath, DEFAULT_LOCALE, getLocale} from '~/plugins/i18n'
import {useUserStore} from "~/stores/userStore";
export function isValidEmail(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
        return false;
    }
    return true;
}
export function getMetaAlternateLinks(path) {
    let links = []
    var _url = '';
    if(path.length === 3 ){
        _url = path;
    }
    else if (path.length === 1){
        _url = '';
    }else {
        _url = getLocaleRoutePath(path);
    }
    links.push({
        rel: 'canonical',
        href: 'https://whatsgaming.net' + _url,
    })
    LOCALES_AVAILABLE.map(lang => {
        if(path.length === 3 ){
            _url = (lang==='en' ? '' : '/' + lang);
        }
        else if (path.length === 1){
            _url = (lang==='en' ? '' : '/' +lang);
        }else{
            _url = getLocaleRoutePath(path, lang);
        }
        links.push({
            rel: 'alternate',
            href: 'https://whatsgaming.net' + _url,
            hreflang: lang
        })
        if(lang === 'en'){
            links.push({
                rel: 'alternate',
                href: 'https://whatsgaming.net' + _url,
                hreflang: 'x-default'
            })
        }
    })
    return links
}

export function makeMeta(path, title, description, keywords = '', no_index = false) {
    let meta =  {
        title,
        meta: [
            { name: 'title', content: title },
            { name: 'og:title',content: title },
            { name: 'description', content: description },
            { name: 'og:description',content: description },
            { name: 'og:url', content: 'https://whatsgaming.net' + path },
        ],
        link: [
            ...getMetaAlternateLinks(path)
        ],
    }
    if (keywords) {
        meta.meta.push({ name: 'keywords', content: keywords })
    }
    if (no_index) {
        meta.meta.push({name: 'robots', content: 'noindex'}, {name: 'googlebot', content: 'noindex'})
    }
    return meta
}
export function makeBreadcrumbsSchemaOrgData(items) {
    let data =  {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
    }
    data.itemListElement = items.map((i, key) => {
        return {
            "@type": "ListItem",
            "position": key+1,
            "name": i.title,
            "item": 'https://whatsgaming.net' + i.path.replace(/\/$/, "")
        }
    })
    return data
}

export function removeHtml(str){
    if (!str) {
        return ''
    }
    return str.replace(/<[^>]*>/g, '');
}
export function removeStyleAttribute(str){
    return str.replace(/style\s*=\s*(['"])[^'"]*\1/gi, '');
}
export function getWGSupportMsg(){
    const userstore = useUserStore();
    const route = useRoute();
    const mail = userstore.getEmail;
    var msg= "Hello, I need your support. My customer eMail is " + (mail === '' ? 'N-A':mail);
    return msg.replace(" ","%20") + (route.params.lang === undefined ? '' : "&l=" + route.params.lang);
}
export function urlwithLocal(path){
    const locale = getLocale();
    if(path === ''){
        return (locale === 'en' ? '/' : '/' + locale);
    }
    return (locale === 'en' ? '/' : "/" + locale + "/") + path;
}
export function urlwithLocalhash(path){
    const locale = getLocale();
    return '/' + (locale === 'en' ? '' : locale  + "/") + path;
}
export function isRtl() {
    const locale = getLocale();
    return locale === 'ar';
}
export function getLang(){
    return getLocale();
}
export function fixContentLinks(content){
    const locale = getLocale();
    const domainPattern = /<a\s+href="(https?:\/\/)?(www\.)?whatsgaming\.net(\/[^"]*)?">/g;
    //const newPath = '<a href="'+ (locale === 'en' ? '' : locale) + '$3">';
    let newPath = '<a href="$3">';
    newPath = newPath.replace(locale + "/" + locale + "/",locale + "/");
    return content.replace(domainPattern, newPath);
}
export default useUtils => ({
    removeHtml,
    isValidEmail,
    getMetaAlternateLinks,
    makeMeta,
    getWGSupportMsg,
    urlwithLocal,
    removeStyleAttribute,
    urlwithLocalhash,
    getLang,
    isRtl,
    fixContentLinks
});