import { Dispatch, SetStateAction, useCallback } from "react";

export default function useSetUnset(set: Dispatch<SetStateAction<boolean>>) {
    return [useCallback(() => set(true), [set]), useCallback(() => set(false), [set])] as const;
}