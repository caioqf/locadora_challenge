export class ServiceError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super();
  }
}
