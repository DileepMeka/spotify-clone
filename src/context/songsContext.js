import React from "react" 

const songsContext = React.createContext({
    songs : [],
    activeSong : {},
    changeActiveSong : ()=>{},
    currentSongsList : [],
    changeCurrentSongsList : ()=>{}
})

export default songsContext