import { Component } from "react";

import songsContext from "../../context/songsContext";

import "./index.css"
import SongsList from "../songsList";

export const tracks = {
    forYou : "FOR-YOU",
    topTracks : "TOP-TRACKS"
}

class SongsListView extends Component{

    state = {
        activeTrack : tracks.forYou,
        searchWord : ""
    }
    
    changeActiveTrack = track =>{
        this.setState({
            activeTrack : track
        })
    }
    
    changeSearchWord = e =>{
        this.setState({
            searchWord : e.target.value
        })
    }
    
    
    render(){
        const {activeTrack, searchWord} = this.state
        return(
            <songsContext.Consumer>
            {
                value =>{
                    const {songs} = value
                    return(
                        <div id="songsListView" className="songs-list-view-container">
                            <div className="tracks-container">
                                <button onClick={()=>this.changeActiveTrack(tracks.forYou)} className={`track-selector ${activeTrack===tracks.forYou ? "active-track" : ""}`}>
                                    <h2>For You</h2>
                                </button>
                                <button onClick={()=>this.changeActiveTrack(tracks.topTracks)} className={`track-selector ${activeTrack===tracks.topTracks ? "active-track" : ""}`}>
                                    <h2>Top Tracks</h2>
                                </button>
                            </div>
                            <div className="search-bar-container">
                                <div className="input-container">
                                    <input onChange={this.changeSearchWord} value={searchWord} placeholder="Search Song, Artist" type="search" id="search" className="search-bar" />
                                    <label className="search-label" htmlFor="search">
                                        <img src="https://res.cloudinary.com/dhrxxm585/image/upload/v1724319393/Vector_fi1yxa.png" alt="Search" className="search-icon" />
                                    </label>
                                </div>
                            </div>
                            <div className="songs-list-container">
                                <SongsList activeTrack={activeTrack} songs={songs} searchWord={searchWord} />
                            </div>
                        </div>
                    )
                }
            }
            </songsContext.Consumer>
        )
        
    }
}

export default SongsListView