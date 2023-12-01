export class ReactState<T> {
  public state: T;
  public setState?: React.Dispatch<React.SetStateAction<T>>;

  constructor(initialState: T) {
    this.state = initialState;
  }

  public addSetState = (setState: React.Dispatch<React.SetStateAction<T>>) => {
    this.setState = setState;
  };

  public updateState = (state: T): void => {
    if (!this.setState) {
      throw new Error("setState not defined");
    }

    this.setState(state);
    this.state = state;
  };
}
