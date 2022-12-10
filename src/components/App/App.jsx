import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import s from 'components/Styles.module.css';
import Button from 'components/Button/Button';

export default class App extends Component {
  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=28590338-d8bd85ed8cacc4ff76ae71c31&image_type=photo&orientation=horizontal&per_page=12'
    )
      .then(res => res.json())
      .then(console.log);
  }
  render() {
    return (
      <div className={s.App}>
        <Searchbar />
        <ImageGallery />
        <Button />
      </div>
    );
  }
}