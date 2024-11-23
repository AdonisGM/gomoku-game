import {useEffect} from "react";
import Game from "./gamePage/Game.jsx";

const GamePage = () => {
    useEffect(() => {
        document.title = "Game | AdonisGM";
    }, []);

    return <div className={''}><Game/></div>
}

export default GamePage