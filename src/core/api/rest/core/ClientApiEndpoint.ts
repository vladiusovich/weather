export interface ClientApiEndpointOptions {
    baseURL: string;
    timeout: number;
}

export interface ClientApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}

// Adapter
export interface ClientApiEndpoint {
    request<T>(config: any): Promise<ClientApiResponse<T>>;
}
