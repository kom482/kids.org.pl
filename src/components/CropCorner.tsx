import styled, { css } from "styled-components";
import { num2px } from "styles/utils";

type CropCornerProps = {
    topLeft?: boolean;
    topRight?: boolean;
    bottomRight?: boolean;
    bottomLeft?: boolean;
    size?: number;
};

const CropCorner = styled.div<CropCornerProps>(p => {
    const size = num2px(p.size || 72);
    const topleft = p.topLeft ? `0% ${size}, ${size} 0%` : "0% 0%";
    const topright = p.topRight ? `calc(100% - ${size}) 0%, 100% ${size}` : "100% 0%";
    const bottomright = p.bottomRight ? `100% calc(100% - ${size}), calc(100% - ${size}) 100%` : "100% 100%";
    const bottomleft = p.bottomLeft ? `${size} 100%, 0% calc(100% - ${size})` : "0% 100%";

    return css`
        clip-path: polygon(${topleft}, ${topright}, ${bottomright}, ${bottomleft});
        max-width: 100%;
    `;
});

export default CropCorner;
