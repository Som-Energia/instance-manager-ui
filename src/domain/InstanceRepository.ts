import {Instance} from "@/domain/Instance"

export interface InstanceRepository {
    search(): Promise<Instance[]>;

    delete(instance: Instance): Promise<boolean>;
}