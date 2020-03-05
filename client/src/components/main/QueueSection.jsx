/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

import SectionHeader from './SectionHeader';
import SearchBox from './SearchBox';
import { QueueCards, SearchCards } from './SongCards';

class QueueSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    gsap.from('.queue-section', { opacity: 0, duration: 1, x: 30 });
  }

  render() {
    let { queue } = this.props;
    const { isOpen } = this.state;
    const {
      searchList,
      reRenderQueue,
      searchVal,
      searchSong,
      sendToSearchQueue,
      submitted
    } = this.props;

    queue = queue.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));
    queue = queue.filter(songInfo => {
      return (
        `${songInfo.title} | ${songInfo.artist.join('|')}`
          .toLowerCase()
          .includes(searchVal.toLowerCase()) && songInfo.upvotes !== 0
      );
    });

    return (
      <section className="queue-section mt-5 md:pl-10">
        <div className="flex flex-col sm:flex-row justify-between">
          <SectionHeader>Queue</SectionHeader>
          <div className="flex flex-col w-full sm:w-2/3 mb-5 py-2 items-stretch relative">
            <SearchBox
              searchSong={searchSong}
              searchVal={searchVal}
              sendToSearchQueue={sendToSearchQueue}
            />
            <div className={isOpen ? '' : 'hidden'}>
              <div
                className="fixed h-screen w-screen bg-black inset-0 opacity-25 cursor-pointer"
                role="button"
                tabIndex="0"
              />
              <div className="bg-lighter-primary absolute w-full border-solid border-4 border-lighter-primary">
                {/* {searchList.length > 0 ? (
                  searchList.map(songInfo => (
                    <SearchCard
                      songInfo={songInfo}
                      key={songInfo.id}
                      queue={queue}
                      toggleDropdown={this.toggleDropdown}
                      sendToSearchQueue={this.props.sendToSearchQueue}
                      reRenderQueue={reRenderQueue}
                    />
                  ))
                ) : (
                  <EmptySearchCard toggleDropdown={this.toggleDropdown} />
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="md:overflow-y-scroll h-screen-60 bg-secondary">
          <QueueCards queue={queue} reRenderQueue={reRenderQueue} />
          <SearchCards
            show={Boolean(searchVal)}
            submitted={submitted}
            queue={queue}
            searchList={searchList}
            reRenderQueue={reRenderQueue}
          />
        </div>
      </section>
    );
  }
}

export default QueueSection;

QueueSection.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.any),
  sendToSearchQueue: PropTypes.func,
  searchList: PropTypes.arrayOf(PropTypes.any),
  reRenderQueue: PropTypes.func,
  searchVal: PropTypes.string,
  searchSong: PropTypes.func,
  submitted: PropTypes.bool
};

QueueSection.defaultProps = {
  queue: [],
  sendToSearchQueue: () => [],
  searchList: [],
  reRenderQueue: () => [],
  searchVal: '',
  searchSong: () => [],
  submitted: 0
};
