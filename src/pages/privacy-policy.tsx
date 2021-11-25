import { gql } from "apollo-boost";
import { NextPage } from "next";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import { BasicContainer } from "styles/layout";

const PrivacyPolicy: NextPage<PrivacyPolicy> = props => {
    return (
        <BasicContainer>
            <Head>
                <title>Fundacja K.I.D.S. - Polityka Prywatności</title>
            </Head>
            <Row>
                <Col>
                    <h2>{props.header}</h2>
                    <RichText render={props.content} />
                </Col>
            </Row>
        </BasicContainer>
    );
};

PrivacyPolicy.getInitialProps = async () => {
    try {
        const data = await fetchData();
        const privacyPolicy = data.data.allPrivacy_policys.edges[0].node;
        return {
            header: privacyPolicy.header[0].text,
            content: privacyPolicy.privacy_policy,
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch commont content");
    }
};

const fetchData = () =>
    client.query({
        query: gql`
            query {
                allPrivacy_policys {
                    edges {
                        node {
                            header
                            privacy_policy
                        }
                    }
                }
            }
        `,
    });

export default PrivacyPolicy;
