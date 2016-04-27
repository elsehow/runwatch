# runwatch

WIP testing module

heavily inspired by [npm-watch](https://www.npmjs.com/package/npm-watch), but with a few differences:

- runs from the command line, no npm dependencies
- uses standard [file globs](https://github.com/isaacs/node-glob)
- when the watched script errors, it prints *only* the error, with no npm erroring boilerplate (!)
- no nodemon dependencies - just `child_process.spawn()`

## install

```
npm install -g runwatch
```

## use

```
runwatch *.js -c "tape test/*.js"
```

## license

BSD
