import { AppstoreAddOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons"
import { Button, Collapse, Flex, FloatButton, Input, Layout } from "antd"

const HomePage = () => {

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
        items={[
            {
                key: '1',
                label: 'This is panel header 1',
                children: <div>{"dmmy"}</div>,
                extra: <Flex gap={"small"}>
                    <Button type="primary" size="small">Make Complete</Button>
                    <Button size="small" danger icon={<DeleteOutlined />}></Button>
                </Flex>,
            },
            {
                key: '2',
                label: 'This is panel header 2',
                children: <div>{"dmmy 2"}</div>,
                extra: <Flex gap={"small"}>
                    <Button type="primary" size="small">Make Complete</Button>
                    <Button size="small" danger icon={<DeleteOutlined />}></Button>
                </Flex>,
            },
        ]} />

        <FloatButton icon={<AppstoreAddOutlined />}/>

    </Flex>

}

export default HomePage