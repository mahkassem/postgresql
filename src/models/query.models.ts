export interface PaginatedQuery {
    page?: number;
    limit?: number;
}

export interface PaginatedResult<T> {
    page: number;
    limit: number;
    models: T[];
}