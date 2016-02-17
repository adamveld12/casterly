'use strict';

import React from 'react';

export default class Intro extends React.Component {
  render(){
    return (
      <section id="introText">
        <h1> Welcome to Casterly </h1>
        <p> Casterly is a web application where you can listen to all of your favorite podcasts without all of the hassle of installing iTunes or any other podcast manager. </p>
        <p> All of your playlists are saved in local storage, which is your browser's persistent storage space that gets preserved between browsing sessions. </p>
        <p> This means you can come right back and always be able to pick up right where you left off! </p>

        <h2> How do I use this? </h2>
        <p> Use the search above to find podcasts on iTunes or use the RSS icon to the left of the search to add a custom RSS Feed URL if you can't find what you want. </p>
        <p> When you look at a podcast's details (by clicking on one of the results after you search) you will be able to add episodes to playlists or listen to them right away.</p>

        <h2> Something isn't working right... </h2>
        <p> If there are any bugs, styling issues or if you just have some suggestions please file an issue on <a target="_blank" href="https://www.github.com/adamveld12/casterly/issues">this project's issue tracker</a> and don't forget to star us at <a target="_blank" href="https://www.github.com/adamveld12/casterly">GitHub.com</a>! </p>
      </section>
    );
  }
}
