# Docker for egg application

---

## Use

### Development

```bash
$ make dev
```

### Deploy

```bash
$ make deploy
```

### Install npm package

For dependencies package, if the package name is `test_pkg`, running

```bash
$ make save PKG=test_pkg 
```

For devDependencies package, if the package name is `test_dev_pkg`, running

```Bash
$ make save-dev PKG=test_dev_pkg
```

### Unit test

Runing Unit Test

```bash
$ make test
```

Generating report

```bash
$ make cov
```

