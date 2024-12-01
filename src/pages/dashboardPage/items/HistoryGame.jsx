import {Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useEffect, useState} from "react";
import callApi from "../../../apis/GatewayApi.js";
import TableLoading from "../../../layout/TableLoading.jsx";
import TableEmpty from "../../../layout/TableEmpty.jsx";
import {formatDate} from "../../../common/common.js";

const HistoryGame = (props) => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllManagement()
    }, [page]);

    const getAllManagement = () => {
        setIsLoading(true)
        callApi('pkg_gmk_game.get_all_game', {
            page: page,
            size_page: 10
        }, (data) => {
            setData(data)
            if (data.length > 0) {
                setPages(Math.ceil(data[0].TB_TOTAL_ROW/10))
            }
            setIsLoading(false)
        }, (err) => {
            console.log(err)
            setIsLoading(false)
        })
    }

    const renderStatus = (item) => {
        if (item?.C_NEXT_PLAYER === localStorage.getItem('username')) {
            return <p
                className={'text-xs text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 leading-normal'}>Your turn!
            </p>
        } else if (item?.C_NEXT_PLAYER && item?.C_NEXT_PLAYER !== localStorage.getItem('username')) {
            return <p
                className={'text-xs text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 leading-normal'}>Your partner!
            </p>
        }

        if (item?.C_STATUS === 'WIN' && item?.C_WIN_PLAYER === localStorage.getItem('username')) {
            return <p>
                <span className={'text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-700 leading-normal'}>Your winnnn!</span> 🥳🥳🥳
            </p>
        }

        if (item?.C_STATUS === 'WIN' && item?.C_WIN_PLAYER !== localStorage.getItem('username')) {
            return <p>
                <span className={'text-default-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-700 leading-normal'}>Your lose! </span>😭😱🤕
            </p>
        }
    }

    return (
        <div>
            <div className={'flex flex-col gap-2.5 justify-center items-center'}>
                <Table
                    isStriped={true}
                    bottomContent={
                        pages > 0 ? (
                            <div className="flex w-full justify-end">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                    isDisabled={isLoading}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Match ID</TableColumn>
                        <TableColumn>Type</TableColumn>
                        <TableColumn>Enemy</TableColumn>
                        <TableColumn>Total step</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Created date</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data ?? []}
                        isLoading={isLoading}
                        loadingContent={<TableLoading/>}
                        emptyContent={<TableEmpty isLoading={isLoading}/>}
                    >
                        {(item) => (
                            <TableRow key={item?.PK_GMK_MATCH}>
                                <TableCell>{item?.TB_ROW_NUM}</TableCell>
                                <TableCell className={'font-mono'}>{item?.C_MATCH_ID}</TableCell>
                                <TableCell>{item?.C_TYPE}</TableCell>
                                <TableCell className={'text-sm'}>{item?.C_FULLNAME} <span className={'italic text-gray-400 text-xs'}>#{item?.C_USERNAME}</span></TableCell>
                                <TableCell>{item?.C_TOTAL_STEP}</TableCell>
                                <TableCell>{renderStatus(item)}</TableCell>
                                <TableCell>{formatDate(item?.C_CREATED_DATE)}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default HistoryGame