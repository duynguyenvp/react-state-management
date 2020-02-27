import React from 'react'
import { useValueStore } from '../../store/valueStore'
import Controls from './Controls'
const Home = props => {
    const value = useValueStore()
    return (
        <>
            <h1>Value: {value}</h1>
            <Controls />
        </>
    )
}

export default Home;