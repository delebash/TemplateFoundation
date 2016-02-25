var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/';
var vendorSass = 'vendor-sass';
var jspmNpm = 'jspm_packages/npm/';
var jspmGithub = 'jspm_packages/github/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  sassOutput: 'styles',
  sass: 'sass/',
 foundation: jspmGithub + '/zurb/foundation-sites@6.1.2/',
  dtsSrc: [
    'typings/**/*.ts',
    './jspm_packages/**/*.d.ts'
  ]
}
