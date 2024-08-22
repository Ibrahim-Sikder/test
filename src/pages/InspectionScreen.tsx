import React, { useState } from 'react';
import { Table, Input, Form, Row, Col, Button, Space, Select, Dropdown, Menu, Typography } from 'antd';
import './InspectionScreen.css';
import { Option } from 'antd/es/mentions';
import { CameraOutlined, DownloadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button as AntButton } from 'antd';
import laptop from '../../src/assets/laptop.jfif'
import EditableCell from '../components/Task/EditableCell';
import Layout from '../components/ui/Layout';



interface TableData {
    id: string;
    default: string;
    difference: string;
    estimated: string;
    result: number;
    target: number;
    threshold: string;
    resultStatus: string;
}

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'default',
        dataIndex: 'default',
        key: 'default',
    },
    {
        title: 'estimated',
        dataIndex: 'estimated',
        key: 'estimated',
        editable: true,
        width: 50
    },
    {
        title: 'difference',
        dataIndex: 'difference',
        key: 'difference',
    },
    {
        title: 'target',
        dataIndex: 'target',
        key: 'target',
    },
    {
        title: 'threshold',
        dataIndex: 'threshold',
        key: 'threshold',
    },
    {
        title: 'result',
        dataIndex: 'result',
        key: 'result',
    },
    {
        title: 'comment',
        dataIndex: 'comment',
        key: 'comment',
        width: 300,
        editable: true,
        className: 'no-border',
    },
];

