import React from "react";
import SimpleTile from "./SimpleTile";

type CompanyTileProps = {
    company: CompanyNode;
};

const CompanyTile: React.FunctionComponent<CompanyTileProps> = ({ company }) => (
    <SimpleTile
        isExternalHref
        href={(company.url?._linkType === "Link.web" && company.url?.url) || undefined}
        image={company.logo?.url ?? undefined}
        imageAlt={company.logo?.alt ?? undefined}
    />
);

export default CompanyTile;
