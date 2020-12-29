import Storage from "./Storage";

class AuthStorage extends Storage {
  get loggedIn() {
    return !!this.value && !!this.value.token;
  }

  get token() {
    return this.value && this.value.token;
  }
}

export default new AuthStorage("AUTH");
