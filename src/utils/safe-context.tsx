import { createContext, useContext } from "react";

const uninitializedContextSymbol = Symbol("uninitialized_context");

export function createSafeContext<T>(displayName?: string): React.Context<T | typeof uninitializedContextSymbol> {
    const ctx = createContext<T | typeof uninitializedContextSymbol>(uninitializedContextSymbol);
    if (displayName) {
        ctx.displayName = displayName;
    }
    return ctx;
}

export function useSafeContext<T>(context: React.Context<T | typeof uninitializedContextSymbol>): T {
    const value = useContext(context);
    if (value === uninitializedContextSymbol) {
        throw new Error(`Attempted to use an uninitialized context: ${context.displayName}`);
    }

    return value as T;
}

export type SafeConsumerProps<T> = {
    context: React.Context<T | typeof uninitializedContextSymbol>;
    children: (value: T) => React.ReactElement | null;
};

export const SafeConsumer = <T extends any>({ context, children }: SafeConsumerProps<T>) => {
    const value = useSafeContext(context);

    return children(value);
};

export type SafeContext<T> = React.Context<T | typeof uninitializedContextSymbol>;
export type ValueOfContext<T extends SafeContext<any>> = T extends SafeContext<infer V> ? V : never;
