 <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A CRUD application

## Installation

```bash
$ yarn install
```

## Setup Env

DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
<br>
PORT=any 4 digit number
<br>
JWT_SECRET=any random string

## Prisma Setup

```bash
# create table
$ npx prisma db push

# generate prisma cli
$ npx prisma generate
```

## Running the app

```bash
# build
$ yarn run build

# start app
$ yarn run start

```
