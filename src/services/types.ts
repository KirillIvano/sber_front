export type IHttpService = {
    request: <TData>(url: string, options: RequestInit) => Request
}
