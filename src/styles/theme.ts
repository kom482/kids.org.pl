export const theme = {
    spacing: {
        sm: "0.2rem",
        md: "0.4rem",
        lg: "1rem",
        unit: (n: number) => `calc(${n} * 0.2rem)`,
    },
    maxContentWidth: "1366px",
    palette: {
        brand: {
            primary500: "#ED217D",
            primary700: "#D3005F",
            secondary500: "#94268F",
            brandBlue500: "#448ECC",
            brandOrange: "#364FD4",
        },
        buttons: {
            hover: "#E10E6D",
            active: "#CC005C",
        },
        grayScale: {
            black: "#000000",
            gray900: "#263140",
            gray800: "#3E4959",
            gray700: "#5C6573",
            gray600: "#6D7685",
            gray500: "#828B99",
            gray400: "#B8C1CC",
            gray300: "#CED3D9",
            gray200: "#E6EAED",
            gray100: "#F2F5F7",
            white: "#FFFFFF",
        },
        alerts: {
            error: "#F13E11",
            success: "#93D505",
            info: "#14C2E8",
            alert: "#FFC24B",
        },
        gradients: {
            primary: "linear-gradient(90deg, #5E7FF2 0%, #364FD4 100%)",
        },
        shadow: {
            primary: "8px 30px 40px rgba(237, 33, 125, 0.1)",
        },
        extra: {
            orange500: "#F7941D",
        },
    },
    transitions: {
        default: "0.5s ease",
    },
};

export type Theme = Readonly<typeof theme>;
