'use strict'

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-cnpm')(shipit)
  require('shipit-pm')(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/test-activity',
      deployTo: '/home/work/test-activity',
      repositoryUrl: 'https://github.com/mengxxSELF/test-activity.git',
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
          path: '/home/work/test-activity/current/pm2/production.json'
        }
      }
    },
    // production: {
    //   servers: ['root@101.200.45.254'],
    //   branch: 'master'
    // }
    production: {
      servers: ['root@47.104.231.146'],
      branch: 'master'
    }
  })
}
