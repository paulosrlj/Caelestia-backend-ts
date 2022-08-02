class NotFound extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.code = 404;
  }
}

export default NotFound;
