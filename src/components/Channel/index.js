import React, { Component } from 'react'
import { getChannels } from 'api/channel'
import { Select } from 'antd'
const { Option } = Select

export default class Channel extends Component {
    state = {
        // 频道列表数据
        channels: []
    }
    componentDidMount() {
        this.getChannelList()
    }
    getChannelList = async () => {
        const res = await getChannels()
        // console.log(res)
        this.setState({ channels: res.data.channels })
    }
    render() {
        return (
            <Select
                style={{ width: 200 }}
                placeholder="请选择文章频道"
                value={this.props.value}
                onChange={this.props.onChange}
            >
                {
                    this.state.channels.map(item => (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))
                }
            </Select>
        )
    }
}
