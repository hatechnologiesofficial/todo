import { Button, Flex, Form, Input, Radio } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect } from "react"
import { useMatch, useNavigate } from "react-router-dom"

const EditTodo = () => {
    const navigate = useNavigate()
    const match = useMatch("/edit/:indexId")
    const [formRef] = useForm()

    const initialiseOldData = () => {
        const oldData = localStorage.getItem("todo")
        const oldJson = JSON.parse(oldData || "[]")
        const index = match.params.indexId

        if (index < oldJson.length) {
            const singleData = oldJson[Number(index)]
            formRef.setFieldsValue(singleData)
        } else {
            navigate("/")
        }
    }
    const handleEdit = (values) => {

        const oldData = localStorage.getItem("todo")
        const oldArray = JSON.parse(oldData || "[]")
        const index = match.params.indexId
        const singleData = oldArray[Number(index)]

        oldArray[Number(index)] = {
            ...singleData,
            ...values
        }
        localStorage.setItem("todo", JSON.stringify(oldArray))
        navigate("/")
    }

    useEffect(() => {
        initialiseOldData()
    }, [])

    return <Flex vertical>
        <Form
            form={formRef}
            initialValues={{
                title: "",
                description: "",
                priority: "low"
            }}
            onFinish={handleEdit}
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
                Update Todo
            </Button>
        </Form>

    </Flex>
}

export default EditTodo