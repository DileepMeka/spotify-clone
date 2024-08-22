import { Component } from "react";
import "./index.css"
import { tracks } from "../songsListView";
import SongItem from "../songItem";

import songsContext from "../../context/songsContext";

class SongsList extends Component{

    state = {
        currentSongs : []
    }
    
    componentDidMount(){
        this.filterSongs()
    }
    
    componentDidUpdate(prevProps) {
        if (
            prevProps.activeTrack !== this.props.activeTrack ||
            prevProps.songs !== this.props.songs ||
            prevProps.searchWord !== this.props.searchWord
        ) {
            this.filterSongs();
        }
    }
    
    filterSongs = ()=>{
        const {changeCurrentSongsList} = this.context
        const {activeTrack, songs, searchWord} = this.props
        let trackFilterSongs = activeTrack === tracks.topTracks ?  songs.filter((item) => item.top_track === true) : songs
            console.log(trackFilterSongs)
            console.log("trackFilterSongs")
        let searchFilterSongs = trackFilterSongs.filter(item=>(item.name.toLowerCase().includes(searchWord.toLowerCase()) || item.artist.toLowerCase().includes(searchWord.toLowerCase())))
        console.log(searchFilterSongs)
        console.log("searchFilterSongs")
        this.setState({
            currentSongs: searchFilterSongs
        })
        changeCurrentSongsList(searchFilterSongs)
    }

    render(){
        const {currentSongs} = this.state

        
        return(
            <ul className="songs-list">
                {currentSongs.map(item=>(
                    <SongItem songObj = {item} key = {item.id} />
                ))}
            </ul>
        )
    }
}

SongsList.contextType = songsContext;

export default SongsList