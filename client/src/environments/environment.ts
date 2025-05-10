export const environment = {
  production: true,
  api: {
    url: 'http://localhost:3000',
  },
  auth0: {
    domain: 'dev-68btpded5faw851r.us.auth0.com',
    clientId: 'SGPb8McYMVVREi2iGCKMUVjl3tz1ZA0x',
    authorizationParams: {
      audience: 'https://mychatgptemini/auth',
      redirect_uri: 'http://localhost:4200/callback',
    },
    errorPath: '/callback',
  },
};
