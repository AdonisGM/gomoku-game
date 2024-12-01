import {Button, Card, CardBody, Spacer} from "@nextui-org/react";
import {IconCircleFilled, IconPower} from "@tabler/icons-react";
import Board from "./Board.jsx";
import {useNavigate} from "react-router-dom";
import {socket} from "../../apis/socket.js";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import InputText from "../../components/customInput/InputText.jsx";

const Game = () => {
    const [isConnected, setisConnected] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [isStart, setIsStart] = useState(false)

    const [matchId, setMatchId] = useState(undefined);
    const [infoGame, setInfoGame] = useState(undefined)
    const [listMember, setListMember] = useState([])
    const [listCell, setListCell] = useState([])
    const [side, setSide] = useState(undefined)

    const [isLoading, setIsLoading] = useState(false)

    const [logs, setLogs] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fMember = listMember.find((e) => {
            return e.C_USERNAME === localStorage.getItem('username')
        })
        if (fMember) {
            console.log(fMember)
            setSide(fMember.C_ORDER)
        }
    }, [listMember]);

    useEffect(() => {
        // Connect to server
        socket.connect();

        // Handle event
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
		socket.on('info', onReceiveInfo)
		socket.on('listMember', onListMember)
		socket.on('unauthorized', onUnauthorized)
		socket.on('error', onError)
        socket.on('move', onMove)
        socket.on('allMove', onAllMove)

        // Clear up listener
        return () => {
            socket.disconnect();
        }
    }, []);

	// Handle event socket
    const onConnect = () => {
        setisConnected(true)
        writeLog('info', 'User connected')
    }

    const onDisconnect = () => {
        setisConnected(false)
        writeLog('info', 'User disconnected')
    }

    const onListMember = (listMember) => {
        setListMember(listMember)
    }

	const onReceiveInfo = (message) => {
		console.log('info message', message)

        switch (message.action) {
            case 'createGame':
                onReceiveInfo_createGame(message.data);
                break;
            case 'joinGame':
                onReceiveInfo_joinGame(message.data);
                break;
            case 'startGame':
                setIsStart(true)
                break;
            case 'infoGame':
                console.log(message.data)
                setInfoGame(message.data[0])
                break;
            default:
                //
        }
	}

    const onReceiveInfo_createGame = (data) => {
        setInGame(true);
        setMatchId(data.matchId)
        setIsLoading(false)
    }

    const onReceiveInfo_joinGame = (data) => {
        setInGame(true);
        setIsLoading(false)
    }

	const onUnauthorized = () => {
		navigate('/')
	}

    const onError = (err) => {
        console.log(err)
    }

    const writeLog = (type, message) => {
		console.log(`${type}: ${message}`)
    }

    const onMove = (message) => {
        console.log(message)
        const cell = message[0]
        listCell.push({
            x: cell.C_LOCATION_X,
            y: cell.C_LOCATION_Y,
            side: cell.C_ORDER,
        })
        setListCell([...listCell])
    }

    const onAllMove = (message) => {
        console.log(message)
        const mappingCells = message.map((cell) => {
            return {
                x: cell.C_LOCATION_X,
                y: cell.C_LOCATION_Y,
                side: cell.C_ORDER,
            }
        })
        setListCell(mappingCells)
    }

	// Handle event client
    const handleExitGame = () => {
        console.log('game exit')
        navigate('/dashboard')
    }

	const handleClickNewGame = () => {
		socket.emit('createGame')
        setIsLoading(true)
	}

    const onSubmit = (data) => {
        socket.emit('joinGame', {
            matchId: data.matchId,
        })
        setIsLoading(true)
        setMatchId(data.matchId)
    }

    function handleAddCell (cell) {
        if ((infoGame?.C_NEXT_PLAYER !== localStorage.getItem('username')) || infoGame?.C_STATUS !== 'PLAYING') {
            return
        }

        listCell.push({x: cell.x, y: cell.y, side: side})
        setListCell([...listCell])

        socket.emit('move', {
            matchId: matchId,
            locationX: cell.x,
            locationY: cell.y
        })

        infoGame.C_NEXT_PLAYER = undefined
        setInfoGame({...infoGame})
    }

    const { control, handleSubmit, reset, setValue, getValues, watch } = useForm({
        defaultValues: {
            matchId: '',
        }
    })

    return (
        <div className={'w-screen h-screen p-10'}>
            <div className={'w-full h-full bg-gray-50 border-1 border-gray-200 rounded-3xl overflow-hidden relative shadow-[inset_0_0px_60px_-15px_rgba(0,0,0,0.3)]'}>
                {isStart && (
                    <Board
                        side={side}
                        listCell={listCell}
                        onAddCell={handleAddCell}
                    />
                )}

                {!inGame && (
					<div className={'w-full h-full flex justify-center items-center'}>
						<Card>
                            <CardBody>
                                <div className={'flex items-end gap-3'}>
                                    <div className={'w-44'}>
                                        <Button
                                            className={'w-full'}
                                            color="success"
                                            size={'sm'}
                                            variant="flat"
                                            onPress={handleClickNewGame}
                                            isLoading={isLoading}
                                            isDisabled={isLoading}
                                        >
                                            Create game!
                                        </Button>
                                    </div>
                                    <form className={'w-44'} onSubmit={handleSubmit((data) => onSubmit(data))}>
                                        <InputText
                                            name={'matchId'}
                                            label={'Match Id'}
                                            control={control}
                                        />
                                        <Spacer y={2}/>
                                        <Button
                                            type="submit"
                                            className={'w-full'}
                                            color="warning"
                                            size={'sm'}
                                            variant="flat"
                                            isLoading={isLoading}
                                            isDisabled={isLoading}
                                        >
                                            Join game
                                        </Button>
                                    </form>
                                </div>
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
                {matchId && <div className={'absolute top-3 left-3'}>
                    <Card className={''} isPressable={true} onPress={() => {
                        navigator.clipboard.writeText(matchId);
                    }}>
                        <CardBody>
                            <div>
                                <p className={'text-sm text-gray-500'}>ID table: <b>{matchId}</b></p>
                            </div>
                            <div>
                                <p className={'text-sm text-gray-500'}>List players:</p>
                                <div className={'mt-2'}>
                                    {listMember.map((item, index) => {
                                        return (
                                            <div key={index} className={'flex gap-3 items-center'}>
                                                <IconCircleFilled size={18} className={item.C_ORDER === 2 ? 'text-gray-600' : 'text-orange-500'}/>
                                                <p className={'text-sm text-gray-500'}>{item.C_FULLNAME} <span
                                                    className={'italic text-gray-400 text-xs'}>#{item.C_USERNAME}</span></p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={'mt-2'}>
                                {infoGame?.C_NEXT_PLAYER === localStorage.getItem('username') && <p className={'text-sm text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 leading-normal'}>Your turn!</p>}
                                {infoGame?.C_STATUS === 'WIN' && infoGame?.C_WIN_PLAYER === localStorage.getItem('username') && <p><span className={'text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-700 leading-normal'}>Your winnnn!</span> 🥳🥳🥳</p>}
                                {infoGame?.C_STATUS === 'WIN' && infoGame?.C_WIN_PLAYER !== localStorage.getItem('username') && <p><span className={'text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-700 leading-normal'}>Your lose! </span>😭😱🤕</p>}
                            </div>
                        </CardBody>
                    </Card>
                </div>}
            </div>
        </div>
    )
}

export default Game