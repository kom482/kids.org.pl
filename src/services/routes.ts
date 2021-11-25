export const routes = {
    header: [
        {
            name: "Strona główna",
            to: "/",
        },
        {
            name: "O fundacji",
            to: "/about",
        },
        {
            name: "Projekty",
            to: "/projects",
        },
        {
            name: "Aktualności",
            to: "/news",
        },
    ],
    helpButton: [
        {
            name: "Zostań wolontariuszem",
            to: "https://docs.google.com/forms/d/e/1FAIpQLSfW7t14b4adoIYPqjCKxkmX8OTkMrIbMtvTOudEEDRoLpuugg/viewform",
            external: true,
        },
        {
            name: "Zostań sponsorem",
            to: "/partners",
        },
    ],
    footer: {
        privacyPolicy: {
            name: "Polityka prywatności",
            to: "/privacy-policy",
        },
    },
    other: {
        partners: {
            name: "Partnerzy",
            to: "/partners",
        },
    },
};
