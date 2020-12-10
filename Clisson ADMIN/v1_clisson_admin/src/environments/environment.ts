// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {

    // baseurl:'http://176.31.215.237:5000'
    // baseurl:'http://35.180.66.181/api'
    baseurl: 'http://206.189.135.176/clisson-server/api',
    baseurlImg: 'http://206.189.135.176/clisson-server/images'
  }
};
