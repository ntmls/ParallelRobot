export interface ICommandHandler<TCommand> {
    execute(command: TCommand): void;
}

export interface IPresenter<TOutput> {
    present(output: TOutput): void;
}