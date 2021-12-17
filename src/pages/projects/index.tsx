import { gql } from "apollo-boost";
import LargeProject from "components/projects/LargeProject";
import ProjectTile from "components/projects/ProjectTile";
import Section from "components/Section";
import SupportsUs from "components/SupportsUs";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import styled from "styled-components";
import StatusFilter from "components/projects/StatusFilter";
import { useRouter } from "next/router";

const Root = styled.div``;

type ProjectsProps = {
    supporters: CompanyNode[];
    mainProjects: ProjectNode[];
    finishedProjects: ProjectNode[];
    ongoingProjects: ProjectNode[];
};

const Projects: NextPage<ProjectsProps> = ({ supporters, mainProjects, finishedProjects, ongoingProjects }) => {
    const router = useRouter();
    const completedOnly = router.query.completed === "true";
    const projects = completedOnly ? finishedProjects : ongoingProjects;

    return (
        <Root>
            <Head>
                <title>Fundacja K.I.D.S. - Projekty</title>
            </Head>

            <Section>
                <StatusFilter status={completedOnly ? "completed" : "in_progress"} />
            </Section>

            {!completedOnly && mainProjects.map((p, i) => (
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
                <Row>
                    {projects.slice(0, 3).map((project, i) => (
                        <ProjectTile key={project._meta?.id ?? i} project={project} />
                    ))}
                </Row>
            </Section>

            <SupportsUs companies={supporters} />

            <Section>
                <Row>
                    {projects.slice(3).map((project, i) => (
                        <ProjectTile key={project._meta?.id ?? i} project={project} />
                    ))}
                </Row>
            </Section>
        </Root>
    );
};

export const getStaticProps = async (ctx) => {
    try {
        const data = await client.query<{
            allFoundations: PrismicNodes<FoundationNode>;
            mainProjects: PrismicNodes<ProjectNode>;
            finishedProjects: PrismicNodes<ProjectNode>;
            ongoingProjects: PrismicNodes<ProjectNode>;
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

                query ProjectsPage {
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
                    finishedProjects: allProjects(where: { main_project_fulltext: "Pozostałe", status_fulltext: "Sukces" }) {
                        edges {
                            node {
                                ...project
                            }
                        }
                    }
                    ongoingProjects: allProjects(where: { main_project_fulltext: "Pozostałe", status_fulltext: "Trwający" }) {
                        edges {
                            node {
                                ...project
                            }
                        }
                    }
                }
            `,
        });

        return {
            props: {
                supporters:
                    data.data.allFoundations.edges[0]?.node.supporters
                        .map(s => s.supporter)
                        .filter((s): s is CompanyNode => !!s) ?? [],
                mainProjects: data.data.mainProjects.edges.map(e => e.node),
                finishedProjects: data.data.finishedProjects.edges.map(e => e.node),
                ongoingProjects: data.data.ongoingProjects.edges.map(e => e.node),
            },
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch common content");
    }
};

export default Projects;
