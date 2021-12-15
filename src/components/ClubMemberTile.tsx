import React, { FunctionComponent, useCallback, useState } from "react";
import Truncate from "react-truncate";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Modal } from "react-bootstrap";
import { Tile } from "components/Tiles";
import { px2rem } from "styles/utils";
import { theme } from "styles/theme";
import useSetUnset from "utils/useSetUnset";
import closeIcon from "images/close.svg?url";

type ClubMemberTileProps = {
    member: ClubMemberNode;
}

const ClubMemberTile: FunctionComponent<ClubMemberTileProps> = ({ member: { image, name, description } }) => {
    const [isOpen, setOpen] = useState(false);
    const [show, hide] = useSetUnset(setOpen);

    return (
        <>
            <Tile noPadding onClick={show}>
                <Content>
                    <ImageWrapper>
                        <Image src={image?.url} alt={image?.alt || undefined} />
                    </ImageWrapper>
                    <DescriptionWrapper>
                        <h5>{name && RichText.asText(name)}</h5>
                        <Description>
                            <Truncate lines={4} ellipsis={<span>...</span>}>
                                {description && RichText.asText(description)}
                            </Truncate>
                        </Description>
                    </DescriptionWrapper>
                </Content>
            </Tile>
            <Modal scrollable show={isOpen} onHide={hide}>
                <Modal.Body>
                    <CloseIcon src={closeIcon} onClick={hide} />
                    <ModalContentWrapper>
                        <ModalImage src={image?.url} alt={image?.alt || undefined} />
                        <ModalSubtitle>Klubowicz</ModalSubtitle>
                        <ModalTitle>{name && RichText.asText(name)}</ModalTitle>
                        <Description>{description && RichText.asText(description)}</Description>
                    </ModalContentWrapper>
                </Modal.Body>
            </Modal>
        </>
    );
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    border-bottom: 1px solid ${theme.palette.grayScale.gray200};
`;

const Image = styled.img`
    display: block;
    max-width: 100%;
    max-height: ${px2rem(100)};
    margin: 0.5rem auto;
`;

const DescriptionWrapper = styled.div`
    padding: 1rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`;

const Description = styled.p`
    color: ${theme.palette.grayScale.gray600};
`;

const ModalContentWrapper = styled.div`
    padding: 1rem;
`;

const ModalTitle = styled.h4`
    margin-bottom: 1rem;
`;

const ModalSubtitle = styled.p`
    color: ${theme.palette.grayScale.gray500};
    margin-bottom: 0;
    font-weight: 600;
`;

const ModalImage = styled(Image)`
    margin: 2rem auto;
`;

const CloseIcon = styled.img`
    position: absolute;
    top: ${px2rem(16)};
    right: ${px2rem(16)};
    width: ${px2rem(16)};
    height: ${px2rem(16)};
    cursor: pointer;
`;

export default ClubMemberTile;