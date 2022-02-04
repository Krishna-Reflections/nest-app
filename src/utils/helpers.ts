export class ErrorResponseDTO<T> {
  readonly statusCode: number;
  readonly message: string;
  readonly error?: T;

  constructor(error: any) {
    this.statusCode = error.status ?? 500;
    this.message = error.message ?? error;
    // this.error = error;
  }
}
