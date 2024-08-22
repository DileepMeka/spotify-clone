import "./index.css"

import songsContext from "../../context/songsContext"

const SongItem = (props)=>{
    const {songObj} = props
    const {cover,name,artist,date_updated,id} = songObj
    
    return(
        <songsContext.Consumer>
        {value=>{
            const {activeSong,changeActiveSong} = value
            
            const onChangeActiveSong =()=>{
                changeActiveSong(songObj)
            }
            
            return(
                <li onClick={onChangeActiveSong} className={`song-item ${activeSong.id===id ? "active-item" : "" }`}>
                    <div className="cover-img-container">
                        <img src={`https://cms.samespace.com/assets/${cover}.jpg`} loading="lazy" className="small-cover-img" alt={`${name}`} />
                    </div>
                    <div className="song-details-container">
                        <h2 className="song-name">
                            {name}
                        </h2>
                        <p className="artist-name">
                            {artist}
                        </p>
                    </div>
                    <div className="time-container">
                        {date_updated}
                    </div>
                </li>
            )
        }}
        
        </songsContext.Consumer>
        
    )
    
    
}

export default SongItem