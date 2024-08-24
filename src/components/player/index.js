import { Component } from "react";
import "./index.css";
import songsContext from "../../context/songsContext";

class Player extends Component {
    state = {
        audioTrack: 0,
        duration: 0,
        currentTime: 0,
        previousSongUrl: null,
        isPlaying : false,
        muteVolume : false
    };

    componentDidMount() {
        const { activeSong } = this.context;

        if (activeSong && activeSong.url) {
            this.initializeAudio(activeSong.url);
            this.setState({ previousSongUrl: activeSong.url });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { activeSong } = this.context;
        const {isPlaying,muteVolume} = this.state
        if (activeSong && activeSong.url) {
            if (this.state.previousSongUrl !== activeSong.url) {
                this.song.pause();
                this.initializeAudio(activeSong.url);
                this.setState({ 
                    previousSongUrl: activeSong.url, 
                    audioTrack: 0,
                    duration: 0,
                    currentTime: 0,
                });
                if(isPlaying){
                    this.playAudio(); 
                }
                if(muteVolume){
                    this.song.volume = 0
                }
            }
        }
    }
    
    toggleVolume = ()=>{
        const {muteVolume} = this.state
        
        if(muteVolume){
            this.song.volume = 1
        }
        else{
            this.song.volume = 0
        }
        this.setState({
            muteVolume: !muteVolume
        })
    }
    
    componentWillUnmount() {
        this.song.removeEventListener("timeupdate", this.updateTime);
        this.song.removeEventListener("loadedmetadata", this.updateDuration);
        this.song.pause();
    }

    initializeAudio = (url) => {
        this.song = new Audio(url);
        this.song.addEventListener("timeupdate", this.updateTime);
        this.song.addEventListener("loadedmetadata", this.updateDuration);
    };

    updateTime = () => {
        this.setState({
            currentTime: this.song.currentTime,
            audioTrack: (this.song.currentTime / this.song.duration) * 100,
        });
    };

    updateDuration = () => {
        this.setState({
            duration: this.song.duration,
        });
    };

    playAudio = () => {
        this.song.play();
        this.setState({
            isPlaying : true
        })
    };

    pauseAudio = () => {
        this.song.pause();
        this.setState({
            isPlaying : false
        })
    };

    onChangeTrack = (e) => {
        const newTime = (e.target.value / 100) * this.state.duration;
        this.song.currentTime = newTime;
        this.setState({ audioTrack: e.target.value });
    };
    
    togglePlayPause = ()=>{
        const {isPlaying} = this.state
        
        if(isPlaying){
            this.pauseAudio()
        }
        else{
            this.playAudio()
        }
        this.setState({
            isPlaying : !isPlaying
        })
    }
    
    toggleSongsListView = ()=>{
        const songsListView = document.getElementById("songsListView")
        if(songsListView.style.display === "none"){
            songsListView.style.display = "block"
        }
        else{
            songsListView.style.display = "none"
        }
    }

    render() {
        const { audioTrack,isPlaying,muteVolume } = this.state;

        return (
            <songsContext.Consumer>
                {(value) => {
                    const { activeSong,songs, changeActiveSong, currentSongsList } = value;

                    const ActiveNextSong = () => {
                        const index = currentSongsList.indexOf(activeSong);
                        console.log(index);
                    
                        if (index === currentSongsList.length - 1) {  
                            console.log(currentSongsList[0]);
                            changeActiveSong(currentSongsList[0]);
                        } else {
                            console.log(currentSongsList[index + 1]);
                            changeActiveSong(currentSongsList[index + 1]);
                        }
                    };
                    
                    const ActivePrevSong = () => {
                        const index = currentSongsList.indexOf(activeSong);
                        console.log(index);
                        
                        if (index === 0) {  
                            console.log(currentSongsList[currentSongsList.length - 1]);  
                            changeActiveSong(currentSongsList[currentSongsList.length - 1]);
                        }
                        else if(index==-1){
                            changeActiveSong(currentSongsList[0]);
                        }
                        else {
                            console.log(index - 1);  
                            changeActiveSong(currentSongsList[index - 1]);
                        }
                    };
                    
                    return (
                        <div className="player">
                            <div className="song-details-container">
                                <h1 className="player-song-name">{activeSong?.name}</h1>
                                <p className="player-artist-name">{activeSong?.artist}</p>
                            </div>
                            <div className="player-cover-img-container">
                                <img
                                    src={`https://cms.samespace.com/assets/${activeSong?.cover}.jpg`}
                                    loading="lazy"
                                    className="small-cover-img"
                                    alt={`${activeSong?.name}`}
                                />
                                <input
                                    onChange={this.onChangeTrack}
                                    type="range"
                                    className="tracker"
                                    value={audioTrack}
                                />
                            </div>
                            <div className="controllers-section">
                                <div className="menu-container">
                                    <button onClick={this.toggleSongsListView} className="btn">
                                        <img className="icon menu" src="https://res.cloudinary.com/dhrxxm585/image/upload/v1724355102/Frame_vcv99w.png" alt="Menu" />
                                    </button>
                                </div>
                                <div className="controllers-container">
                                    <button onClick={ActivePrevSong}>
                                        <img className="skip icon" src="https://res.cloudinary.com/dhrxxm585/image/upload/v1724355587/Vector_3_urkbiu.png" alt="Previous" />
                                    </button>
                                    <button onClick={this.togglePlayPause}>
                                        <img src={`${isPlaying?"https://res.cloudinary.com/dhrxxm585/image/upload/v1724356298/Frame_32_zqyspo.png":"https://res.cloudinary.com/dhrxxm585/image/upload/v1724355102/Vector_2_llhfmw.png"}`} alt="Play - Pause" />
                                    </button>
                                    <button onClick={ActiveNextSong}>
                                        <img className="skip icon" src="https://res.cloudinary.com/dhrxxm585/image/upload/v1724355102/Frame_1_kbcakb.png" alt="Previous" />
                                    </button>
                                </div>
                                <div className="audio-container">
                                    <button className="btn" onClick={this.toggleVolume}>
                                        <img className="icon audio" src={`${ muteVolume ? "https://cdn.icon-icons.com/icons2/1512/PNG/512/33_104872.png" : "https://res.cloudinary.com/dhrxxm585/image/upload/v1724355102/Vector_1_gm7swy.png"}`} alt="Audio" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </songsContext.Consumer>
        );
    }
}

Player.contextType = songsContext;

export default Player;
