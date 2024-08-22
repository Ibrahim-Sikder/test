import React from 'react';
import { Form, Input } from 'antd';

const EditableCell = ({
    title,
    editable,
    children,
    ...restProps
}) => {
    const inputNode = editable ? (
        <Input.TextArea
            style={{
                resize: 'none',
                outline: 'none',
                boxShadow: 'none',
            }}
            autoFocus={false}
        />
    ) : (
        children
    );

    return (
        <td {...restProps}>
            {editable ? (
                <Form.Item
                    style={{ margin: 0 }}
                    name={restProps['data-index']}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;
