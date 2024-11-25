import {Button} from "@nextui-org/react";
import {IconDeviceGamepad2} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

const PlayGame = (props) => {
    const navigate = useNavigate()

    const handlePlayNewGame = () => {
        navigate('/game')
    }

    return (
        <div>
            <div className={'flex flex-col gap-2.5 justify-center items-center'}>
                <Button className={'w-1/2'} color="success" size={'sm'} variant="flat" startContent={<IconDeviceGamepad2/>} onPress={handlePlayNewGame}>
                    Create game!
                </Button>
                <Button className={'w-1/2'} color="warning" size={'sm'} variant="flat">
                    Join game
                </Button>
            </div>
        </div>
    )
}

export default PlayGame;