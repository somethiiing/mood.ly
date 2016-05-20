# Mood.ly

(https://travis-ci.org/CodeRISHI/mood.ly.svg?branch=master)

A place for you to explore your mood.

Check it out at [moodly.io](http://moodly.io)!

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
  1. [Current Build Health](#current-build-health)
  1. [Roadmap](#roadmap)
  1. [Progress](#progress)
1. [Architecture](#architecture)
	1. [High Level Architecture](#high-level-architecture)
	1. [Database Schema](#database-schema)
1. [API](#api)
  1. [Auth](#AUTH)
  1. [Moods](#MOODS)
  1. [Quotes](#QUOTES)
  1. [Giphy](#GIPHY)
  1. [Music](#MUSIC)
  1. [Users](#USERS)
1. [Deployment](#deployment)

## Overview

### Tech Stack

- [React](https://facebook.github.io/react/)
- [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/latest/) and [MySQL](https://www.mysql.com/)
- [Webpack](https://www.npmjs.com/package/webpack)

### Styling

- [Material UI](http://www.material-ui.com/#/)
- [React Bootstrap](https://react-bootstrap.github.io/)

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
- Webpack 1.13.x
- Youtube API key

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Getting Started

After everything installed using "npm install"

Update the API key in '/server/config/authconfig.js' for Youtube. The authConfig-example.js file is provided for you. Just remove -example and update keys.  


```sh
mysql.server --start
mysql -u -root -p
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

####AUTH
* Sign Up: POST: '/signup'
  * Success Response: { success: true, body: user }
  * Fail Response: { success: false, body: err }

* Log In: POST: /login'
  * Success Response: { success: true, body: user }
  * Fail Response: { success: false, body: 'Invalid username or password' }

####MOODS
* Saves Inputted Mood: POST: '/api/moods'
  * Success Response: { success: true, body: mood }
  * Fail Response: { success: false, body: err }

* Retrieves All Moods: GET: 'api/moods'
  * Success Response: { success: true, body: allMoods }
  * Fail Response: { success: false, body: err }

####QUOTES
* Produce a Quote: GET: '/api/wikiInfo'
  * Success Response: { success: true, body: quote }
  * Fail Response: { success: false, body: err }

* Save Particular Quote: POST: '/api/quotes'
  * Success Response: { success: true, body: 'Successfully saved quote.' }
  * Fail Response: { success: false, body: 'Did not save quote.' }

* Retrieves All Quotes: GET: '/api/quotes'
  * Success Response: 
    { success: true, body: { [{Text: String, Mood: String}, ... ] } }
  * Fail Response: { success: false, body: err }

* Retrieves Quote by ID: GET: '/api/quotes/:id'
  * Success Response: { success: true, body: {Text: String, Mood: String} }
  * Fail Response: { success: false, body: err }

####GIPHY
* Produce a GIF: GET: '/api/giphyInfo'
  * Success Response: { success: true, body: String }
  * Fail Response: { success: false, body: err }

* Save Particular GIF: POST: '/api/giphys'
  * Success Response: { success: true, body: 'Successfully saved GIF.' }
  * Fail Response: { success: false, body: err }

* Retrieves All GIFs: GET: '/api/giphys'
  * Success Response: 
    * { success: true, body: { [{URL: String, Mood: String}, ... ] } }
  * Fail Response: { success: false, body: err }

* Retrieves GIF by ID: GET: '/api/giphys/:id'
  * Success Response: { success: true, body: {URL: String, Mood: String} }
  * Fail Response: { success: false, body: err }

####MUSIC
* Produce a Youtube Video ID: GET: '/api/musicInfo'
  * Success Response: { success: true, trackInfo, videoID }
  * Fail Response: { success: false, keyword, body: err }

* Save Particular Video ID: POST: '/api/music'
  * Success Response: { success: true, body: 'Successfully saved Video Id.' }
  * Fail Response: { success: false, body: err }

* Retrieves All Video IDs: GET: '/api/music'
  * Success Response: 
    * { success: true, body: { [{VideoId: String, Mood: String}, ... ] } }
  * Fail Response: { success: false, body: err }

* Retrieve Video ID by ID: GET: '/api/music/:id'
  * Success Response: { success: true, body: {VideoId: String, Mood: String} }
  * Fail Response: { success: false, body: err }

####USERS
* Retrieves Quotes by User ID: GET: '/api/user/quotes'
  * Success Response: 
    * { success: true, body: { [{Text: String, Mood: String}, ... ] } }
  * Fail Response: { success: false, body: err }

* Retrieves GIFs by User ID: GET: '/api/user/giphys'
  * Success Response: 
    * { success: true, body: { [{URL: String, Mood: String}, ... ] } }
  * Fail Response: { success: false, body: err }

* Retrieves Video ID by User ID: GET: '/api/user/music'
  * Success Response: 
    * { success: true, body: { [{VideoId: String, Mood: String}, ... ] } }
  * Fail Response: { success: false, body: err }

## Deployment

Deployed using Digital Ocean. Installed a MySQL Database. Live at www.moodly.io!