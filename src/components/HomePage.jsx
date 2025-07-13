import { AppstoreAddOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons"
import { Button, Collapse, Flex, FloatButton, Input, Layout } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HomePage = () => {

    const [data, setData] = useState([])

    const getTasks = async () => {

        const oldData = localStorage.getItem("todo")
        const oldJson = JSON.parse(oldData || "[]")
        console.log("oldJson", oldJson);

        setData(oldJson)
    }
    useEffect(() => {
        getTasks()
    }, [])

    return <Flex style={{ padding: 10 }} vertical gap={"large"}>
        <Flex
            align="center"
            gap={"small"}
            justify="space-between" style={{ width: "100%" }}>
            <img
                style={{ height: 30, width: 30 }}
                src="/assets/image/logo.webp" alt="logo" />
            <Input.Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
            />
            <Button
                icon={<FilterOutlined />}></Button>
        </Flex>

        <Collapse
            collapsible="header"
            items={data.map((res,index) => ({
                key: index,
                label: res.title,
                children: res.description,
                extra: <Flex gap={"small"}>
                    <Button type="primary" size="small">Make Complete</Button>
                    <Button size="small" danger icon={<DeleteOutlined />}></Button>
                </Flex>,
            }))} />

        <Link to={"/create"}>
            <FloatButton icon={<AppstoreAddOutlined />} />
        </Link>

    </Flex>

}

export default HomePage