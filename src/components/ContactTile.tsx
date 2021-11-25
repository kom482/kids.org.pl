import Link from "next/link";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { SmallLabel } from "./typography";

const Text = styled(SmallLabel)`
    color: inherit;
    margin: 0 0 0 ${px2rem(12)};
`;

const IconContainer = styled.div`
    width: ${px2rem(24)};
    height: ${px2rem(24)};
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
`;

const ContactTileContainer = styled.div`
    display: inline-flex;
    padding: ${px2rem(12)} ${px2rem(16)};
    background-color: ${theme.palette.grayScale.gray100};
    margin: 0 ${px2rem(16)} ${px2rem(16)} 0;
    align-items: center;
    color: ${theme.palette.grayScale.gray500};

    &:hover {
        text-decoration: none;
        background-color: ${theme.palette.brand.primary500};
        color: white;

        ${IconContainer} {
            filter: brightness(1000%);
        }
    }
`;

type ContactTileProps = {
    icon?: string;
    text?: React.ReactNode;
    href?: string;
};

const ContactTile: React.FunctionComponent<ContactTileProps> = ({ icon, text, href }) => {
    const content = (
        <ContactTileContainer as={href ? "a" : undefined}>
            {icon && (
                <IconContainer>
                    <img src={icon} alt="contactIcon" />
                </IconContainer>
            )}
            {text && <Text>{text}</Text>}
        </ContactTileContainer>
    );

    return href ? (
        <Link href={href} passHref>
            {content}
        </Link>
    ) : (
        content
    );
};

export default ContactTile;
