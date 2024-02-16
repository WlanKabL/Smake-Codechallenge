// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        'nuxt-primevue',
        'nuxt-svgo',
    ],
    server: {
        host: '0.0.0.0', // Standardmäßig localhost
    },
    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            apiBase: '/api',
        },
    },
    primevue: {
        importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
        cssLayerOrder: 'primevue, tailwind-base',
        usePrimeVue: true,
        components: {
            // prefix: "Prime",
            include: '*',
        },
        options: {
            unstyled: false,
            inputStyle: 'filled',
        },
    },
    css: [
        'primevue/resources/themes/mdc-dark-deeppurple/theme.css',
        // "primevue/resources/primevue.min.css",
        'primeicons/primeicons.css',
        '~/style.scss',
    ],
    devtools: { enabled: true },
});
