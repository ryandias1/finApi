export interface Repository<createT, updateT, responseT> {
    create(entity: createT): Promise<responseT>;
    uptade(id: string, entity: updateT): Promise<responseT>;
    findAll(): Promise<responseT[]>;
    findById(id: string): Promise<responseT | null>;
    delete(id: string): Promise<void>;
}