export interface LerpArgs {
    fromWidth: number;
    fromValue: number;
    toWidth: number;
    toValue: number;
    cutoffMin?: number;
    cutoffMax?: number;
    width: number;
}
function lerp({
    fromWidth,
    fromValue,
    toWidth,
    toValue,
    cutoffMin = -Infinity,
    cutoffMax = Infinity,
    width,
}: LerpArgs) {
    const slope = (toValue - fromValue) / (toWidth - fromWidth);
    const base = toValue - toWidth * slope;
    const clampedWidth = Math.min(Math.max(width, cutoffMin), cutoffMax);
    return clampedWidth * slope + base;
}
export default lerp;
