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

const Root = styled.div``;

type ProjectsProps = { supporters: CompanyNode[]; mainProjects: ProjectNode[]; projects: ProjectNode[]; completedOnly: boolean; };

const Projects: NextPage<ProjectsProps> = ({ supporters, mainProjects, projects, completedOnly }) => {
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

Projects.getInitialProps = async (ctx) => {
    const completed = ctx.query.completed;

    try {
        const data = await client.query<{
            allFoundations: PrismicNodes<FoundationNode>;
            mainProjects: PrismicNodes<ProjectNode>;
            projects: PrismicNodes<ProjectNode>;
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

                query ProjectsPage($status: String!) {
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
                    projects: allProjects(where: { main_project_fulltext: "Pozostałe", status_fulltext: $status }) {
                        edges {
                            node {
                                ...project
                            }
                        }
                    }
                }
            `,
            variables: {
                status: completed === "true" ? "Sukces" : "Trwający",
            },
        });

        return {
            supporters:
                data.data.allFoundations.edges[0]?.node.supporters
                    .map(s => s.supporter)
                    .filter((s): s is CompanyNode => !!s) ?? [],
            mainProjects: data.data.mainProjects.edges.map(e => e.node),
            projects: data.data.projects.edges.map(e => e.node),
            completedOnly: completed === "true",
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch common content");
    }
};

export default Projects;
