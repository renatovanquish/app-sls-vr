import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
    this.player.ready(() => {
      console.log('ready');
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className='w-full aspect-video'>
        <div data-vjs-player>
          <video ref={(node) => { this.videoNode = node; }} className="video-js"></video>
        </div>
      </div>
    );
  }
}
