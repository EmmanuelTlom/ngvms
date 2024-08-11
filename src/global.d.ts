export { }

declare module 'vue' {
  interface ComponentCustomProperties {
    $hello: (key: string) => string
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
