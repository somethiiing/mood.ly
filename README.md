# Mood.ly

A place for you to explore your mood.

## Team

  - __Product Owner__: Kim Curran
  - __Scrum Master__: Arun Vasudevan
  - __Development Team Members__: Chris Lardizabal, Wilson Yu, Kim Curran, Arun Vasudevan

## Table of Contents

1. [Overview](#Overview)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Architecture](#architecture)
	1. [High Level Architecture](#high-level-architecture)
	1. [Database Schema](#database-schema)
	1. [API](#api)
1. [Deployment](#deployment)

## Overview

### Tech Stack

- [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/)
- [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/latest/) and [MySQL](https://www.mysql.com/)
- [Webpack](https://www.npmjs.com/package/webpack)

### Webpack

Webpack bundles all files set by the webpack.config.js input folder together so it will load in one script tag. The purpose is to create big chunks that can be loaded asynchronously to reduce initial loading time.


## Usage

> Input your mood and receive a quote!

## Requirements

- Node 0.10.x
- Express -
- MySQL 2.10.x
- Sequelize 3.22.x
- React -
- Redux -
- Webpack 1.13.x
- Facebook API key
- Google Plus API key


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Getting Started

After everything installed using "npm install"

Update the API keys in '/server/config/authconfig.js' for Facebook and Google Plus. The authConfig-example.js file is provided for you. Just remove -example and update keys.  


```sh
webpack --watch
npm start
```

Navigate to localhost:8080 to view the app.

Can run tests with

```sh
npm test
```



### Current Build Health [![Build Status](https://travis-ci.org/MysteriousBagel/mood.ly/.svg?branch=master)](https://travis-ci.org/MysteriousBagel/mood.ly/)
View the build [history](https://travis-ci.org/MysteriousBagel/mood.ly/builds)

### Roadmap

View the project roadmap [here](https://waffle.io/MysteriousBagel/mood.ly)
[![Stories in 'Backlog'](https://badge.waffle.io/MysteriousBagel/mood.ly.svg?label=Backlog&title=Backlog)](https://waffle.io/MysteriousBagel/mood.ly)
[![Stories in 'Ready'](https://badge.waffle.io/MysteriousBagel/mood.ly.svg?label=Ready&title=Ready)](https://waffle.io/MysteriousBagel/mood.ly)
[![Stories in 'In Progress'](https://badge.waffle.io/MysteriousBagel/mood.ly.svg?label=In%20Progress&title=In%20Progress)](https://waffle.io/MysteriousBagel/mood.ly)

### Progress

[![Throughput Graph](https://graphs.waffle.io/MysteriousBagel/mood.ly/throughput.svg)](https://waffle.io/MysteriousBagel/mood.ly/metrics/throughput)

## Architecture

### High Level Architecture

![Architecture Diagram](/readmefiles/archdiagram.png)

### Database Schema
Database in mySQL, using sequelize.

![Database Schema](/readmefiles/databaseSchema.png)

### API


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Deployment
