import CropCorner from "components/CropCorner";
import Donate, { DonateStickyBar } from "components/Donate";
import { FlexContainer } from "components/flexBlocks";
import ProgressBar from "components/ProgressBar";
import SectionSubHeader from "components/SectionSubHeader";
import { PrismicParagraph } from "components/typography";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row, { RowProps } from "react-bootstrap/Row";
import styled from "styled-components";
import { resetA } from "styles/resets";
import { theme } from "styles/theme";
import { formatMoney } from "utils/money";

type LargeProjectProps = {
    project: ProjectNode;
    asHref?: string;
    href?: string;
    subHeader?: string;
    hideProgressBar?: boolean;
};

const LargeProject: React.FunctionComponent<LargeProjectProps> = ({
    project,
    subHeader,
    hideProgressBar,
    href,
    asHref,
}) => {
    const progress = project.raised_money && project.project_goal ? project.raised_money / project.project_goal : 0;

    const [isHovered, setIsHovered] = useState(false);

    const image = project.main_image ? (
        <ImageContainer topLeft>
            <Image
                src={project.main_image.url}
                alt={project.main_image.alt || undefined}
                mouseOver={!!href}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            />
        </ImageContainer>
    ) : (
        undefined
    );

    const title = (
        <DetailsLink href={href} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
            {project.title && <SectionSubHeader title={subHeader}>{RichText.asText(project.title)}</SectionSubHeader>}

            {project.short_description && <PrismicParagraph text={project.short_description} />}
        </DetailsLink>
    );
    return (
        <>
            <Root mouseOver={isHovered && !!href}>
                <Col lg={6} as={href ? "a" : undefined}>
                    {href ? (
                        <Link href={href} as={asHref} passHref>
                            {image}
                        </Link>
                    ) : (
                        image
                    )}
                </Col>
                <Col lg={6}>
                    <FlexContainer>
                        {href ? (
                            <Link href={href} as={asHref} passHref>
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                        {!hideProgressBar && (
                            <div>
                                <ProgressBar
                                    progress={progress}
                                    info={
                                        project.raised_money ? `${formatMoney(project.raised_money)} zł zebrane` : undefined
                                    }
                                    secondaryInfo={
                                        project.donations_count ? `${project.donations_count} wspierających` : undefined
                                    }
                                />
                            </div>
                        )}
                        {project._meta?.id && project.title && (
                            <Donate projectId={project._meta?.id} projectName={RichText.asText(project.title)} />
                        )}
                    </FlexContainer>
                </Col>
            </Root>
            {project._meta?.id && project.title && (
                <DonateStickyBar projectId={project._meta?.id} projectName={RichText.asText(project.title)} />
            )}
        </>
    );
};

const Root = styled(({ mouseOver, ...props }: React.PropsWithChildren<RowProps & { mouseOver: boolean }>) => (
    <Row {...props} />
))<{
    mouseOver: boolean;
}>`
    box-shadow: ${p => (p.mouseOver ? theme.palette.shadow.primary : "none")};
`;

const Image = styled.img<{ mouseOver: boolean }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: ${p => (p.mouseOver ? "pointer" : "inherit")};
`;

const ImageContainer = styled(CropCorner)`
    height: 100%;
`;

const DetailsLink = styled.a`
    ${resetA}
    text-decoration: none;
    &:hover {
        color: inherit;
        text-decoration: none;
    }
`;

export default LargeProject;
