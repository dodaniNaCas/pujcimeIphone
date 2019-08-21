export interface IEnvironmentConfig {
  env: {
    production: boolean,
    debug: boolean,
    uriPrefix: string,
    uriPrefixDebug: string,
    getPhones: string,
    getPhoneById: string
  };
}
