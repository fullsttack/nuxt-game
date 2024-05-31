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
                // { src:'/vendor/googletag.js'},
                { children: "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
                        "    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
                        "    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=\n" +
                        "    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
                        "})(window,document,'script','dataLayer','GTM-525HWXH');"},
                { src:'/vendor/jquery-3.6.4.slim.min.js', defer:true},
                // { src: '/vendor/datatables/jquery.dataTables.min.js', defer:true},

                // { src:'/vendor/owlcarousel/owl.carouselcustom.min.js',body:true, defer:true}
            ],
            noscript: [
                { children: 'JavaScript is required' },
                {
                    rel: 'stylesheet',
                    href: '/vendor/bootstrap/css/bootstrap.css',
                    defer:true
                }
            ],
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.png'
                },
                // {
                //     rel: 'preload',
                //     as: 'style',
                //     href: '/vendor/bootstrap/css/bootstrap.css',
                //     defer:true,
                //     onload: "this.onload=null;this.rel='stylesheet'"
                // },
                // {
                //     rel: 'preload',
                //     as: 'image',
                //     href: 'https://whatsgaming.net/images/themes/theme4_2024/BuyBox.webp'
                // },
                // {
                //     rel: 'stylesheet',
                //     href: '/vendor/datatables/jquery.dataTables.min.css',
                //     defer:true
                // },
                // {
                //     rel: 'stylesheet',
                //     href: '/vendor/owlcarousel/assets/owl.carousel.min.css'
                // },
                // {
                //     rel: 'stylesheet',
                //     href: '/vendor/owlcarousel/assets/owl.theme.default.min.css'
                // },
                // {
                //     rel: 'stylesheet',
                //     href: '/css/main.css',
                //     defer:true
                // },
                // {
                //     rel: 'stylesheet',
                //     href: '/css/main_rtl.css',
                //     defer:true
                // },
                {
                    rel: 'preload',
                    href: '/fonts/Montserrat/Montserrat-Bold.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: '',
                },
                {
                    rel: 'preload',
                    href: '/fonts/Montserrat/Montserrat-Regular.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: '',
                },
                {
                    rel: 'preload',
                    href: '/fonts/Montserrat/Montserrat-ExtraLight.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: '',
                },
                {
                    rel: 'preload',
                    href: '/fonts/Montserrat/Montserrat-Medium.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: '',
                },
                // {
                //     rel: 'preload',
                //     href: '/fonts/MonaSans/Mona-Sans.woff2',
                //     as: 'font',
                //     type: 'font/woff2',
                //     crossorigin: '',
                // },
                {
                    rel: 'preload',
                    href: '/fonts/Montserrat/Montserrat-BlackItalic.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: '',
                },
                {
                    rel: 'dns-prefetch',
                    href: 'https://www.googletagmanager.com/'
                },
            ]
        }
    },
    css: ['~/public/vendor/bootstrap/css/bootstrap.css','~/assets/style/main.scss','~/public/css/main.css','~/public/css/rtl.css'],
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
            // splitChunks: {
            //     layouts: true,
            //     pages: true,
            //     commons: true,
            // },
            // optimization: {
            //     splitChunks: {
            //         maxSize: 300000
            //     }
            // },
            babel: {
                plugins: [
                    ['@babel/plugin-transform-modules-commonjs', { loose: true }],
                    // ['@babel/plugin-transform-runtime', {corejs: 3}]
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
        /*{
            src: './plugins/GoogleAnalytics.js',
            mode: 'client'
        }*/
        { src: './plugins/socket', mode: 'client' },
    ],
    loading: {
        color: '#c72626',
        height: '8px',
        throttle: 0
    },
    modules: [// '@intlify/nuxt3',
        '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/image-edge', "@nuxt/image",'@nuxtjs/device','nuxt-purgecss'],
    imports: {
        dirs: ['./stores'],
    },
    purgecss: {
        enabled: false, // Always enable purgecss
        safelist: [/^swiper/,/^Toastify/, /^Toastify-/, /^nn-bg-/,/^toastify-/,/^toast-/,'shakeinput','shakeazz','fib','fi',/^fi-/,/^buybox/,/^ct/,'rtl_class',/^hold-image/,/^medal-/,'bigheader',/^col-/,/^offset/,/^p-/,/^m-/,"row","col-md-6","col-md-12"]
        // whitelistPatterns: [/^Toastify/, /^swiper/],
    },
    device: {
        refreshOnResize: true
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    render: {
        // static: {
        //     maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        // },
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