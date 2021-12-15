type PrismicRichText = PrismicRichTextItem[];

type PrismicRichTextItem = {
    type: string;
    text: string;
    spans: PrismicRichTextSpans[];
};

type PrismicImage = {
    dimensions: { width: number; height: number };
    alt: string | null;
    copyright: string | null;
    url: string;
};

type PrismicEmbed = {
    title: string;
    height: number;
    width: number;
    thumbnail_height: number;
    html: string;
    thumbnail_width: number;
    provider_name: string;
    version: string;
    author_url: string;
    type: string;
    author_name: string;
    thumbnail_url: string;
    provider_url: string;
    embed_url: string;
};

type PrismicRichTextSpans = {
    start: numer;
    end: numer;
    type: string;
    data: PrismicSpansLink;
};

type PrismicSpansLink = {
    link_type: "Web";
    url: string;
};

type PrismicLink = { _linkType: "Link.web"; url: string };

type PrismicNodes<TNode> = {
    edges: {
        node: TNode;
    }[];
};

type IdsNode = PrismicNodes<{
    _meta: {
        id: string;
        uid: string;
    };
}>

type PersonNode = MakeOptional<{
    degree: PrismicRichText;
    first_name: PrismicRichText;
    last_name: PrismicRichText;
    description: PrismicRichText;
    thumbnail: PrismicImage;
}>;

type CompanyNode = MakeOptional<{
    name: PrismicRichText;
    logo: PrismicImage;
    url: PrismicLink;
}>;

type ArticleNode = MakeOptional<{
    image: PrismicImage;
    url: PrismicLink;
}>;

type FoundationNode = {
    name?: PrismicRichText | null;
    slogan?: PrismicRichText | null;
    youtube?: PrismicEmbed | null;

    label_mission?: PrismicRichText | null;
    mission: PrismicRichText | null;

    management_title?: PrismicRichText | null;
    managers?: { manager?: PersonNode | null }[] | null;

    council_title?: PrismicRichText | null;
    counselors?: { counselor?: PersonNode | null }[] | null;

    office_title?: PrismicRichText | null;
    office_image?: PrismicImage | null;
    office_description?: PrismicRichText | null;
    office_button_url?: {
        url: string;
    };
    office_button_label?: PrismicRichText | null;

    supporters: MakeOptional<{
        supporter: CompanyNode;
    }>[];
    articles: ArticleNode[];
    main_news: NewsNode;
    newses: MakeOptional<{
        news: NewsNode;
    }>[];
} & HowDoWeHelpFoundationPart;

type HowDoWeHelpFoundationPart = {
    how_do_we_help_title?: PrismicRichText | null;
    how_do_we_help_description?: PrismicRichText | null;
    how_we_help?:
        | {
        image?: PrismicImage | null;
        title?: PrismicRichText | null;
        subtitle?: PrismicRichText | null;
        subtitle_color?: string | null;
        description?: PrismicRichText | null;
    }[]
        | null;
};

type MakeOptional<T> = { [TKey in keyof T]?: T[TKey] | null };

type CompanyNode = {};

type ProjectScheduleItem = {
    date: string;
    target: PrismicRichText;
    completion_status: "zrealizowany" | "niezrealizowany";
};

type ProjectStatistic = MakeOptional<{
    stat_title: PrismicRichText;
    stat_value: number;
    is_money: boolean;
}>;

type ProjectNode = MakeOptional<{
    _meta: {
        id: string;
        uid: string;
    };
    main_project: string;
    status: string;
    title: PrismicRichText;
    short_description: PrismicRichText;
    raised_money: number;
    project_goal: number;
    donations_count: number;
    companies_involved_count: number;
    raised_money_title: PrismicRichText;
    donations_count_title: PrismicRichText;
    show_raised_funds: boolean;
    stats: ProjectStatistic[];

    main_image: PrismicImage;
    partners: MakeOptional<{
        partner: CompanyNode;
    }>[];
    schedule_details: MakeOptional<ProjectScheduleItem>[];

    statistics: MakeOptional<{
        name: PrismicRichText;
        value: PrismicRichText;
    }>[];

    main_description: PrismicRichText;
    planned_spendings_description: PrismicRichText;
    planned_spendings: MakeOptional<{
        name: PrismicRichText;
        value: number;
    }>[];

    projects_leaders_description: PrismicRichText;
    leaders: MakeOptional<{
        leader: PersonNode;
    }>[];
    team_description: PrismicRichText;
    team: MakeOptional<{
        team_member: PersonNode;
    }>[];
}>;

type NewsNode = MakeOptional<{
    _meta: {
        id: string;
        uid: string;
    };
    title: PrismicRichText;
    cta_label: PrismicRichText;
    cta_link: PrismicLink;
    type: string;
    date: string;
    thumbnail: PrismicImage;
    short_description: PrismicRichText;
    main_image: PrismicImage;
    author: PersonNode;
    full_description: PrismicRichText;
}>;

type NewsType = "Wydarzenie" | "Artykuł";

type PartnersNode = MakeOptional<{
    main_image: PrismicImage;
    header: PrismicRichText;
    description: PrismicRichText;

    support_us_header: PrismicRichText;
    companies: MakeOptional<{
        company: CompanyNode;
    }>[];

    how_can_help_header: PrismicRichText;
    how_can_help_description: PrismicRichText;
    how_company_can_help: MakeOptional<{
        how_help_header: PrismicRichText;
        how_help_description: PrismicRichText;
    }>[];

    send_submission: PrismicLink;
}>;

type ChangeHospitalsNode = MakeOptional<{
    main_title: PrismicRichText;
    description: PrismicRichText;
    look_how_to: PrismicImage;
    external_link: PrismicLink;
    youtube_link: PrismicEmbed;
}>;

type JoinClubCardNode = MakeOptional<{
    title: PrismicRichText;
    image: PrismicImage;
    list: MakeOptional<{
        text: PrismicRichText;
    }>[];
    button_text: PrismicRichText;
}>

type JoinClubNode = MakeOptional<{
    image: PrismicImage;
    title: PrismicRichText;
    text: PrismicRichText;
    benefits_title: PrismicRichText;
    benefits: MakeOptional<{
        benefit_image: PrismicImage;
        benefit_title: PrismicRichText;
        benefit_text: PrismicRichText;
    }>[];
    join_title: PrismicRichText;
    join_consent: PrismicRichText;
    join_button: PrismicRichText;
}>;

type ClubMemberNode = MakeOptional<{
    image: PrismicImage;
    name: PrismicRichText;
    description: PrismicRichText;
}>;

type ClubMembersNode = MakeOptional<{
    members: ClubMemberNode[];
}>;

type ClubMembersPage = MakeOptional<{
    image: PrismicImage;
    title: PrismicRichText;
    description: PrismicRichText;
}>;