import React from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics.js';
import axios from 'axios';

export default class LyricsContainer extends React.Component {
  constructor() {
    super()
    this.state = Object.assign({
      artistQuery: '',
      songQuery:''
    }, store.getState());

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // the function passes to store.subscribe is the listener that will be called every time store state changes
    // this function has a return value which will remove the listener, which we are setting to the method this.unsubscribe
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setArtist(artist) {
    this.setState({artistQuery: artist})
  }

  setSong(song) {
    this.setState({songQuery: song})
  }


  handleSubmit() {
  if (this.state.artistQuery && this.state.songQuery) {
    store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
  }
}


  render() {
    return (<Lyrics text={this.state.text} setArtist={this.setArtist} setSong={this.setSong} artistQuery={this.state.artistQuery} songQuery={this.state.songQuery} handleSubmit={this.handleSubmit} />)
  }

}
