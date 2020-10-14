import '../../Styles/FUT.css'

import React, { useEffect } from 'react'

const FUTCard = (props) => {

    useEffect(()=>{
      console.log('Props in futCard.js',props)
    },[])

    return (
      <div class="wrapper">
        {/* <!-- *** fut-player-card ***--> */}
        <div class="fut-player-card">
          {/* <!-- Player Card Top--> */}
          <div class="player-card-top">
            <div class="player-master-info">
              <div class="player-rating">
                <span>{props.stats["overall"]}</span>
              </div>
              <div class="player-position">
                <span>{props.stats["position"]}</span>
              </div>
              <div class="player-nation">
                <img
                  src="https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg"
                  alt="Argentina"
                  draggable="false"
                />
              </div>
              <div class="player-club">
                <img
                  src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg"
                  alt="Barcelona"
                  draggable="false"
                />
              </div>
            </div>
            <div class="player-picture">
              <img
                src="https://selimdoyranli.com/cdn/fut-player-card/img/messi.png"
                alt="Messi"
                draggable="false"
              />

            </div>
          </div>
          {/* <!-- Player Card Bottom--> */}
          <div class="player-card-bottom">
            <div class="player-info">
              {/* <!-- Player Name--> */}
              <div class="player-name">
                <span>{props.name}</span>
              </div>
              {/* <!-- Player Features--> */}
              <div class="player-features">
                <div class="player-features-col">
                  <span>
                    <div class="player-feature-value">{props.stats["pace"]}</div>
                    <div class="player-feature-title">PAC</div>
                  </span>

                  <span>
                    <div class="player-feature-value">{props.stats["shot"]}</div>
                    <div class="player-feature-title">SHO</div>
                  </span>
                  <span>
                    <div class="player-feature-value">{props.stats["pass"]}</div>
                    <div class="player-feature-title">PAS</div>
                  </span>
                </div>
                <div class="player-features-col">
                  <span>
                    <div class="player-feature-value">{props.stats["dribbling"]}</div>
                    <div class="player-feature-title">DRI</div>
                  </span>
                  <span>
                    <div class="player-feature-value">{props.stats["defense"]}</div>
                    <div class="player-feature-title">DEF</div>
                  </span>
                  <span>
                    <div class="player-feature-value">{props.stats["physical"]}</div>
                    <div class="player-feature-title">PHY</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FUTCard