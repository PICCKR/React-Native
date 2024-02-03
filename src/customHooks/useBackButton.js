// useBackButton.js
import { useEffect } from 'react';
import { BackHandler } from 'react-native';


const useBackButton = (handleBackPress) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, [handleBackPress]);
};

export default useBackButton;
