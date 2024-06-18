export default function addQueryParamPlugin() {
    return {
        name: 'add-query-param-plugin',
        config(config) {
            return {
                resolve: {
                    alias: {
                        // Add a query parameter to asset filenames
                        '/@assets/': '/@assets?v=1/',
                    },
                },
            };
        },
    };
}