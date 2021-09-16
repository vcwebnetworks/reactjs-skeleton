class Storage {
  protected name = '@app:token';

  public getToken() {
    return window.localStorage.getItem(this.name);
  }

  public setToken(token: string) {
    window.localStorage.setItem(this.name, token);
  }

  public removeToken() {
    window.localStorage.removeItem(this.name);
  }
}

const authStorageService = new Storage();
export default authStorageService;
