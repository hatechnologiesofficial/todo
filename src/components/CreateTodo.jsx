import { Button, Flex, Form, Input, Radio } from "antd"
import { useNavigate } from "react-router-dom";

const CreateTodo = () => {

    const natigvate = useNavigate();


    const handleSubmit = async (value) => {
        console.log("value", value);
        const oldStr = localStorage.getItem("todo");
        const oldJson = JSON.parse(oldStr || "[]");
        oldJson.push({
            ...value,
            status: "pending",
            date: new Date().toISOString()
        });
        localStorage.setItem("todo", JSON.stringify(oldJson));
        natigvate("/");
    }
    return <Flex vertical>
        <Form
            initialValues={{
                title: "",
                description: "",
                priority: "low"
            }}
            onFinish={handleSubmit}
            layout="vertical">
            <Form.Item
                label="Title"
                name={"title"}
                rules={[{ required: true, message: "Title is required" }]}>
                <Input placeholder="Enter todo title" />
            </Form.Item>

            <Form.Item
                label="Description"
                name={"description"}
                rules={[{ required: true, message: "Description is required" }]}>
                <Input.TextArea placeholder="Enter todo description" rows={4} />
            </Form.Item>

            <Form.Item label="Priority" name={"priority"}>
                <Radio.Group block options={[
                    { label: 'Low', value: 'low' },
                    { label: 'High', value: 'high' },
                ]} defaultValue="low" />
            </Form.Item>

            <Button
                block
                type="primary" htmlType="submit">
                Create Todo
            </Button>
        </Form>

    </Flex>

}
export default CreateTodo