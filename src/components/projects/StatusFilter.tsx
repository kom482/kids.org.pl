import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Link from "next/link";

const Title = styled.h2`
    margin-bottom: 2rem;
`;

const StatusWrapper = styled.div`
    display: flex;

    > :not(:first-child) {
        margin-left: 1rem;
    }
`;

const Status = styled.a<{ active?: boolean }>`
    padding: 1rem 1.5rem;
    text-decoration: none;
    background: ${p => p.active ? theme.palette.brand.primary500 : "white"};
    color: ${p => p.active ? "white" : theme.palette.brand.primary500};
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 2px;

    &:hover {
        color: ${p => p.active ? "white" : theme.palette.brand.primary500};
        text-decoration: none;
    }
`;

type StatusFilterProps = {
    status: "in_progress" | "completed";
};

const StatusFilter: FunctionComponent<StatusFilterProps> = ({ status }) => {
    return (
        <div>
            <Title>Projekty</Title>
            <StatusWrapper>
                <Link href={"/projects"} passHref>
                    <Status active={status === "in_progress"}>Trwające projekty</Status>
                </Link>
                <Link href={"/projects?completed=true"} passHref>
                    <Status active={status === "completed"}>Sukcesy</Status>
                </Link>

            </StatusWrapper>
        </div>
    );
}

export default StatusFilter;