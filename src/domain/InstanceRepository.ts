import {Instance} from "@/domain/Instance"
import {InstanceCreatePullRequest} from "@/domain/InstanceCreatePullRequest";

export interface InstanceRepository {
    search(): Promise<Instance[]>;

    delete(instance: Instance): Promise<boolean>;

    createPullRequest(instance: InstanceCreatePullRequest): Promise<boolean>;

    logsByName(name: string): Promise<string>;
}