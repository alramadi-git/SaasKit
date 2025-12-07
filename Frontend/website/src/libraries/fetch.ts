class ClsFetch {
  protected readonly base: string;
  protected readonly headers: NonNullable<RequestInit["headers"]>;

  public constructor();
  public constructor(base: string);
  public constructor(base: string, headers: RequestInit["headers"]);
  public constructor(
    base?: string,
    headers?: NonNullable<RequestInit["headers"]>,
  ) {
    this.base = base ?? "";
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };
  }

  public async get(path: string) {
    return await fetch(path, {
      method: "GET",
      headers: this.headers,
    });
  }

  public async post<tData>(path: string, data: tData) {
    return await fetch(path, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  public async delete(path: string) {
    return await fetch(path, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

export { ClsFetch };
