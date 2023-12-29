import { ScrollView, Text, View } from 'react-native'
import React, { useCallback, useContext, useMemo } from 'react'
import styles from './Styles';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AppContext } from '../../context/AppContext';
import { uiColours } from '../../utils/Styles/uiColors';



const DragableBottomSheet = ({
    handleButtomSheet = () => { },
    forwardRef,
    children,
    enablePanDownToClose,
    index = 1
}) => {

    const { isDark } = useContext(AppContext)
    // variables
    const snapPoints = useMemo(() => ['20%', "40%", "60%", '80%',], []);

    // callbacks
    const handleSheetChanges = (index) => {
        console.log('handleSheetChanges', index);
        handleButtomSheet(index)
    };

    // const renderBackdrop = useCallback((props) =>
    //     <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    return (

        <BottomSheet
            ref={forwardRef}
            index={index}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={enablePanDownToClose}
            // backdropComponent={renderBackdrop}
        >
            <View style={[styles.contentContainer, {
                backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT
            }]}>
                {children}
            </View>
        </BottomSheet>

    )
}

export default DragableBottomSheet

