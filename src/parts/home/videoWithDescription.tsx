import CropCorner from "components/CropCorner";
import Section from "components/Section";
import { PrismicParagraph } from "components/typography";
import YoutubeVideo from "components/YoutubeVideo";
import { RichText } from "prismic-reactjs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

const MainTitle = styled.h1`
    margin: 0 0 ${px2rem(24)} 0;
    > p {
        @media (max-width: ${breakPoints.sm}) {
            font-size: ${px2rem(48)};
            line-height: ${px2rem(48)};
        }
    }
    strong {
        color: ${theme.palette.brand.secondary500};
    }
`;

type VideoWithDescription = {
    changeHospitals: ChangeHospitalsNode;
};

const VideoWithDescription: React.FunctionComponent<VideoWithDescription> = ({ changeHospitals }) => (
    <Section>
        <Row>
            <Col md={7}>
                {changeHospitals.main_title && (
                    <MainTitle>
                        <RichText render={changeHospitals.main_title} />
                    </MainTitle>
                )}
                {changeHospitals.description && <PrismicParagraph text={changeHospitals.description} />}
            </Col>
            {changeHospitals.look_how_to && (
                <Col md={5}>
                    <CropCorner topLeft bottomRight>
                        <YoutubeVideo
                            thumbnail={changeHospitals.look_how_to.url}
                            iframe={changeHospitals.youtube_link?.html}
                            href={changeHospitals.external_link?.url}
                        />
                    </CropCorner>
                </Col>
            )}
        </Row>
    </Section>
);

export default VideoWithDescription;
