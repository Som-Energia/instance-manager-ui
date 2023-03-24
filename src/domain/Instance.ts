export interface Instance {
    name: string;
    repository: string;
    branch: string;
    commit: string;
    pull_request: number;
    connectionUrl: string;
}