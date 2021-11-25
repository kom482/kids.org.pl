import closeIcon from "images/close.svg";
import playIcon from "images/home/play.png";
import * as React from "react";
import { useCallback, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { px2rem } from "styles/utils";

const CrossIcon = styled.img`
    position: absolute;
    top: ${px2rem(52)};
    right: ${px2rem(52)};
    width: ${px2rem(32)};
    height: ${px2rem(32)};
    cursor: pointer;
`;

const YoutubeIframe = styled.iframe`
    width: 80%;
    height: 80%;
    border: none;
`;

const customModalStyles = {
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "100%",
        height: "100vh",
        transform: "translate(-50%, -50%)",
        padding: 0,
    },
    overlay: {
        zIndex: 1000,
    },
};

const Gradient = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;
    background: linear-gradient(131.52deg, rgba(237, 33, 125, 0.2) 0%, rgba(237, 33, 125, 0.7) 100%);
    transition: opacity 0.25s cubic-bezier(1, 0, 0, 1);
`;

const VideoContainer = styled.div`
    position: relative;
    cursor: pointer;
    &:hover {
        ${Gradient} {
            opacity: 1;
        }
    }
`;

const Image = styled.img`
    display: block;
    width: 100%;
`;

const Play = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
`;

const IframeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;

    > iframe {
        width: 80% !important;
        height: 80% !important;
        border: none;
    }
`;

type YoutubeVideoProps = {
    thumbnail: string;
    href?: string;
    iframe?: string;
};

const YoutubeVideo: React.FunctionComponent<YoutubeVideoProps> = ({ thumbnail, href, iframe }) => {
    const [isOpen, setIsOpen] = useState(false);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const image = (
        <VideoContainer onClick={open}>
            <Image src={thumbnail} />
            <Play src={playIcon} />
            <Gradient />
        </VideoContainer>
    );

    if (href) {
        return (
            <a href={href} target="_blank">
                {image}
            </a>
        );
    }

    return (
        <>
            {image}
            <Modal isOpen={isOpen} onRequestClose={close} style={customModalStyles}>
                {iframe && <IframeWrapper dangerouslySetInnerHTML={{ __html: iframe }} />}

                <CrossIcon src={closeIcon} onClick={close} />
            </Modal>
        </>
    );
};

export default YoutubeVideo;
