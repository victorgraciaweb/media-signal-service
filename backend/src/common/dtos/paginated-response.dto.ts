export class PaginatedResponseDto<T> {
  constructor(
    public data: T[],
    public count: number,
    public pages: number,
  ) {}
}
