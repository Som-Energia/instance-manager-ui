import {Instance} from "@/domain/Instance";

async function checkResponse(res: Response): Promise<void> {
    if (!res.ok) {
        let message = 'Something went wrong';
        try {
            const errorBody = await res.text();
            const errorJson = JSON.parse(errorBody);
            if (errorJson && errorJson.detail) {
                message = `${errorJson.detail} (${res.status})`;
            }
        } catch (err) {
            throw new Error(message);
        }
        throw new Error(message);
    }
}

export async function readInstances(): Promise<Instance[]> {
    let res;

    try {
        res = await fetch(process.env.api + '/instances/', {mode: 'cors'});
    } catch {
        throw new Error("Unable to connect to server");
    }

    try {
        await checkResponse(res);
    } catch (error) {
        throw error;
    }

    const data = await res.json();
    return data.map((item: any) => ({
        name: item.name,
        repository: item.git_info.repository,
        commit: item.git_info.commit,
        branch: item.git_info.branch,
        pullRequest: item.git_info.pull_request,
        port: item.server_port,
        is_ready: item.is_ready,
        createdAt: new Date(item.created_at)
    }));
}

export const deleteInstance = async (name: string): Promise<void> => {
    let res;

    try {
        res = await fetch(process.env.api + '/instances/' + name, {
            method: 'DELETE',
        });
    } catch {
        throw new Error("Unable to connect to server");
    }

    try {
        await checkResponse(res);
    } catch (error) {
        throw error;
    }
}

export const createInstanceFromPullRequest = async (repository: string, pullRequest: number): Promise<void> => {
    let res;

    try {
        res = await fetch(
            process.env.api
            + "/instances/deploy/pr?repository=" + repository
            + "&pull_request=" + pullRequest
            , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
    } catch {
        throw new Error("Unable to connect to server");
    }

    try {
        await checkResponse(res);
    } catch (error) {
        throw error;
    }
}

export const createInstanceFromBranch = async (repository: string, branch: string, module: string): Promise<void> => {
    let res;

    try {
        res = await fetch(
            process.env.api
            + "/instances/deploy/branch?repository=" + repository
            + "&branch=" + branch
            + "&module=" + module
            , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
    } catch {
        throw new Error("Unable to connect to server");
    }

    try {
        await checkResponse(res);
    } catch (error) {
        throw error;
    }
}

export async function readAllowedRepositories(): Promise<string[]> {
    let res;

    try {
        res = await fetch(process.env.api + "/allowed-repositories/");
    } catch {
        throw new Error("Unable to connect to server");
    }

    try {
        await checkResponse(res);
    } catch (error) {
        throw error;
    }

    return await res.json();
}

export async function readInstanceLogs(name: string): Promise<string> {
    let res;

    try {
        res = await fetch(
            process.env.api
            + "/instances/" + name + "/logs", {mode: 'cors'});
    } catch {
        throw new Error("Unable to connect to server");
    }

    try {
        await checkResponse(res);
    } catch (error) {
        throw error;
    }

    return await res.json();
}