export interface Instance {
    name: string;
    repository: string;
    branch: string;
    commit: string;
    pullRequest: number;
    port: string;
    is_ready: boolean;
}