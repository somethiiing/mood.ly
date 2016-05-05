# Mood.ly

> A place for you to explore your mood.

## Team

  - __Product Owner__: Kim Curran
  - __Scrum Master__: Arun Vasudevan
  - __Development Team Members__: Chris Lardizabal, Wilson Yu, Kim Curran, Arun Vasudevan

## Table of Contents

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

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
### Getting Started

After everything installed, 'npm install' and 'bower install'

```sh
webpack --watch
npm start
```
Navigate to localhost:8080 to view the app.

Can run tests with

```sh
npm test
```

### Roadmap

View the project roadmap [here](https://waffle.io/MysteriousBagel/mood.ly)
[![Stories in 'Backlog'](https://badge.waffle.io/MysteriousBagel/mood.ly.svg?label=Backlog&title=Backlog)](https://waffle.io/MysteriousBagel/mood.ly)
[![Stories in 'Ready'](https://badge.waffle.io/MysteriousBagel/mood.ly.svg?label=Ready&title=Ready)](https://waffle.io/MysteriousBagel/mood.ly)
[![Stories in 'In Progress'](https://badge.waffle.io/MysteriousBagel/mood.ly.svg?label=In%20Progress&title=In%20Progress)](https://waffle.io/MysteriousBagel/mood.ly)


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
