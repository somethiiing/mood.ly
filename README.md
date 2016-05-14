# Mood.ly

A place for you to explore your mood.

Check it out at www.moodly.io!

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

- [React](https://facebook.github.io/react/)
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
  * Success Response: { status: 'SUCCESS', body: 'User successfully created' }
  * Fail Response: { status: 'USEREXISTS', body: 'User already exists', err }

* Log In: POST: /login'
  * Success Response: { status: 'SUCCESS', body: 'Successfully logged in!' }
  * Fail Response: { status: 'PWFAIL', body: 'Invalid username or password' }

####MOODS
* Saves Inputted Mood: POST: '/api/moods'
  * Success Response: { status: 'SUCCESS', body: 'Successfully saved mood.' }
  * Fail Response: { status: 'FAIL', body: 'Did not save mood.' }

* Retrieves All Moods: GET: 'api/moods'
  * Success Response: { status: 'SUCCESS', Name: String, Count: Integer }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all moods.' }

####QUOTES
* Produce a Quote: GET: '/api/wikiInfo'
  * Success Response: { status: 'SUCCESS', body: String }
  * Fail Response: { status: 'FAIL', body: Error String }

* Save Particular Quote: POST: '/api/quotes'
  * Success Response: { status: 'SUCCESS', body: 'Successfully saved quote.' }
  * Fail Response: { status: 'FAIL', body: 'Did not save quote.' }

* Retrieves All Quotes: GET: '/api/quotes'
  * Success Response: 
    { status: 'SUCCESS', body: { [{Text: String, Mood: String}, ... ] } }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all quotes.' }

* Retrieves Quote by ID: GET: '/api/quotes/:id'
  * Success Response: { status: 'SUCCESS', body: {Text: String, Mood: String} }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve quote.' }

####GIPHY ROUTES
* Produce a GIF: GET: '/api/giphyInfo'
  * Success Response: { status: 'SUCCESS', body: String }
  * Fail Response: { status: 'FAIL', body: error }

* Save Particular GIF: POST: '/api/giphys'
  * Success Response: { status: 'SUCCESS', body: 'Successfully saved GIF.' }
  * Fail Response: { status: 'FAIL', body: 'Did not save GIF.' }

* Retrieves All GIFs: GET: '/api/giphys'
  * Success Response: 
    * { status: 'SUCCESS', body: { [{URL: String, Mood: String}, ... ] } }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all GIFs.' }

* Retrieves GIF by ID: GET: '/api/giphys/:id'
  * Success Response: { status: 'SUCCESS', body: {URL: String, Mood: String} }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve GIF.' }

####MUSIC ROUTES
* Produce a Youtube Video ID: GET: '/api/musicInfo'
  * Success Response: { status: 'SUCCESS', trackInfo, videoID }
  * Fail Response: { status: 'FAIL', keyword, body: 'No videos found' }

* Save Particular Video ID: POST: '/api/music'
  * Success Response: { status: 'SUCCESS', body: 'Successfully saved Video Id.' }
  * Fail Response: { status: 'FAIL', body: 'Did not save Video Id.' }

* Retrieves All Video IDs: GET: '/api/music'
  * Success Response: 
    * { status: 'SUCCESS', body: { [{VideoId: String, Mood: String}, ... ] } }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all Video Ids.' }

* Retrieve Video ID by ID: GET: '/api/music/:id'
  * Success Response: { status: 'SUCCESS', body: {VideoId: String, Mood: String} }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve Video Id.' }

####USERS
* Retrieves Quotes by User ID: GET: '/api/user/quotes'
  * Success Response: 
    * { status: 'SUCCESS', body: { [{Text: String, Mood: String}, ... ] } }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all quotes.' }

* Retrieves GIFs by User ID: GET: '/api/user/giphys'
  * Success Response: 
    * { status: 'SUCCESS', body: { [{URL: String, Mood: String}, ... ] } }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all GIFs.' }

* Retrieves Video ID by User ID: GET: '/api/user/music'
  * Success Response: 
    * { status: 'SUCCESS', body: { [{VideoId: String, Mood: String}, ... ] } }
  * Fail Response: { status: 'FAIL', body: 'Unable to retrieve all Video Ids.' }

## Deployment

Deployed using Digital Ocean. Installed a MySQL Database. Live at www.moodly.io!