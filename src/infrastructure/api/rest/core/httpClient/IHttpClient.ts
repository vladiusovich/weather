export interface IHttpClientOptions {
    baseURL: string;
    timeout: number;
}

export interface IHttpClientResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}

// Adapter
export interface IHttpClient {
    request<T>(config: any): Promise<IHttpClientResponse<T>>;
}
