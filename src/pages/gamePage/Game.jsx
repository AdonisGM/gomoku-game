import {Button, Card, CardBody, CardHeader, Spacer} from "@nextui-org/react";
import {IconCircleFilled, IconDeviceGamepad2, IconPower} from "@tabler/icons-react";
import Board from "./Board.jsx";
import {useNavigate} from "react-router-dom";
import {socket} from "../../apis/socket.js";
import {useEffect, useState} from "react";

const Game = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [logs, setLogs] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        // Connect to server
        socket.connect();

        // Handle event
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
		socket.on('info', onReceiveInfo)
		socket.on('unauthorized', onUnauthorized)

        // Clear up listener
        return () => {
            socket.disconnect();
        }
    }, []);

	// Handle event socket
    const onConnect = () => {
        setIsConnected(true)
        writeLog('info', 'User connected')
    }

    const onDisconnect = () => {
        setIsConnected(false)
        writeLog('info', 'User disconnected')
    }

	const onReceiveInfo = (data) => {
		console.log(data)
	}

	const onUnauthorized = () => {
		navigate('/')
	}

    const writeLog = (type, message) => {
		console.log(`${type}: ${message}`)
    }

	// Handle event client
    const handleExitGame = () => {
        navigate('/dashboard')
    }

	const handleClickNewGame = () => {
		socket.emit('createGame')
	}

    return (
        <div className={'w-screen h-screen p-10'}>
            <div className={'w-full h-full bg-gray-50 border-1 border-gray-200 rounded-3xl overflow-hidden relative shadow-[inset_0_0px_60px_-15px_rgba(0,0,0,0.3)]'}>
                {/*<Board/>*/}

                {!inGame && (
					<div className={'w-full h-full flex justify-center items-center'}>
						<Card>
							<CardBody>
								<Button
									color="success"
									size={'sm'}
									variant="flat"
									startContent={<IconDeviceGamepad2/>}
									onPress={handleClickNewGame}
								>
									Create game!
								</Button>
								<Spacer y={2}/>
								<Button color="warning" size={'sm'} variant="flat">
									Join game
								</Button>
							</CardBody>
						</Card>
					</div>
                )}

                {/*<div className={'absolute bottom-3 right-3'}>*/}
                {/*    <Card className={'max-h-24 min-w-24'}>*/}
                {/*        <CardBody>*/}
                {/*            <div className={'h-full w-full'}>*/}
                {/*                {logs.map((log, index) => {*/}
                {/*                    return (*/}
                {/*                        <div key={index} className={'text-[8px]'}>{log.type}: {log.message}</div>*/}
                {/*                    )*/}
                {/*                })}*/}
                {/*            </div>*/}
                {/*        </CardBody>*/}
                {/*    </Card>*/}
                {/*</div>*/}
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
                                        <p className={'text-sm text-gray-500'}>Adonis Willer <span
                                          className={'italic text-gray-400 text-xs'}>#adonis</span></p>
                                    </div>
                                    <div className={'flex gap-3 items-center'}>
                                        <IconCircleFilled size={18} className={'text-black'}/>
                                        <p className={'text-sm text-gray-500'}>Nguyen Manh Tung <span
                                          className={'italic text-gray-400 text-xs'}>#tungnm</span></p>
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