export type AssistantAction = {
    type: string,
    payload?: Record<string, unknown>,
}

export type AssistantApiInterface = {
    say: (text: string) => void;
    fire: (type: string, action?: AssistantAction) => void;
    subscribe: (action: string, handler: (...args: unknown[]) => void) => void;
    unsubscribe: (action: string, handler: (...args: unknown[]) => void) => void;
}
