export function hexToRGBA(color, opacity) {
    const r = "0x" + color[1] + color[2];
    const g = "0x" + color[3] + color[4];
    const b = "0x" + color[5] + color[6];

    return "rgba(" + +r + "," + +g + "," + +b + "," + opacity + ")";
}
