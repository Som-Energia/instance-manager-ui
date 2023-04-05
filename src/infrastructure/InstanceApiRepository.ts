import {InstanceRepository} from "@/domain/InstanceRepository"
import {Instance} from "@/domain/Instance"
import {InstanceCreatePullRequest} from "@/domain/InstanceCreatePullRequest";

export class InstanceApiRepository implements InstanceRepository {
    async search(): Promise<Instance[]> {
        return fetch(process.env.api + '/instances/', {mode: 'cors'})
            .then((res) => res.json())
            .then((data) => {
                return data.map((item: any) => {
                    return {
                        name: item.name,
                        repository: item.git_info.repository,
                        commit: item.git_info.commit,
                        branch: item.git_info.branch,
                        pullRequest: item.git_info.pull_request,
                        port: item.server_port,
                    };
                })
            });
    }

    async delete(instance: Instance): Promise<boolean> {
        return fetch(process.env.api + '/instances/' + instance.name, {
            method: 'DELETE',
            mode: 'cors'
        })
            .then(response => {
                return response.ok
            })
            .catch(error => {
                return false
            });
    }

    async createPullRequest(instance: InstanceCreatePullRequest): Promise<boolean> {
        return fetch(
            process.env.api
            + "/instances/deploy/pr?repository=" + instance.repository
            + "&pull_request=" + instance.pullRequest
            , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                return response.ok
            })
            .catch(error => {
                return false
            });
    }

    async logsByName(name: string): Promise<string> {
        return fetch(
            process.env.api
            + "/instances/" + name + "/logs", {mode: 'cors'})
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return false
            });
    }
}