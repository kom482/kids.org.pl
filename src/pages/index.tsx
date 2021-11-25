import { gql } from "apollo-boost";
import ArticleTile from "components/ArticleTile";
import EmphasizedLink from "components/EmphasizedLink";
import LargeNews from "components/LargeNews";
import NewsTile from "components/NewsTile";
import LargeProject from "components/projects/LargeProject";
import ProjectTile from "components/projects/ProjectTile";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import SupportsUs from "components/SupportsUs";
import Tiles from "components/Tiles";
import { NextPage } from "next";
import Head from "next/head";
import VideoWithDescription from "parts/home/videoWithDescription";
import React from "react";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import JoinClubCard from "components/JoinClubCard";
import ClubMemberTile from "components/ClubMemberTile";

const Root = styled.div``;

type HomeProps = {
    articles: ArticleNode[];
    mainProjects: ProjectNode[];
    projects: ProjectNode[];
    completedProjects: ProjectNode[];
    supporters: CompanyNode[];
    mainNews?: NewsNode;
    newses: NewsNode[];
    changeHospitals?: ChangeHospitalsNode;
    clubMembers?: ClubMemberNode[];
    joinClubCard?: JoinClubCardNode;
};

const Home: NextPage<HomeProps> = ({
    articles,
    changeHospitals,
    supporters,
    mainProjects,
    projects,
    completedProjects,
    newses,
    mainNews,
    clubMembers,
    joinClubCard
}) => {
    return (
        <Root>
            <Head>
                <title>Fundacja K.I.D.S. Klub Innowatorów Dziecięcych Szpitali</title>
            </Head>

            {changeHospitals && <VideoWithDescription changeHospitals={changeHospitals} />}

            {mainProjects.map((p, i) => (
                <Section key={p._meta?.id ?? i}>
                    <LargeProject
                        project={p}
                        subHeader="Główny projekt"
                        asHref={p._meta?.uid ? `/projects/${p._meta.uid}` : undefined}
                        href={p._meta?.uid ? `/projects/[projectId]` : undefined}
                    />
                </Section>
            ))}

            <Section>
                <SectionHeader extras={<EmphasizedLink href="/projects">Zobacz wszystkie projekty</EmphasizedLink>}>
                    Trwające projekty
                </SectionHeader>
                <Row>
                    {projects.map((project, i) => (
                        <ProjectTile key={project._meta?.id ?? i} project={project} />
                    ))}
                </Row>
            </Section>

            {completedProjects && (
                <Section>
                    <SectionHeader extras={<EmphasizedLink href="/projects?completed=true">Zobacz wszystkie sukcesy</EmphasizedLink>}>
                        Sukcesy
                    </SectionHeader>
                    <Row>
                        {completedProjects.map((project, i) => (
                            <ProjectTile key={project._meta?.id ?? i} project={project} />
                        ))}
                    </Row>
                </Section>
            )}

            <SupportsUs companies={supporters} />

            <Section>
                <SectionHeader extras={<EmphasizedLink href="/news">zobacz wszystkie aktualności</EmphasizedLink>}>
                    Aktualności
                </SectionHeader>

                {mainNews && <LargeNews news={mainNews} />}

                <Row>
                    {newses.map((news, i) => (
                        <NewsTile news={news} key={i} />
                    ))}
                </Row>
            </Section>

            {clubMembers && (
                <Section>
                    <SectionHeader extras={<EmphasizedLink href="/club-members">Zobacz wszystkich klubowiczów</EmphasizedLink>}>
                        Lista klubowiczów
                    </SectionHeader>

                    <Tiles>
                        {clubMembers.map((member, i) => (
                            <ClubMemberTile key={i} member={member} />
                        ))}
                    </Tiles>
                </Section>
            )}

            <Section>
                <SectionHeader>Piszą o nas</SectionHeader>

                <Tiles>
                    {articles.map((article, i) => (
                        <ArticleTile article={article} key={i} />
                    ))}
                </Tiles>
            </Section>

            {joinClubCard && (
                <Section>
                    <JoinClubCard
                        title={joinClubCard.title && <RichText render={joinClubCard.title} />}
                        image={joinClubCard.image && joinClubCard.image.url || undefined}
                        alt={joinClubCard.image && joinClubCard.image.alt || undefined}
                        listItems={joinClubCard.list?.map(item => item.text ? RichText.asText(item.text) : "") ?? []}
                        buttonText={joinClubCard.button_text && RichText.asText(joinClubCard.button_text) || undefined}
                    />
                </Section>
            )}
        </Root>
    );
};

