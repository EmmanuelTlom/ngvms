import { User } from "app/repository/models";

export { }

declare module 'vue' {
  interface ComponentCustomProperties {
    $user: User
  }
}

declare global {
  interface String {
    titleCase (): string;
    ucwords (): string;
    ucfirst (): string;
    slug (separator?: string): string;
  }

  interface Number {
  }
}
