export type RouteConfig<TOptions extends RequestInit> = {
    url: string;
    options: TOptions;

    query?: Record<string, unknown>;
    cacheMS?: number;
}

