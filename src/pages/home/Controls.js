import React from 'react'
import { Button, Icon } from 'antd';
import { getValue, setValue } from '../../store/valueStore'
const Controls = () => {
    return (
        <div>
            <Button type="danger" shape="circle" icon="minus" onClick={() => {
                setValue(getValue() - 1)
            }} />
            <Button type="primary" shape="circle" icon="plus" onClick={() => {
                setValue(getValue() + 1)
            }} />
        </div>
    )
}

export default Controls;