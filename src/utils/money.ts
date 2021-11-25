export const formatMoney = (x: number | undefined | null) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") ?? "0";
};
