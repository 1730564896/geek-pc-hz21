import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Button, Space, Input, Radio, Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'
import { addArticle, getArticleById, updateArticle } from 'api/article'

export default class ArticlePublish extends Component {
    state = {
        // 文章的封面类型
        type: 0,
        // 用于控制上传的图片以及图片的显示
        fileList: [],
        previewOpen: false,
        previewImage: '',
        id: this.props.match.params.id
    }
    formRef = React.createRef()
    async save(values, draft) {
        const { type, fileList } = this.state
        if (fileList.length !== type) {
            return message.warn('上传图片数量不正确')
        }
        const images = fileList.map(item => {
            return item.url || item.response.data.url
        })
        // console.log(images)
        if (this.state.id) {
            // 有id,则为修改文章
            await updateArticle({
                ...values,
                cover: {
                    type,
                    images
                },
                id: this.state.id
            },
                draft
            )
            message.success('编辑成功')
        } else {
            // 无id，添加文章
            await addArticle({
                ...values,
                cover: {
                    type,
                    images
                }
            },
                draft
            )
            message.success('添加成功')
        }
        this.props.history.push('/home/list')
    }
    onFinish = (values) => {
        // console.log(values)
        // const { type, fileList } = this.state
        // if (fileList.length !== type) {
        //     return message.warn('上传图片数量不正确')
        // }
        // const images = fileList.map(item => {
        //     return item.url || item.response.data.url
        // })
        // // console.log(images)
        // // 添加文章
        // addArticle({
        //     ...values,
        //     cover: {
        //         type,
        //         images
        //     }
        // })
        // message.success('添加成功')
        // this.props.history.push('/home/list')
        this.save(values, false)
    }
    addDraft = async () => {
        const values = await this.formRef.current.validateFields()
        // console.log(values)
        this.save(values, true)
    }
    changeType = (e) => {
        // console.log(e)
        this.setState({
            type: e.target.value,
            fileList: []
        })
    }
    uploadImages = ({ fileList }) => {
        // console.log(e)
        this.setState({ fileList })
    }
    handlePreview = (file) => {
        // 注意：如果图片数组fileList是将来回显得，则通过url就可以访问到，如果是通过上传的，需要通过file.response.data.file才能访问到
        // console.log(file)
        this.setState({
            previewOpen: true,
            previewImage: file.url || file.response.data.url
        })
    }
    handleCancel = () => {
        this.setState({
            previewOpen: false,
            previewImage: ''
        })
    }
    beforeUpload = (file) => {
        // 上传前的校验
        // 判断图片大小不能超过500k 只能上传png jpeg格式
        // console.log(file)
        if (file.size >= 1024 * 500) {
            message.warn('上传文件不能超过500kb')
            return Upload.LIST_IGNORE
        }
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
            message.warn('只能上传jpg或png格式')
            return Upload.LIST_IGNORE
        }
        return true
    }
    async componentDidMount() {
        if (this.state.id) {
            // 有id，则为编辑文章，需要发送请求获取文章详情
            const res = await getArticleById(this.state.id)
            // console.log(res)
            const values = {
                ...res.data,
                type: res.data.cover.type
            }
            // 给表单设置values数据
            this.formRef.current.setFieldsValue(values)
            // 设置fileList，回显图片
            const fileList = res.data.cover.images.map(item => {
                return {
                    url: item
                }
            })
            // console.log(fileList)
            this.setState({
                fileList,
                type: res.data.cover.type
            })
        }
    }
    render() {
        return (
            <div className={styles.root}>
                <Card
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/home">首页</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {this.state.id ? '编辑文章' : '发布文章'}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                >
                    <Form
                        ref={this.formRef}
                        labelCol={{ span: 4 }}
                        size="large"
                        onFinish={this.onFinish}
                        validateTrigger={['onChange']}
                        initialValues={{ type: this.state.type }}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '文章标题不能为空'
                                }
                            ]}
                        >
                            <Input
                                style={{ width: 400 }}
                                placeholder="请输入文章标题"
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="频道"
                            name="channel_id"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择频道'
                                }
                            ]}
                        >
                            <Channel></Channel>
                        </Form.Item>
                        <Form.Item label="封面" name="type">
                            <Radio.Group onChange={this.changeType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 上传组件 */}
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            {this.state.type !== 0 && (
                                <Upload
                                    listType="picture-card"
                                    fileList={this.state.fileList}
                                    name="image"
                                    action={`${baseURL}upload`}
                                    onChange={this.uploadImages}
                                    onPreview={this.handlePreview}
                                    beforeUpload={this.beforeUpload}
                                >
                                    {this.state.fileList.length < this.state.type && <PlusOutlined />}
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: '文章标题不能为空'
                                }
                            ]}
                        >
                            <ReactQuill theme="snow" placeholder="请输入文章的内容" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">{this.state.id ? '编辑文章' : '发布文章'}</Button>
                                <Button onClick={this.addDraft}>存入草稿</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
                <Modal open={this.state.previewOpen} title="图片预览" footer={null} onCancel={this.handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={this.state.previewImage}
                    />
                </Modal>
            </div>
        )
    }
}
