#! /usr/bin/env node
function quit (err) {
  console.log(err)
  process.exit(1)
}
//function usage () {
//  quit(`USAGE:
//
//  runwatch [files] -r "[command-to-run]"
//
//  ex,
//
//    runwatch **/*.js -r "tape test/*.js"`)
//}
var argv = require('minimist')(process.argv.slice(2))
var gaze = require('gaze')
var spawn = require('child_process').spawn
var files = argv._
var cmd = argv.r
if (!files) usage()
if (!cmd) usage()
function spawnCommand () {
  var cmds = cmd.split(' ')
  return spawn(cmds[0], cmds.slice(1), { stdio: 'inherit', stderr: 'inherit' })
}
var proc = spawnCommand()
files.forEach(f => {
  gaze(f, (err, watcher) => {
    if (err) quit(err)
    watcher.on('changed', () => {
      proc.kill()
      proc = spawnCommand()
    })
  })
})
