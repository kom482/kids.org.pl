const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin").default;

require("dotenv").config();

module.exports = {
    assetPrefix: process.env.NEXT_ASSET_PREFIX,
    crossOrigin: process.env.NEXT_CROSS_ORIGIN,

    webpack: (config) => {
        config.resolve.plugins.push(new TSConfigPathsPlugin());

        config.module.rules.push({
            test: /\.svg$/i,
            oneOf: [
                {
                    type: "asset",
                    resourceQuery: /url/,
                },
                {
                    issuer: /\.[jt]sx?$/,
                    use: ["@svgr/webpack"],
                },
            ],
        });

        return config;
    },
    serverRuntimeConfig: {
        port: Number(process.env.PORT || 3000),
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
};
