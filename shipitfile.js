'use strict'

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-cnpm')(shipit)
  require('shipit-pm')(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/test-project',
      deployTo: '/home/work/test-project',
      repositoryUrl: 'https://github.com/mengxxSELF/test-project.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/path/to/key',
      shallowClone: true,
      cnpm: {
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true
      },
      pm: {
        production: {
          path: '/home/work/test-project/current/pm2/production.json'
        }
      }
    },
    production: {
      servers: ['root@47.104.231.146'],
      branch: 'master'
    }
  })
}
