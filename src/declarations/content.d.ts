type CommonContent = {
    header: {
        logo: string;
        title: string;
        help: string;
    };
    footer: {
        logo: string;
        foundation_name: string;
        about_foundation: string;
        about_foundation_1: string;
        about_foundation_2: string;
        about_foundation_3: string;
        contact: string;
        email: string;
        phone_number: string;
        address: string;
        facebook_link?: string;
        instagram_link?: string;
        youtube_link?: string;
        linkedin_link?: string;
        twitter_link?: string;
        site_created_by: { company: CompanyNode }[];
        labels: {
            created_by: string;
        };
    };
};

type PrivacyPolicy = {
    header: string;
    content: PrismicRichText;
};
