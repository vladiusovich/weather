
export interface SeederOptionsType {
    force?: boolean;
};

export abstract class BaseSeederType {
    name: string = 'unnamed';
    // eslint-disable-next-line class-methods-use-this
    run(options: SeederOptionsType): Promise<void> {
        throw 'implement the method'
    }
}