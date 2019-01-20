export interface ICommand<TRequest> {
    execute(request: TRequest): void;
}

export interface IPresenter<TResult> {
    present(result: TResult): void;
}