# git-metrics

## Description

A package that provides CLI functionality for the following GIT metrics:

- `count-contributors` to count projects contributors and update README.md


## Setup

Install & Build:

```
yarn
yarn build
```

## Usage

Default options, which can be overriden using environment variables:

```
PROJECTS_PATH = "packages"
MAX_CONCURRENCY = "10"
```

To Execute:

```
./bin/git-metrics-cli count-contributors <repository-path>
```

Example:

```
./bin/git-metrics-cli count-contributors  ../count-contributors-sample
```
