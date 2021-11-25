export const px2rem = (value: number) => `${value / 16}rem`;

export const num2px = (value: string | number) => (typeof value === "number" ? `${value}px` : value);

export const num2proc = (value: number) => `${value * 100}%`;
