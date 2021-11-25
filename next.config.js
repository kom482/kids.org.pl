const { withPlugins, optional } = require("next-compose-plugins");
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");

require("dotenv").config();

module.exports = withPlugins(
    [
        [
            optional(() => require("next-optimized-images")),
            {
                svgo: {
                    plugins: [{ removeViewBox: false, removeDimensions: false }],
                },
            },
            [PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER],
        ],
        [optional(() => require("next-fonts")), {}, [PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER]],
        [
            optional(() => require("@zeit/next-css")),
            {
                cssModules: true,
            },
            [PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER],
        ],
    ],
    {
        assetPrefix: process.env.NEXT_ASSET_PREFIX,
        crossOrigin: process.env.NEXT_CROSS_ORIGIN,

        webpack: (config, { isServer }) => {
            const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin").default;

            config.resolve = config.resolve || {};
            config.resolve.plugins = config.resolve.plugins || [];
            config.module = config.module || {};
            config.module.rules = config.module.rules || [];
            config.plugins = config.plugins || [];

            config.resolve.plugins.push(new TSConfigPathsPlugin());

            const svgRule = config.module.rules.find(r => r.test instanceof RegExp && r.test.test(".svg"));

            svgRule.oneOf = [
                {
                    resourceQuery: /react/,
                    use: "svg-react-loader",
                    exclude: /node_modules/,
                },
                {
                    ...svgRule,
                },
            ];

            if (!isServer) {
                config.plugins
                    .push
                    // Adding favicons is a semi-automatic process. Generate favicons in specified directory +
                    // copy-paste html links from generated template to _document.tsx
                    // use this when you want to get generated html links
                    // new FaviconsWebpackPlugin({
                    //     logo: "./src/images/favicon.png",
                    //     appName: "Kids",
                    //     outputPath: "/static/icons",
                    //     prefix: "icons/",
                    // }),
                    ();
            }

            return config;
        },
        serverRuntimeConfig: {
            port: Number(process.env.PORT || 3000),
            ssrCacheTTL: process.env.SSR_CACHE_TTL,
            tpayMerchantId: process.env.TPAY_MERCHANT_ID,
            tpayVerificationCode: process.env.TPAY_VERIFICATION_CODE,
            tpayApiKey: process.env.TPAY_API_KEY,
            tpayApiPassword: process.env.TPAY_API_PASSWORD,
            sendgridApiKey: process.env.SENDGRID_API_KEY,
            joinClubEmail: process.env.JOIN_CLUB_EMAIL,
        },
        publicRuntimeConfig: {
            graphqlEndpoint: process.env.PRISMIC_GRAPHQL_ENDPOINT,
            googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
        },
        generateBuildId: async () => {
            return process.env.BUILD_ID || null;
        },
    },
);
