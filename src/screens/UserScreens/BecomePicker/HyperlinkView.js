import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import CheckBox from '../../../components/CheckBox/CheckBox'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'

const HyperlinkView = ({
    handleCheck,
    selected,
    leftText,
    rightText
}) => {
    const { appStyles, isDark} = useContext(AppContext)
    return (
        <View style={styles.termsView}>
            <CheckBox
                handleCheck={handleCheck}
                selected={selected}
            />
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={appStyles.smallTextBlack}>
                    {leftText}
                </Text>
                <TouchableOpacity
                    style={styles.linkTextView}
                >
                    <Text style={appStyles.smallTextPrimary}> {rightText} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HyperlinkView