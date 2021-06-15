#!/usr/bin/env node
var usage = require('usage-and-quit')
var usageFile = require('path').join(__dirname, 'USAGE.txt')
var argv = require('minimist')(process.argv.slice(2))
var gaze = require('gaze')
var spawn = require('child_process').spawn
var files = argv._
var cmd = argv.r
if (!files) usage(usageFile)
if (!cmd) usage(usageFile)
function spawnCommand () {
  var cmds = cmd.split(' ')
  var proc = spawn(cmds[0], cmds.slice(1), {
    stdio: 'inherit', stdout: 'inherit',
    detached: true,
  })
  return proc.on('error', err => {
    console.error(err)
    proc.exited = true
  }).on('exit', () => {
    proc.exited = true
  })
}
var proc = spawnCommand()
function killCommand () {
  if (!proc.exited) {
    process.kill(-proc.pid, 'SIGKILL')
  }
}
files.forEach(f => {
  gaze(f, (err, watcher) => {
    if (err) quit(err)
    watcher.on('changed', () => {
      killCommand()
      proc = spawnCommand()
    })
  })
})
function die() {
  killCommand()
  process.exit()
}
process.on('SIGTERM', die)
process.on('SIGINT', die)
process.on('uncaughtException', die)
