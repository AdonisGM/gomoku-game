import {Card, CardBody} from "@nextui-org/react";
import PlayGame from "./items/PlayGame.jsx";
import HistoryGame from "./items/HistoryGame.jsx";

const Dashboard = (props) => {
    return (
        <div className={'grid grid-cols-4 grid-rows-3 gap-4'}>
            <div>
                <Card
                    shadow={'sm'}
                    isPressable={true}
                    className={'h-36 w-full'}
                >
                    <CardBody className={'flex justify-center items-center overflow-hidden'}>
                        <PlayGame/>
                    </CardBody>
                </Card>
            </div>
            <div className={'col-span-3'}>
                {/*<Card*/}
                {/*    shadow={'sm'}*/}
                {/*    isPressable={true}*/}
                {/*    className={'h-full w-full'}*/}
                {/*>*/}
                {/*    <CardBody>*/}
                        <HistoryGame/>
                {/*    </CardBody>*/}
                {/*</Card>*/}
            </div>
        </div>
    )
}

export default Dashboard