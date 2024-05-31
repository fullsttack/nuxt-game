import {createI18n} from "vue-i18n";
import {api} from '~/composables/api'
import {api_affiliate} from "~/composables/api_affiliate";

export const LANGUAGES = [
    {
        "id": 1,
        "name": "English",
        "locale": "en"
    },
    {
        "id": 2,
        "name": "German",
        "locale": "de"
    },
    {
        "id": 3,
        "name": "Italian",
        "locale": "it"
    },
    {
        "id": 4,
        "name": "French",
        "locale": "fr"
    },
    {
        "id": 5,
        "name": "Spanish",
        "locale": "es"
    },
    {
        "id": 11,
        "name": "Arabic",
        "locale": "ar"
    },
    {
        "id": 9,
        "name": "Turkey",
        "locale": "tr"
    },
    {
        "id": 10,
        "name": "Indonesia",
        "locale": "id"
    },
    {
        "id": 12,
        "name": "Czech",
        "locale": "cs"
    },
    {
        "id": 13,
        "name": "Danish",
        "locale": "da"
    },
    {
        "id": 14,
        "name": "Dutch",
        "locale": "nl"
    },
    {
        "id": 15,
        "name": "Finnish",
        "locale": "fi"
    },
    {
        "id": 16,
        "name": "Japanese",
        "locale": "ja"
    },
    {
        "id": 17,
        "name": "Norwegian",
        "locale": "nb"
    },
    {
        "id": 18,
        "name": "Polish",
        "locale": "pl"
    },
    {
        "id": 19,
        "name": "Portuguese",
        "locale": "pt"
    },
    {
        "id": 20,
        "name": "Slovak",
        "locale": "sk"
    },
    {
        "id": 21,
        "name": "Slovenian",
        "locale": "sl"
    },
    {
        "id": 22,
        "name": "Swedish",
        "locale": "sv"
    }
]
export const LOCALES_AVAILABLE :string[] = LANGUAGES.map(i => i.locale)
export const DEFAULT_LOCALE = 'en'
export const loadedLanguages: string[] = []
const i18n = createI18n({
    locale: '',
    legacy: false,
    messages: {},
    warnHtmlMessage: false,
    lazy: true,
    loadLanguagesAsync: true
});

export function setI18nLanguage(locale: string) {
    i18n.global.locale.value = locale
    api.setLocale(locale)
    api_affiliate.setLocale(locale)
    if (process.client) {
        // @ts-ignore
        document.querySelector('html').setAttribute('lang', locale)
    }
    return locale
}

export async function loadLocaleMessages(locale: string) {
    if (i18n.global.locale.value === locale || loadedLanguages.includes(locale)) {
        return Promise.resolve(setI18nLanguage(locale))
    }

    // const messages = await Promise.resolve(fetch().then(async (res) => {
    //     return await res.json()
    // }))
    const {data} = await useAsyncData(
        locale,
        () => useFetch(`https://api.whatsgaming.net/api/translates/${locale}.json`)
    )
    let messages = data._value.data
    for (let key in messages) {
        if (messages[key].includes('@')) {
            messages[key] = messages[key].replace(/@/g, '___');
        }
    }
    i18n.global.setLocaleMessage(locale, messages)
    loadedLanguages.push(locale)
    return Promise.resolve(setI18nLanguage(locale))
}

export const getLocalePrefix = (locale: string = '') => {
    if (!locale) {
        locale = i18n.global.locale.value
    }
    return locale === DEFAULT_LOCALE ? '' : `/${locale}`
}

export function getLocaleRoutePath(path: string, locale: string = '') {
    if (path[0] !== '/') {
        path = `/${path}`
    }
    //path += '/'
    if (!locale) {
        locale = i18n.global.locale.value
    }
    const re = new RegExp(LOCALES_AVAILABLE.map(i => `\/${i}\/`).join('|'))
    let s = (getLocalePrefix(locale) + path.replace(re, '/')).replace('//', '/')
    if (s[s.length -1] === '/') {
        s = s.slice(0, -1)
    }
    return s
}

export function selectableLanguages() {
    return LANGUAGES.filter(i => i.locale !== i18n.global.locale.value)
}

export function availableLocalePrefixes() {
    return LOCALES_AVAILABLE.filter(i => i !== DEFAULT_LOCALE)
}

export function supportedLanguages() {
    return LANGUAGES;
}

interface StringArray {
    [index: string]: string;
}

export function t(key: string, interpolation: StringArray|null = null): string {
    let translate = i18n.global.t(key)
    if (!(interpolation && typeof interpolation === 'object')) {
        return translate.replace(/___/g, '@');
    }
    for (const i in interpolation) {
        translate = translate.replace(':' + i, interpolation[i])
    }
    return translate.replace(/___/g, '@');
}

export function getLocale(){
    return i18n.global.locale.value;
}

export default defineNuxtPlugin(async ({ vueApp }) => {
    vueApp.use(i18n)
})