import { InstanceRepository } from "@/domain/InstanceRepository"
import { Instance } from "@/domain/Instance"

export class InstanceApiRepository implements InstanceRepository {
    async search(): Promise<Instance[]> {
        return fetch(process.env.api + '/instances/')
            .then((res) => res.json())
            .then((data) => {
                return data.map((item: any) => {
                    return {
                        name: item.name,
                        repository: item.git_info.repository,
                        commit: item.git_info.commit,
                        branch: item.git_info.branch,
                        pull_request: item.git_info.pull_request,
                        connectionUrl: item.connection
                    };
                })
            });
    }
}