Home.getInitialProps = async () => {
    try {
        const response = await client.query<{
            allChange_hospitalss: PrismicNodes<ChangeHospitalsNode>;
            allFoundations: PrismicNodes<FoundationNode>;
            mainProjects: PrismicNodes<ProjectNode>;
            projects: PrismicNodes<ProjectNode>;
            completedProjects: PrismicNodes<ProjectNode>;
            clubMembers: PrismicNodes<ClubMembersNode>;
            joinClubCards: PrismicNodes<JoinClubCardNode>;
        }>({
            query: gql`
                fragment project on Project {
                    _meta {
                        id
                        uid
                    }
                    raised_money
                    project_goal
                    main_image
                    title
                    short_description
                }

                fragment news on News {
                    _meta {
                        uid
                    }
                    title
                    type
                    date
                    thumbnail
                    short_description
                }

                {
                    allChange_hospitalss {
                        edges {
                            node {
                                main_title
                                description
                                look_how_to
                                external_link {
                                    _linkType
                                    ... on _ExternalLink {
                                        url
                                    }
                                }
                                youtube_link
                            }
                        }
                    }

                    allFoundations {
                        edges {
                            node {
                                supporters {
                                    supporter {
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
                                articles {
                                    image
                                    url {
                                        _linkType
                                        ... on _ExternalLink {
                                            url
                                        }
                                    }
                                }
                                main_news {
                                    ...news
                                }
                                newses {
                                    news {
                                        ...news
                                    }
                                }
                            }
                        }
                    }

                    mainProjects: allProjects(where: { main_project_fulltext: "Główny" }) {
                        edges {
                            node {
                                ...project
                            }
                        }
                    }
                    projects: allProjects(first: 3, where: { main_project_fulltext: "Pozostałe", status_fulltext: "Trwający" }) {
                        edges {
                            node {
                                ...project
                            }
                        }
                    }
                    completedProjects: allProjects(first: 3, where: { main_project_fulltext: "Pozostałe", status_fulltext: "Sukces" }) {
                        edges {
                            node {
                                ...project
                            }
                        }
                    }

                    clubMembers: allClub_memberss(first: 1) {
                        edges {
                            node {
                                members {
                                    image
                                    name
                                    description
                                }
                            }
                        }
                    }

                    joinClubCards: allJoin_club_cards {
                        edges {
                            node {
                                title
                                image
                                list {
                                    text
                                }
                                button_text
                            }
                        }
                    }

                }
            `,
        });

        const foundationNode = response.data.allFoundations.edges[0]?.node;

        return {
            changeHospitals: response.data.allChange_hospitalss.edges[0]?.node ?? undefined,
            mainNews: foundationNode?.main_news ?? undefined,
            // I can't seem to find a way to do slice with prismic - this might be a problem in the future if there are many articles
            newses: (foundationNode?.newses.map(n => n.news).filter((n): n is NewsNode => !!n) ?? []).splice(0, 3),
            articles: foundationNode?.articles.filter((a): a is ArticleNode => !!a) ?? [],
            supporters: foundationNode?.supporters.map(s => s.supporter).filter((s): s is CompanyNode => !!s) ?? [],
            mainProjects: response.data.mainProjects.edges.map(e => e.node),
            projects: response.data.projects.edges.map(e => e.node),
            completedProjects: response.data.completedProjects.edges.map(e => e.node),
            clubMembers: response.data.clubMembers?.edges[0]?.node.members ?? [],
            joinClubCard: response.data.joinClubCards.edges[0]?.node ?? undefined,
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch common content");
    }
};

export default Home;
