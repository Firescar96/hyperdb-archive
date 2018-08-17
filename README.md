# hyperdb-archive

This starts a server which acts as an archiver for any shared hyperdb instances. Using hyperdb replicate any connecting instances to the same archiver will remain in sync.

If someone else finds this concept useful I'll maintain this as a node package.

## Usage

You can run `dat-gateway` to start a gateway server that listens on port 5000. You can also configure it! You can print usage information with `dat-gateway -h`:

```
$ dat-gateway -h
dat-gateway

Options:
  --version     Show version number                                    [boolean]
  --config      Path to JSON config file
  --port, -p    Port for the gateway to listen on.               [default: 3000]
  -h, --help    Show help                                              [boolean]
```

## Contributions

All contributions are welcome: bug reports, feature requests, "why doesn't this work" questions, patches for fixes and features, etc. For all of the above, [file an issue](https://github.com/firescar96/hyperdb-archive/issues) or [submit a pull request](https://github.com/firescar96/hyperdb-archive/pulls).

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
