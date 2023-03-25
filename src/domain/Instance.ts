export interface Instance {
    name: string;
    repository: string;
    branch: string;
    commit: string;
    pullRequest: number;
    connectionUrl: string;
}