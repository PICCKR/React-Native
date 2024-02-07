import React, { useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { scale } from 'react-native-size-matters';
import { AppContext } from '../../context/AppContext';
import { commonStyles } from '../../utils/Styles/CommonStyles';
import { uiColours } from '../../utils/Styles/uiColors';
import { styles } from './Styles';

const InputText = ({
    inputContainer,
    hasTitle = true,
    isRequired,
    inputTitleStyles,
    inputTitle,
    starStyle,
    placeholder,
    editable,
    value,
    handleChange,
    secureTextEntry,
    maxLength,
    OnBlur,
    multiline,
    autoFocus,
    onPressIn,
    inPutStyles,
    keyboardType,
    inlineImageLeft,
    ErrorMsg,
    ShowError,
    renderLeftView = () => { },
    renderRightView = () => { },
    LeftViewStyles,
    showRenderRightView,
    textBox,
    hasLeftView
}) => {
    const { appStyles, isDark } = useContext(AppContext)

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.inputContainer, inputContainer]}>
            {hasTitle && <View style={[styles.inputTitle, inputTitleStyles]}>
                <Text style={[appStyles.smallTextBlack, { fontFamily: "Poppins-Medium" }]}>
                    {inputTitle}
                </Text>
                {isRequired && <Text style={[styles.star, starStyle]}>
                    *
                </Text>}
            </View>}
            <View style={[styles.inputBox, {
                borderColor: (isDark && !ShowError) ? uiColours.GRAYED_BUTTON : ShowError ? uiColours.RED : uiColours.LIGHT_GRAY,
            }, inPutStyles]}>
                {hasLeftView && renderLeftView()}
                <TextInput
                    onPressIn={onPressIn}
                    editable={editable}
                    placeholder={placeholder}
                    placeholderTextColor={uiColours.GRAY_TEXT}
                    style={{
                        ...styles.textBox,
                        ...appStyles.mediumTextBlack,
                        paddingLeft: hasLeftView ? scale(10) : scale(0),
                        width: showRenderRightView ? "90%" : "100%",
                        color: !isDark ? uiColours.BLACK_TEXT : uiColours.WHITE_TEXT,
                        ...textBox
                    }}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={handleChange}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    onBlur={OnBlur}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    spellCheck={false}
                    autoCorrect={false}
                    autoFocus={autoFocus}
                    inlineImageLeft={inlineImageLeft}
                />

                {showRenderRightView && <View style={[styles.rightViewStyles]}>
                    {renderRightView()}
                </View>}
            </View>

            {
                ShowError &&
                <Text style={[styles.errorText]}>{ErrorMsg}</Text>
            }

        </View >
        // </TouchableWithoutFeedback>
    );
}

export default InputText;
