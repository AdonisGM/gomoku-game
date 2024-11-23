import {Card, CardBody} from "@nextui-org/react";
import PlayGame from "./items/PlayGame.jsx";

const Dashboard = (props) => {
    return (
        <div className={'grid grid-cols-4 grid-rows-3 gap-4'}>
            <div>
                <Card
                    shadow={'sm'}
                    isPressable={true}
                    className={'h-full w-full'}
                >
                    <CardBody>
                        <PlayGame/>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard