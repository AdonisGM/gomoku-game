import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {IconCircleFilled, IconPower} from "@tabler/icons-react";
import Board from "./Board.jsx";
import {useNavigate} from "react-router-dom";

const Game = () => {
    const navigate = useNavigate();

    const handleExitGame = () => {
        navigate('/dashboard')
    }

    return (
        <div className={'w-screen h-screen p-10'}>
            <div className={'w-full h-full bg-gray-50 border-1 border-gray-200 rounded-3xl overflow-hidden relative shadow-[inset_0_0px_60px_-15px_rgba(0,0,0,0.3)]'}>
                <Board/>
                <div className={'absolute bottom-3 left-3'}>
                    <Card className={'h-12 min-w-12'} isPressable={true} onPress={handleExitGame}>
                        <CardBody>
                            <div className={'h-full w-full flex justify-center items-center overflow-hidden'}>
                                <IconPower size={18} className={'text-red-600'}/>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className={'absolute top-3 left-3'}>
                    <Card className={''} isPressable={true}>
                        <CardBody>
                            <div>
                                <p className={'text-sm text-gray-500'}>ID table: <b>sdjf348y3</b></p>
                            </div>
                            <div>
                                <p className={'text-sm text-gray-500'}>List players:</p>
                                <div className={'mt-2'}>
                                    <div className={'flex gap-3 items-center'}>
                                        <IconCircleFilled size={18} className={'text-orange-500'}/>
                                        <p className={'text-sm text-gray-500'}>Adonis Willer <span className={'italic text-gray-400 text-xs'}>#adonis</span></p>
                                    </div>
                                    <div className={'flex gap-3 items-center'}>
                                        <IconCircleFilled size={18} className={'text-black'}/>
                                        <p className={'text-sm text-gray-500'}>Nguyen Manh Tung <span className={'italic text-gray-400 text-xs'}>#tungnm</span></p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Game