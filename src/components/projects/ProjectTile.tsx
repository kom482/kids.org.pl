import ImageTile from "components/ImageTile";
import ProgressBar from "components/ProgressBar";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";
import { px2rem } from "styles/utils";
import { formatMoney } from "utils/money";

type ProjectTile = {
    project: ProjectNode;
};

const ProjectTile: React.FunctionComponent<ProjectTile> = ({ project }) => {
    const progress = project.raised_money && project.project_goal ? project.raised_money / project.project_goal : 0;

    return (
        <ProjectTileContainer
            title={project.title ? RichText.asText(project.title) : undefined}
            image={project.main_image?.url ?? ""}
            asHref={project._meta?.uid ? `/projects/${project._meta.uid}` : undefined}
            href={project._meta?.uid ? `/projects/[projectId]` : undefined}
        >
            <ProgressBar
                small
                dark
                progress={progress}
                info={project.raised_money ? `${formatMoney(project.raised_money)} zł zebrane` : undefined}
                secondaryInfo={project.donations_count ? `${project.donations_count} wspierających` : undefined}
            />
        </ProjectTileContainer>
    );
};

const ProjectTileContainer = styled(ImageTile)`
    margin-bottom: ${px2rem(20)};
`;

export default ProjectTile;
