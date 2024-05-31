import {getLocale} from "~/plugins/i18n";

const PLATFORMS = [
    {
        lang: 'en',
        content: [
            {
                name: 'ps4',
                title: 'PS4',
                img: '/images/platform_articles/ps4.webp',
                articles: [
                    {alias: '1667340739049'},
                    {alias: '1667340301616'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Buy FIFA Coins for PS4 - FUT Coin Transfer",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": 8579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            },
            {
                name: 'ps5',
                title: 'PS5',
                img: '/images/platform_articles/ps5.webp',
                articles: [
                    {alias: '1663662308467'},
                    {alias: '1663058817289'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Buy FIFA Coins PS5 - Safe FUT Coins Transfer",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "ratingCount": 6579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            },
            {
                name: 'xbox',
                title: 'XBOX',
                img: '/images/platform_articles/xbox.webp',
                articles: [
                    {alias: '1668830601796'},
                    {alias: '1668829680740'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Buy FIFA Coins for XBOX - get FIFA 23 Coins",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 11579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            },
            {
                name: 'pc',
                title: 'PC',
                img: '/images/platform_articles/pc.webp',
                articles: [
                    {alias: '1672146388212'},
                    {alias: '1672146319216'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Buy FIFA Coins for PC - FUT 23 Coins",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 7619
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "4.49",
                        "highPrice": "199.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            }
        ]
    },{
        lang: 'de',
        content:[
            {
                name: 'ps4',
                title: 'PS4',
                img: '/images/platform_articles/ps4.webp',
                articles: [
                    {alias: '1667340739049'},
                    {alias: '1667340301616'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Kaufe PS4 FIFA Coins - Super einfach mit unser Plattform für PS4 FIFA Münzen",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": 8579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'ps5',
                title: 'PS5',
                img: '/images/platform_articles/ps5.webp',
                articles: [
                    {alias: '1663662308467'},
                    {alias: '1663058817289'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Kaufe XBOX FIFA Coins - 24/7 Direktlieferung von X1 FUT Coins",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "ratingCount": 6579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'xbox',
                title: 'XBOX',
                img: '/images/platform_articles/xbox.webp',
                articles: [
                    {alias: '1668830601796'},
                    {alias: '1668829680740'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Buy FIFA Coins for XBOX - get FIFA 23 Coins",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 11579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }, {
                name: 'pc',
                title: 'PC',
                img: '/images/platform_articles/pc.webp',
                articles: [
                    {alias: '1672146388212'},
                    {alias: '1672146319216'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Kaufe FIFA Coins für den PC - auf WhatsGaming.de",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 7619
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "4.49",
                        "highPrice": "199.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }
        ]
    },
    {
        lang: 'tr',
        content:[
            {
                name: 'ps4',
                title: 'PS4',
                img: '/images/platform_articles/ps4.webp',
                articles: [
                    {alias: '1667340739049'},
                    {alias: '1667340301616'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "PS4 FİFA Coins Satın Al - WhatsGaming PS4 FUT Coins Transfer Platformu",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": 8579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'ps5',
                title: 'PS5',
                img: '/images/platform_articles/ps5.webp',
                articles: [
                    {alias: '1663662308467'},
                    {alias: '1663058817289'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Xbox Fifa Coins satın al - Anında 24/7 X1 FUT Coins",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "ratingCount": 6579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'xbox',
                title: 'XBOX',
                img: '/images/platform_articles/xbox.webp',
                articles: [
                    {alias: '1668830601796'},
                    {alias: '1668829680740'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Buy FIFA Coins for XBOX - get FIFA 23 Coins",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 11579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }, {
                name: 'pc',
                title: 'PC',
                img: '/images/platform_articles/pc.webp',
                articles: [
                    {alias: '1672146388212'},
                    {alias: '1672146319216'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "WhatsGaming.net'te PC FIFA Coins Satın Al",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 7619
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "4.49",
                        "highPrice": "199.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }
        ]
    },
    {
        lang: 'it',
        content:[
            {
                name: 'ps4',
                title: 'PS4',
                img: '/images/platform_articles/ps4.webp',
                articles: [
                    {alias: '1667340739049'},
                    {alias: '1667340301616'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acquista Crediti FIFA per PS4 - Piattaforma di trasferimento crediti WhatsGaming PS4 FUT",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": 8579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            },
            {
                name: 'ps5',
                title: 'PS5',
                img: '/images/platform_articles/ps5.webp',
                articles: [
                    {alias: '1663662308467'},
                    {alias: '1663058817289'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acquista Crediti FIFA PS5 - Piattaforma di trasferimento Crediti FUT di WhatsGaming",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "ratingCount": 6579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'xbox',
                title: 'XBOX',
                img: '/images/platform_articles/xbox.webp',
                articles: [
                    {alias: '1668830601796'},
                    {alias: '1668829680740'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acquista crediti FIFA per Xbox - Crediti istantanei 24/7 X1 FUT 24/7",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 11579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }, {
                name: 'pc',
                title: 'PC',
                img: '/images/platform_articles/pc.webp',
                articles: [
                    {alias: '1672146388212'},
                    {alias: '1672146319216'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acquista Crediti FIFA per PC su WhatsGaming.net",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 7619
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "4.49",
                        "highPrice": "199.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }
        ]
    },
    {
        lang: 'fr',
        content:[
            {
                name: 'ps4',
                title: 'PS4',
                img: '/images/platform_articles/ps4.webp',
                articles: [
                    {alias: '1667340739049'},
                    {alias: '1667340301616'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acheter des Crédits FIFA PS4 - Plateforme Whatsgaming de Tranfert de Crédits FUT PS4",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": 8579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            },
            {
                name: 'ps5',
                title: 'PS5',
                img: '/images/platform_articles/ps5.webp',
                articles: [
                    {alias: '1663662308467'},
                    {alias: '1663058817289'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acheter crédits PS5 FIFA - Plateforme de transfert crédits WhatsGaming FUT",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "ratingCount": 6579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'xbox',
                title: 'XBOX',
                img: '/images/platform_articles/xbox.webp',
                articles: [
                    {alias: '1668830601796'},
                    {alias: '1668829680740'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acheter Crédits FIFA Xbox - Crédits FUT Xb Instantanés",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 11579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }, {
                name: 'pc',
                title: 'PC',
                img: '/images/platform_articles/pc.webp',
                articles: [
                    {alias: '1672146388212'},
                    {alias: '1672146319216'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Acheter Crédits FIFA PC sur Whatsgaming.net",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 7619
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "4.49",
                        "highPrice": "199.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }
        ]
    },
    {
        lang: 'es',
        content:[
            {
                name: 'ps4',
                title: 'PS4',
                img: '/images/platform_articles/ps4.webp',
                articles: [
                    {alias: '1667340739049'},
                    {alias: '1667340301616'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Comprar Monedas FIFA PS4 - Plataforma de Transferencia de Monedas FUT PS4 de WhatsGaming",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": 8579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                },
            },
            {
                name: 'ps5',
                title: 'PS5',
                img: '/images/platform_articles/ps5.webp',
                articles: [
                    {alias: '1663662308467'},
                    {alias: '1663058817289'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Comprar PS5 Monedas FIFA - WhatsGaming FUT Coins Transfer Platform",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "ratingCount": 6579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            },
            {
                name: 'xbox',
                title: 'XBOX',
                img: '/images/platform_articles/xbox.webp',
                articles: [
                    {alias: '1668830601796'},
                    {alias: '1668829680740'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Comprar Monedas FIFA Xbox - Monedas FUT Instantáneas 24/7 X1",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 11579
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "5.49",
                        "highPrice": "219.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }, {
                name: 'pc',
                title: 'PC',
                img: '/images/platform_articles/pc.webp',
                articles: [
                    {alias: '1672146388212'},
                    {alias: '1672146319216'},
                ],
                schema_org_data: {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "mpn": "FUTCoins",
                    "sku": "FUTCoins",
                    "name": "FUT Coins",
                    "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
                    "description": "Comprar Monedas FIFA PC en WhatsGaming.net",
                    "brand": {
                        "@type": "Thing",
                        "name": "FIFA Game"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": 7619
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": "4.49",
                        "highPrice": "199.99",
                        "offerCount": "358000",
                        "availability": "http://schema.org/InStock",
                        "priceCurrency": "EUR",
                        "seller": {
                            "@type": "Organization",
                            "name": "WhatsGaming"
                        }
                    }
                }
            }
        ]
    }
]
const HOMERATING = [
    {
        lang:'en',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FIFACoins",
            "sku": "FIFACoins",
            "name": "FIFA Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Buy FC Coins - Fast & Secure FUT Coins",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 7271
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },
    {
        lang:'de',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FIFACoins",
            "sku": "FIFACoins",
            "name": "FIFA Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Kaufe günstig FC Coins. Schnell & sicher!",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 7271
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },
    {
        lang:'tr',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FIFACoins",
            "sku": "FIFACoins",
            "name": "FIFA Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "WhatsGaming - Hızlı ve Güvenli Ucuz FC Coins Satın Alın!",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 7271
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'it',
        content: {
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FIFACoins",
            "sku": "FIFACoins",
            "name": "FIFA Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "WhatsGaming - Acquista crediti FC a prezzi bassi in modo rapido e sicuro!",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 7271
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'fr',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FIFACoins",
            "sku": "FIFACoins",
            "name": "FIFA Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Whatsgaming - Acheter Crédits FC Pas Cher Rapidement et de Façon Sécurisé!",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 7271
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'es',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FIFACoins",
            "sku": "FIFACoins",
            "name": "FIFA Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "WhatsGaming - ¡Compra Monedas FC Baratas Rápido y Seguro!",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 7271
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    }
]
const BUYCOINSRATING = [
    {
        lang:'en',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FUT Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Cheap FUT 23 Coins Store",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 14579
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'de',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FUT Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Günstiger FUT 23 Coins Shop",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 14579
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'tr',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FUT Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Ucuz FUT 23 Coin Mağazası",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 14579
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'it',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FUT Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Negozio di Crediti FUT 23 a buon mercato",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 14579
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'fr',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FUT Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Site web des Crédits FUT 23 pas cher",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 14579
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'es',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FUT Coins",
            "image": "https://whatsgaming.net/images/webp/buybox_ss.webp",
            "description": "Tienda de Monedas FUT 23 baratas",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 14579
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    }
]
const BUYCOINSRATING_24 = [
    {
        lang:'en',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FC Coins",
            "image": "https://whatsgaming.net/images/fc24/Buy_1.svg",
            "description": "Cheap FC 24 Coins Store",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 6705
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'de',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FC Coins",
            "image": "https://whatsgaming.net/images/fc24/Buy_1.svg",
            "description": "Günstiger FC 24 Coins Shop",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 6705
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'tr',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FC Coins",
            "image": "https://whatsgaming.net/images/fc24/Buy_1.svg",
            "description": "Ucuz FC 24 Coin Mağazası",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 6705
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'it',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FC Coins",
            "image": "https://whatsgaming.net/images/fc24/Buy_1.svg",
            "description": "Negozio di Crediti FC 24 a buon mercato",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 6705
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'fr',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FC Coins",
            "image": "https://whatsgaming.net/images/fc24/Buy_1.svg",
            "description": "Site web des Crédits FC 24 pas cher",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 6705
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    },{
        lang:'es',
        content:{
            "@context": "http://schema.org/",
            "@type": "Product",
            "mpn": "FUTCoins",
            "sku": "FUTCoins",
            "name": "FC Coins",
            "image": "https://whatsgaming.net/images/fc24/Buy_1.svg",
            "description": "Tienda de Monedas FC 24 baratas",
            "brand": {
                "@type": "Thing",
                "name": "FIFA Game"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": 6705
            },
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2.49",
                "highPrice": "219.99",
                "offerCount": "358000",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "EUR",
                "seller": {
                    "@type": "Organization",
                    "name": "WhatsGaming"
                }
            }
        }
    }
]
function getRatingByLang(){
    const locale = getLocale();
    var p = PLATFORMS.find(i => {return i.lang === locale})
    if(p == null){
        p =  PLATFORMS.find(i => {return i.lang === 'en'});
    }
    return p.content;
}
function getHomeRatingByLang(){
    const locale = getLocale();
    var p = HOMERATING.find(i => {return i.lang === locale})
    if(p == null){
        p = HOMERATING.find(i => {return i.lang === 'en'})
    }
    return p.content;
}
function getBuyCoinsRatingByLang(){
    const locale = getLocale();
    var p = BUYCOINSRATING.find(i => {return i.lang === locale})
    if(p == null){
        p = BUYCOINSRATING.find(i => {return i.lang === 'en'})
    }
    return p.content;
}
function getBuyCoins24RatingByLang(){
    const locale = getLocale();
    var p = BUYCOINSRATING_24.find(i => {return i.lang === locale})
    if(p == null){
        p = BUYCOINSRATING_24.find(i => {return i.lang === 'en'})
    }
    return p.content;
}
function genScriptJson(payload){
    return { innerHTML: JSON.stringify(payload), type: 'application/ld+json' };
}
export default useRating => (
    {
        getRatingByLang,genScriptJson,getHomeRatingByLang,getBuyCoinsRatingByLang,getBuyCoins24RatingByLang
    });