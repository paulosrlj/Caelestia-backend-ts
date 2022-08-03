class ServerError extends Error {
  public code: number;

  public errors: Array<Record<string, string>> | undefined;

  constructor(message: string, errors?: Array<Record<string, string>>) {
    super(message);
    this.code = 500;
    this.errors = errors;
  }
}

export default ServerError;
