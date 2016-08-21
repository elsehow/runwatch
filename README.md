# runwatch

watches some files, runs a thing

## example
```
runwatch *.js -r "npm start" 
```

runs `npm start` and watches everything that matches `*.js*`.
when any `.js` file changes, it will SIGINT the old process (as if you pressed C-c), and re-runs `npm start`

## install

```
npm install -g runwatch
```
## example

```
echo "echo \"hello\"" > test.sh
runwatch test.sh -r "bash test.sh"
```

now modify test.sh, and watch the script re-run!

## about

heavily inspired by [npm-watch](https://www.npmjs.com/package/npm-watch), but with a few differences:

- runs from the command line, no npm dependencies
- uses [file globs](https://github.com/isaacs/node-glob) for advanaced filename matching
- when the watched script errors, it prints *only* the error, with no npm erroring boilerplate (!)
- no nodemon dependencies - just `child_process.spawn()`

## license

BSD