const Task = () => {
    const [form] = Form.useForm();
    const headers = [
        { title: "記 号", dataIndex: "id" },
        { title: "設計寸法", dataIndex: "default" },
        { title: "実測寸法", dataIndex: "estimated", editable: true },
        { title: "公差", dataIndex: "difference" },
        { title: "目標値", dataIndex: "target" },
        { title: "限界値", dataIndex: "threshold" },
        {
            title: "判定",
            dataIndex: "result",
            render: (text: number) => (
                <AntButton
                    type="primary"
                    style={{
                        backgroundColor: text === 1 ? 'green' : 'red',
                        borderColor: text === 1 ? 'green' : 'red',
                        color: 'white'
                    }}
                    disabled={text === 0}
                >
                    {text === 1 ? 'Pass' : 'Fail'}
                </AntButton>
            )
        },
        { title: "備考", dataIndex: "remark" },
    ];

    const mergedColumns = columns.map(col => ({
        ...col,
        onCell: record => ({
            record,
            editable: col.editable,
            title: col.title,
            editable: col.editable,
            dataIndex: col.dataIndex,
            name: col.dataIndex,
        }),
    }));
    const apiResponse = {
        image: "/9j/4AAQSkZJRg",
        json: {
            x_1: {
                default: 309.96466666666663,
                difference: -0.8466666666666924,
                estimated: 310.8113333333333,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_10: {
                default: 309.96466666666663,
                difference: 1.0159999999999627,
                estimated: 308.94866666666667,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_11: {
                default: 869.9499999999999,
                difference: 4.487333333333254,
                estimated: 865.4626666666667,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            x_12: {
                default: 119.97266666666667,
                difference: -0.16933333333332712,
                estimated: 120.142,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_13: {
                default: 689.9486666666667,
                difference: 2.032000000000039,
                estimated: 687.9166666666666,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_14: {
                default: 119.97266666666667,
                difference: -0.5926666666666591,
                estimated: 120.56533333333333,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_15: {
                default: 499.95666666666665,
                difference: 0.8466666666666356,
                estimated: 499.11,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_16: {
                default: 119.97266666666667,
                difference: -0.7620000000000005,
                estimated: 120.73466666666667,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_2: {
                default: 869.9499999999999,
                difference: 4.487333333333254,
                estimated: 865.4626666666667,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            x_3: {
                default: 119.97266666666667,
                difference: -3.9793333333333294,
                estimated: 123.952,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            x_4: {
                default: 119.97266666666667,
                difference: -1.0159999999999911,
                estimated: 120.98866666666666,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_5: {
                default: 869.9499999999999,
                difference: 1.8626666666666551,
                estimated: 868.0873333333333,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_6: {
                default: 869.9499999999999,
                difference: 3.386666666666656,
                estimated: 866.5633333333333,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            x_7: {
                default: 499.95666666666665,
                difference: -0.4233333333333462,
                estimated: 500.38,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_8: {
                default: 689.9486666666667,
                difference: 1.947333333333404,
                estimated: 688.0013333333333,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            x_9: {
                default: 869.9499999999999,
                difference: 3.3019999999999072,
                estimated: 866.648,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_1: {
                default: 869.9499999999999,
                difference: 1.354666666666617,
                estimated: 868.5953333333333,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_10: {
                default: 119.97266666666667,
                difference: -2.6246666666666556,
                estimated: 122.59733333333332,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_11: {
                default: 119.97266666666667,
                difference: -1.693333333333328,
                estimated: 121.666,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_12: {
                default: 309.96466666666663,
                difference: 9.313333333333333,
                estimated: 300.6513333333333,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_13: {
                default: 119.97266666666667,
                difference: -1.269999999999996,
                estimated: 121.24266666666666,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_14: {
                default: 499.95666666666665,
                difference: 10.583333333333314,
                estimated: 489.37333333333333,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_15: {
                default: 119.97266666666667,
                difference: -0.423333333333332,
                estimated: 120.396,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_16: {
                default: 119.97266666666667,
                difference: -2.2860000000000014,
                estimated: 122.25866666666667,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_2: {
                default: 869.9499999999999,
                difference: 4.741333333333273,
                estimated: 865.2086666666667,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_3: {
                default: 869.9499999999999,
                difference: 2.4553333333333285,
                estimated: 867.4946666666666,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_4: {
                default: 689.9486666666667,
                difference: 10.83733333333339,
                estimated: 679.1113333333333,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_5: {
                default: 689.9486666666667,
                difference: 11.768666666666718,
                estimated: 678.18,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_6: {
                default: 499.95666666666665,
                difference: 10.837333333333333,
                estimated: 489.1193333333333,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_7: {
                default: 869.9499999999999,
                difference: 1.9473333333332903,
                estimated: 868.0026666666666,
                result: 0,
                target: 1,
                threshold: 2.5,
            },
            y_8: {
                default: 869.9499999999999,
                difference: 3.640666666666675,
                estimated: 866.3093333333333,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
            y_9: {
                default: 309.96466666666663,
                difference: 10.498666666666622,
                estimated: 299.466,
                result: 1,
                target: 1,
                threshold: 2.5,
            },
        },
    };

    const initialTableData: TableData[] = Object.entries(apiResponse.json).map(
        ([key, value]) => ({
            id: key,
            default: value.default.toFixed(1),
            difference: value.difference.toFixed(1),
            estimated: value.estimated.toFixed(1),
            result: value.result,
            target: value.target,
            threshold: value.threshold.toFixed(1),
            resultStatus: value.result === 1 ? 'Pass' : 'Fail',
        })
    );

    const [tableData, setTableData] = useState<TableData[]>(initialTableData);


    const EditableTable = () => (
        <Table
            components={{
                body: {
                    cell: EditableCell,
                },
            }}
            bordered
            columns={mergedColumns}
            dataSource={tableData}
            pagination={false}
            className="custom-table"
            scroll={{ x: true }}
        />
    );

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(tableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inspection Data");
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "inspection_data.xlsx");
    };
    const handleSubmit = () => {
        console.log('Submit button clicked');
    };

    const handleCancel = () => {
        console.log('Cancel button clicked');
    };

    const downloadCSV = () => {
        const ws = XLSX.utils.json_to_sheet(tableData);
        const csv = XLSX.utils.sheet_to_csv(ws);
        saveAs(new Blob([csv], { type: "text/csv" }), "inspection_data.csv");
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [headers.map(header => header.title)],
            body: tableData.map(row => headers.map(header => row[header.dataIndex])),
        });
        doc.save('inspection_data.pdf');
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleMenuClick = (e: any) => {
        switch (e.key) {
            case 'excel':
                downloadExcel();
                break;
            case 'csv':
                downloadCSV();
                break;
            case 'pdf':
                downloadPDF();
                break;
            default:
                break;
        }
    };


    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="excel" icon={<DownloadOutlined />}>
                Download Excel
            </Menu.Item>
            <Menu.Item key="csv" icon={<DownloadOutlined />}>
                Download CSV
            </Menu.Item>
            <Menu.Item key="pdf" icon={<DownloadOutlined />}>
                Download PDF
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <div className='p-10 space-y-5 md:spacey-y-0  shadow-lg rounded-lg my-10' >
                <Form layout="vertical">
                    <Row gutter={16}>

                        {[
                            { label: "製作会社︓", defaultValue: "A⽊材" },
                            { label: "階︓", defaultValue: "〇〇F" },
                            { label: "⼯区︓", defaultValue: "〇〇" },
                            { label: "符号:", defaultValue: "WC1〇〇" },
                            { label: "検査項⽬︓", defaultValue: "全体" },
                            { label: "ステータス︓", defaultValue: "LSB打設" },
                        ].map((item, index) => (
                            <Col xs={24} sm={12} md={4} key={index}>
                                <Form.Item
                                    label={item.label}

                                >
                                    <Space direction="vertical" style={{ width: '100%', display: 'flex' }}>
                                        <Select
                                            defaultValue={item.defaultValue}
                                            style={{ flex: 1 }}
                                            onChange={handleChange}
                                        >
                                            <Option value="1">{item.defaultValue}</Option>

                                        </Select>
                                    </Space>
                                </Form.Item>
                            </Col>
                        ))}
                        <Col xs={24} sm={12} md={4} >
                            <Form.Item>
                                <Button icon={<CameraOutlined />} type="primary">
                                    📷                                    </Button>
                            </Form.Item>
                        </Col>
                        <Col><Dropdown overlay={menu}>
                            <Button
                                type="default"
                                icon={<DownloadOutlined />}
                                style={{
                                    marginLeft: 8,
                                    backgroundColor: '#40a9ff',
                                    borderColor: '#40a9ff',
                                    color: 'white'
                                }}
                            >
                                Download
                            </Button>
                        </Dropdown></Col>
                    </Row>

                </Form>


                <Row gutter={[16, 16]} align="top">
                    <Col
                        xs={24}
                        md={8}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            flexDirection: 'column',
                            alignSelf: 'end',

                        }}


                    >
                        <img
                            className="w-64 h-64  object-cover"
                            src={laptop}
                            alt="laptop"
                            style={{ alignSelf: 'center', marginTop: 'auto' }}
                        />
                    </Col>
                    <Col xs={24} md={16}>
                        <EditableTable />
                    </Col>
                </Row>




            </div>
            <Form.Item style={{ textAlign: 'right' }}>
                <Button type="default" onClick={handleCancel}
                    style={{
                        marginRight: 8,
                        backgroundColor: '#f5222d',
                        borderColor: '#f5222d',
                        color: 'white'
                    }}>
                    Cancel
                </Button>
                <Button type="primary"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#1890ff',
                        borderColor: '#1890ff',
                        color: 'white'
                    }}
                >
                    Submit
                </Button>
            </Form.Item>
        </Layout>
    );
};

export default Task;
