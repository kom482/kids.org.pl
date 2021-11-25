import Link from "next/link";
import Truncate from "react-truncate";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import CropCorner from "./CropCorner";
import { SmallLabel } from "./typography";

const Title = styled.h5`
    font-family: Inter;
    font-weight: 600;
    color: ${theme.palette.grayScale.gray900};
    margin-top: 0.5rem;
    min-height: 2.5em;
    white-space: pre-wrap;
`;

const TileContainer = styled.div`
    padding-bottom: ${px2rem(10)};

    &:hover {
        box-shadow: 20px 40px 60px rgba(0, 0, 0, 0.08);
        text-decoration: none;

        ${Title} {
            color: ${theme.palette.brand.primary500};
        }
    }
`;

const Image = styled.img`
    width: 100%;
    display: block;
    margin-bottom: ${px2rem(8)};
    max-height: ${px2rem(260)};
    object-fit: cover;
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const Label = styled(SmallLabel)`
    position: absolute;
    z-index: 10;
    top: ${px2rem(8)};
    left: ${px2rem(8)};
    padding: ${px2rem(4)} ${px2rem(8)};
    color: ${theme.palette.grayScale.white};

    background-color: ${theme.palette.brand.secondary500};
`;

type ImageTileProps = {
    title?: string;
    image: string;
    label?: React.ReactNode;
    className?: string;
    href?: string;
    asHref?: string;
};

const ImageTile: React.FunctionComponent<ImageTileProps> = ({
    className,
    title,
    image,
    label,
    children,
    href,
    asHref,
}) => {
    const content = (
        <TileContainer className={`col-md-4${className ? ` ${className}` : ""}`} as={href ? "a" : undefined}>
            <CropCorner bottomRight size={40}>
                <ImageWrapper>
                    <Image src={image} alt="image" />
                    {label && <Label>{label}</Label>}
                </ImageWrapper>
            </CropCorner>
            {title && (
                <Title>
                    <Truncate lines={2} ellipsis={<span>...</span>}>
                        {title}
                    </Truncate>
                </Title>
            )}
            {children}
        </TileContainer>
    );

    return href ? (
        <Link href={href} as={asHref} passHref>
            {content}
        </Link>
    ) : (
        content
    );
};

export default ImageTile;
