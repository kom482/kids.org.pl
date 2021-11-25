import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { px2rem } from "./utils";

// TODO: replace with Section
export const BasicContainer = styled(Container)`
    margin-bottom: ${px2rem(160)};
`;
