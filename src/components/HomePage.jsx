import { AppstoreAddOutlined, DeleteOutlined, DownOutlined, FilterOutlined, SmileOutlined } from "@ant-design/icons"
import { Button, Collapse, Dropdown, Flex, FloatButton, Input, Layout, Space } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const HomePage = () => {

    const items = [
        {
            key: 'all',
            label: "All",
        },
        {
            key: 'pending',
            label: "Pending",
        },
        {
            key: 'completed',
            label: "Completed",
        },
    ];

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")

    const getTasks = async () => {

        const oldData = localStorage.getItem("todo")
        const oldJson = JSON.parse(oldData || "[]")
        console.log("oldJson", oldJson);

        setData(oldJson)
    }

    const handleComplete = (index) => {
        console.log("handleComplete", index);
        data[index].status = "completed"
        localStorage.setItem("todo", JSON.stringify(data))
        getTasks()
    }
    const handleDelete = (index) => {
        data.splice(index, 1)
        localStorage.setItem("todo", JSON.stringify(data))
        getTasks()
    }

    const handleFilter = (key) => {
        if (key == "all") {
            getTasks()
        } else if (key == "pending") {

            const oldData = localStorage.getItem("todo")
            const oldJson = JSON.parse(oldData || "[]")
            const filteredData = oldJson.filter(res => res.status === "pending")
            setData(filteredData)
        }
        else if (key == "completed") {

            const oldData = localStorage.getItem("todo")
            const oldJson = JSON.parse(oldData || "[]")
            const filteredData = oldJson.filter(res => res.status === "completed")
            setData(filteredData)
        }

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
                onSearch={setSearch}
            />
            <Dropdown
                menu={{ items, onClick: (e) => handleFilter(e.key) }}
                on={(e) => console.log("open change", e)}
            >
                <Button
                    icon={<FilterOutlined />}></Button>
            </Dropdown>
        </Flex>
        <Collapse
            collapsible="header"
            items={data.filter((res) => String(res.title).includes(search)).map((res, index) => ({
                key: index,
                label: res.title,
                children: res.description,
                extra: <Flex gap={"small"}>
                    {res.status == "pending" ?
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => handleComplete(index)}
                        >Make Complete</Button> : <></>}

                    <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(index)}
                    ></Button>
                </Flex>,
            }))} />

        <Link to={"/create"}>
            <FloatButton icon={<AppstoreAddOutlined />} />
        </Link>

    </Flex>

}

export default HomePage