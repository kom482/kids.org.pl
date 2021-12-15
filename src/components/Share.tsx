import React, { FunctionComponent, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import fb from "images/share/fb.svg?url";
import linkedIn from "images/share/linkedin.svg?url";
import twitter from "images/share/twitter.svg?url";
import mail from "images/share/mail.svg?url";

const Root = styled.div`
    width: 100%;
`;
const Header = styled.h4`
    margin-bottom: 2rem;
    text-align: center;
`;

const ShareIcons = styled.div`
    display: flex;
    justify-content: center;

    > :not(:first-child) {
        margin-left: 1rem;
    }
`;

type ShareIconLinkProps = {
    alt: string;
    icon: string;
    url: string;
}

const ShareIconLink: FunctionComponent<ShareIconLinkProps> = ({ alt, icon, url }) => (
    <a href={url} target={"_blank"}>
        <img alt={alt} src={icon} />
    </a>
);

const Share: FunctionComponent = () => {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        setUrl(window.location.href);
    });

    if (!url) {
        return null;
    }

    return (
        <Root>
            <Header>Udostępnij</Header>
            <ShareIcons>
                <ShareIconLink alt={"Facebook"} icon={fb} url={`https://www.facebook.com/sharer/u=sharer.php?${url}`} />
                <ShareIconLink alt={"LinkedIn"} icon={linkedIn} url={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} />
                <ShareIconLink alt={"Twitter"} icon={twitter} url={`https://twitter.com/intent/tweet?url=${url}`} />
                <ShareIconLink alt={"Mail"} icon={mail} url={`mailto:?body=${url}`} />
            </ShareIcons>
        </Root>
    );
}

export default Share;
