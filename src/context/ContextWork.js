import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from 'react'

export const WorkContext = createContext()

const ContextWork = ({ children }) => {
    const a = "nebi"
    return (
        <WorkContext.Provider value={{a}}>
            {
                children
            }
        </WorkContext.Provider>
    )
}

export default ContextWork

const styles = StyleSheet.create({})