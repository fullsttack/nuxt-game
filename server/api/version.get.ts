export default defineEventHandler(async ({req}) => {
    return {
        'version':useRuntimeConfig().public.BUILD_VERSION,
    };
})