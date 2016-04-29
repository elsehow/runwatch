#! /usr/bin/env node
function quit (err) {
  console.log(err)
  process.exit(1)
}
function usage () {
  quit(`USAGE: 

  runwatch [files] -r "[command-to-run]"

  ex,
    
    runwatch **/*.js -r "tape test/*.js"`)
}
var argv = require('minimist')(process.argv.slice(2))
var gaze = require('gaze')
var spawn = require('child_process').spawn
var glob = argv._[0]
var cmd = argv.r
if (!glob) usage()
if (!cmd) usage()
function spawnCommand () {
  var cmds = cmd.split(' ')
  return spawn(cmds[0], cmds.slice(1), { stdio: 'inherit', stderr: 'inherit' })
}
gaze(glob, (err, watcher) => {
  if (err) quit(err)
  var proc = spawnCommand()
  watcher.on('changed', () => {
    proc.kill()
    proc = spawnCommand()
  })
})
