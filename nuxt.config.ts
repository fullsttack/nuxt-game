// https://nuxt.com/docs/api/configuration/nuxt-config
const date = new Date();
export default defineNuxtConfig({
    generate: {
        manifest: false
    },
    nitro: {
        routeRules: {//swr: 3600
            '/assets/**': { swr: 3600, headers: { 'cache-control': 's-maxage=0' } },
        },
    },
    ssr:true,
    target: 'server',
    filenameHashing: false,
    experimental: {
        asyncContext: true,
        renderJsonPayloads: false,
        inlineSSRStyles: false,
        extractCSS: true,
        defaults: {
            nuxtLink: {
                noPrefetch:false,
                externalRelAttribute:'no-prefetch'
            }
        },
        appManifest:false
    },
    // headers: [
    //     {
    //         key: 'Cache-Control',
    //         value: 'no-store',
    //     },
    // ],
    server: {
        http: {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        }
    },
    runtimeConfig: {
        public:{
            BLOG_BASE_URL: process.env.BLOG_BASE_URL,
            API_URL:process.env.WEBSITE_API,
            APP_URL:process.env.APP_URL,
            BUILD_VERSION:date.getTime()
        }
    },
    app: {
        buildAssetsDir: process.env.NODE_ENV === 'development' ? '' : 'assets',
        head: {
            htmlAttrs: {
                translate: 'no',
                class:'notranslate'
            },
            title: 'Whatsgaming',
            base: {href: process.env.APP_URL},
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            meta: [
                { name: 'viewport' , content:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
                { name: 'title', content: 'Whatsgaming' },
                { name: 'description', content: 'Whatsgaming' },
                { name: 'og:site_name',content: 'Whatsgaming'},
                // { name: 'keywords', content: 'Whatsgaming' },
                { name: 'og:title',content: 'Whatsgaming'},
                { name: 'og:description',content: 'Whatsgaming'},

                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
                { charset: 'utf-8' },
                { name: 'google' ,content: 'notranslate'},
                { name: 'og:type',content: 'website'},
                { name: 'og:image',content: 'nuxt_public/images/WG-Image-TOTS.jpg'},
                { name: 'thumbnail',content: 'nuxt_public/images/WG-Image-TOTS.jpg'},
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'google-site-verification', content: 'yiN3dNysPrMrxAwrdeinYmFsaV0CoBXpCWywlUY4xzI' },
                { name: 'yandex-verification', content: '7fe5f57fb8a64f5a' },
                { name: 'msvalidate.01', content: '85ACACE2626D55A7293FD67CDFD3715E' },
            ],
            script:[
                {
                    type: 'text/partytown',
                    innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-525HWXH');`
                },
                { src:'/vendor/jquery-3.6.4.slim.min.js', defer:true},
            ],
            noscript: [
                {
                    tagPosition: 'bodyOpen',
                    innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-525HWXH" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                },
                { children: 'JavaScript is required' },
            ],
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.png'
                },
            ]
        }
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/style/global/abstracts.scss" as *;'
                }
            }
        },
        build: {
            chunkSizeWarningLimit:100,
            cssCodeSplit:true,
            ssrManifest: true,
            minify:true,
            // extractCSS: true,
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        styles: {
                            name: 'styles',
                            test: /\.(css|vue)$/,
                            chunks: 'all',
                            enforce: true
                        }
                    }
                }
            },
            css: {
                extract: true
            },
            babel: {
                plugins: [
                    ['@babel/plugin-transform-modules-commonjs', { loose: true }],
                ]
            },
            experimental: {
                esmLoader: false,
                inlineSSRStyles: false,
                extractCSS: true,
            },
            extend(config, ext) {

            },
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/chunk/[name]-v4.js',
                    entryFileNames: 'assets/entry/[name]-v4.js',
                    assetFileNames: 'assets/[ext]/[name]-v4.[ext]',
                    manualChunks(id) {
                        if (id.endsWith('.css')) {
                            return 'styles';
                        }
                    }
                }
            },
        },
    },
    plugins: [
        { src: './plugins/socket', mode: 'client' },
    ],
    loading: {
        color: '#c72626',
        height: '8px',
        throttle: 0
    },
    modules: [
    'nuxt-delay-hydration', '@nuxtjs/critters', '@nuxtjs/partytown', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/image-edge', "@nuxt/image", '@nuxtjs/device', 'nuxt-purgecss',  "nuxt-build-cache"],
    delayHydration: {
        mode: 'init',
        debug: process.env.NODE_ENV === 'development'
    },
    critters: {
        config: {

            preload: 'swap',
        },
    },
    partytown: {
        forward: ['dataLayer.push']
    },
    imports: {
        dirs: ['./stores'],
    },
    purgecss: {
        enabled: false,
        safelist: [/^swiper/,/^Toastify/, /^Toastify-/, /^nn-bg-/,/^toastify-/,/^toast-/,'shakeinput','shakeazz','fib','fi',/^fi-/,/^buybox/,/^ct/,'rtl_class',/^hold-image/,/^medal-/,'bigheader',/^col-/,/^offset/,/^p-/,/^m-/,"row","col-md-6","col-md-12"]
    },
    device: {
        refreshOnResize: true
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                // Preload JavaScript and CSS files
                return ['script', 'style'].includes(type)
            },
            shouldPrefetch: (file, type) => {
                // Prefetch other files
                return ['font', 'image'].includes(type)
            }
        }
    },
    image: {
        optimizeImages: true,
        screens: {
            sm: 640,
            md: 1024,
            lg: 1920,
            xl: 2280,
        },
        presets: {
            lazy: {
                modifiers: {
                    format: 'webp',
                    blur: '50'
                }
            },
        }
    },

})
