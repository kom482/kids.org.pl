import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { ProjectStats } from "./projectStats";
import { ScheduleItem } from "./scheduleItem";

type ProjectScheduleProps = {
    schedule: ProjectNode["schedule_details"];
    projectStats: ProjectStatistic[];
};

export const ProjectSchedule: React.FunctionComponent<ProjectScheduleProps> = ({ schedule, projectStats }) => {
    const hasStats = projectStats.length > 0;

    return (
        <Container>
            <Header>Harmonogram projektu</Header>
            <Row>
                <Col lg={hasStats ? "7" : undefined}>
                    {schedule &&
                        schedule.map((i, ind) => (
                            <ScheduleItem
                                key={ind}
                                item={i}
                                isFirst={ind === 0}
                                isLast={ind === schedule.length - 1}
                                nextCompleted={
                                    ind !== schedule.length - 1 &&
                                    schedule[ind + 1].completion_status === "zrealizowany"
                                }
                            />
                        ))}
                </Col>
                {hasStats && (
                    <Col lg="5">
                        <ProjectStats stats={projectStats} />
                    </Col>
                )}
            </Row>
        </Container>
    );
};

const Header = styled.h3`
    margin-bottom: ${px2rem(30)};
`;

const Container = styled.div`
    font-family: Inter;
    background-color: ${theme.palette.grayScale.gray100};
    padding: ${px2rem(80)} ${px2rem(95)} ${px2rem(48)};
    @media (max-width: ${breakPoints.sm}) {
        padding: ${px2rem(40)} ${px2rem(30)};
    }
`;
