class InvalidToken extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.code = 401;
  }
}

export default InvalidToken;
