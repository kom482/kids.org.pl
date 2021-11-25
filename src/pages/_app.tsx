import Layout from "components/Layout";
import App, { AppContext, AppInitialProps } from "next/app";
import ErrorPage from "next/error";
import React from "react";
import Container from "react-bootstrap/Container";
import CookieConsent from "react-cookie-consent";
import ReactGA from "react-ga";
import config from "services/config";
import { GlobalStyles } from "styles/global";
import { theme } from "styles/theme";
import { getCommonContent } from "utils/get-content-for-pages";

type MyAppBaseProps = AppInitialProps & {
    commonContent: CommonContent;
};

type MyAppErrorProps = {
    error: {
        statusCode: number;
        title?: string;
    };
};

type PartialEither<TLeft, TRight> = (Partial<TLeft> & TRight) | (TLeft & Partial<TRight>);

type MyAppProps = PartialEither<MyAppBaseProps, MyAppErrorProps>;

function guard<T>(value: T): T {
    return value;
}

export default class MyApp extends App<MyAppProps> {
    static async getInitialProps(appContext: AppContext) {
        try {
            const [defaultInitialProps, commonContent] = await Promise.all([
                super.getInitialProps(appContext),
                getCommonContent(),
            ]);
            return guard<MyAppProps>({
                ...defaultInitialProps,
                commonContent,
            }) as any;
        } catch (e) {
            return guard<MyAppProps>({
                error: {
                    statusCode: 404,
                },
            }) as any;
        }
    }

    componentDidMount() {
        if (config.googleAnalyticsId) {
            if (!window.GA_INITIALIZED) {
                ReactGA.initialize(config.googleAnalyticsId);
                window.GA_INITIALIZED = true;
            }
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        if (this.props.error) {
            return <ErrorPage {...this.props.error} />;
        }
        const { commonContent } = this.props;
        return (
            <>
                <CookieConsent
                    buttonText="Rozumiem"
                    acceptOnScroll
                    style={{ background: theme.palette.grayScale.gray500, fontFamily: "intro" }}
                    buttonStyle={{
                        backgroundColor: theme.palette.brand.primary700,
                        color: "white",
                    }}
                >
                    <Container>
                        Korzystamy z plików cookies i umożliwiamy zamieszczanie ich osobom trzecim. Pliki cookie
                        pozwalają na poznanie twoich preferencji na podstawie zachowań w serwisie. Uznajemy, że jeżeli
                        kontynuujesz korzystanie z serwisu, wyrażasz na to zgodę.
                    </Container>
                </CookieConsent>

                <GlobalStyles />
                <Layout items={commonContent}>
                    <Component {...pageProps} />
                </Layout>
            </>
        );
    }
}
