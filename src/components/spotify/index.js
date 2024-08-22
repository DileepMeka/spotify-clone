import {Component} from "react"

import "./index.css"

import songsContext from "../../context/songsContext"

import ProfileSection from "../profileSection"
import SongsListView from "../songsListView"
import Player from "../player"

const apiStatusList = {
    loading : "LOADING",
    success : "SUCCESS",
    failure : "FAILURE"
}

class Spotify extends Component{
    
    state = {
        songs : [],
        activeSong : {},
        currentSongsList : [],
        apiStatus : "INITIAL"
    }
    
    componentDidMount(){
        this.getSongsData()
    }
    
    convertTimeFormat(timestamp) {
        const date = new Date(timestamp);
        
        let hours = date.getHours();
        let minutes = date.getMinutes();
        
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        
        const time = `${hours}:${minutes}`;
        
        return time;
    }
    
    getSongsData =async ()=>{
        const url = "https://cms.samespace.com/items/songs"
        this.setState({
            apiStatus : apiStatusList.loading
        })
        const response = await fetch(url)
        if(!response.ok){
            this.setState({
                apiStatus:apiStatusList.failure
            })
            console.log("Something Went Wrong")
        }
        else{
            const data = await response.json()
            
            for (let i=0; i<data.data.length; i++ ){
                data.data[i].date_updated = this.convertTimeFormat(data.data[i].date_updated)
            }
            this.setState({
                apiStatus : apiStatusList.success,
                songs : data.data,
                activeSong: data.data[0],
                currentSongsList : data.data
            })
        }
    }
    
    changeActiveSong = (song)=>{
        this.setState({
            activeSong : song
        })
    }
    
    changeCurrentSongsList = songsList =>{
        this.setState({
            currentSongsList : songsList
        })
    }
    
    successView = ()=>(
        <>
            <SongsListView />
            <Player />
        </>
    )
    
    loadingView = ()=><div className="loader"></div>
    
    failureView = ()=>(
        <div className="failure-container">
            <h1>Something Went Wrong..! PLease Try again..!</h1>
            <button onClick={this.getSongsData}>Try Again</button>
        </div>
    )
    
    render(){
        const {songs,activeSong,apiStatus,currentSongsList} = this.state
        let view;
        switch (apiStatus) {
        case apiStatusList.success:
            view = this.successView();
            break;
        case apiStatusList.loading:
            view = this.loadingView();
            break;
        case apiStatusList.failure:
            view = this.failureView();
            break;
        default:
            view = null;
        }
        return(
            <songsContext.Provider value={{
                songs,activeSong,changeActiveSong:this.changeActiveSong , currentSongsList:currentSongsList, changeCurrentSongsList:this.changeCurrentSongsList
            }}>
                <div id="body" style={{ backgroundImage: `linear-gradient(30deg, #000000, ${activeSong.accent},${activeSong.accent})` }} className="body">
                    <ProfileSection />
                    {view}
                </div>
            </songsContext.Provider>
        )
    }
}

export default Spotify