import { gql } from "apollo-boost";
import client from "services/apollo/client";

export async function getCommonContent(): Promise<CommonContent> {
    try {
        const data = await fetchData();
        const headerData = data.data.allHeaders.edges[0].node;
        const footerData = data.data.allFooters.edges[0].node;
        const content: CommonContent = {
            header: {
                logo: headerData.logo.url,
                title: headerData.title.url,
                help: headerData.help[0].text,
            },
            footer: {
                logo: footerData.logo.url,
                foundation_name: footerData.foundation_name.url,
                about_foundation: footerData.about_foundation[0].text,
                about_foundation_1: footerData.about_foundation_1[0].text,
                about_foundation_2: footerData.about_foundation_2[0].text,
                about_foundation_3: footerData.about_foundation_3[0].text,
                address: footerData.address[0].text,
                contact: footerData.contact[0].text,
                email: footerData.email[0].text,
                phone_number: footerData.phone_number[0].text,
                facebook_link: footerData.facebook_link?.url,
                instagram_link: data.data.allFooters.edges[0].node.instagram_link?.url,
                linkedin_link: data.data.allFooters.edges[0].node.linkedin_link?.url,
                twitter_link: data.data.allFooters.edges[0].node.twitter_link?.url,
                youtube_link: data.data.allFooters.edges[0].node.youtube_link?.url,
                site_created_by: data.data.allFooters.edges[0].node.site_created_by,
                labels: {
                    created_by: data.data.allFooters.edges[0].node.created_by[0].text,
                },
            },
        };
        return content;
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch commont content");
    }
}

const fetchData = () =>
    client.query({
        query: gql`
            query {
                allHeaders {
                    edges {
                        node {
                            logo
                            title
                            help
                        }
                    }
                }
                allFooters {
                    edges {
                        node {
                            logo
                            foundation_name
                            about_foundation
                            about_foundation_1
                            about_foundation_2
                            about_foundation_3
                            contact
                            email
                            phone_number
                            address
                            facebook_link {
                                __typename
                                ... on _ExternalLink {
                                    url
                                }
                            }
                            instagram_link {
                                __typename
                                ... on _ExternalLink {
                                    url
                                }
                            }
                            youtube_link {
                                __typename
                                ... on _ExternalLink {
                                    url
                                }
                            }
                            twitter_link {
                                __typename
                                ... on _ExternalLink {
                                    url
                                }
                            }
                            linkedin_link {
                                __typename
                                ... on _ExternalLink {
                                    url
                                }
                            }
                            created_by
                            site_created_by {
                                company {
                                    ... on Company {
                                        name
                                        logo
                                        url {
                                            _linkType
                                            ... on _ExternalLink {
                                                url
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
    });
