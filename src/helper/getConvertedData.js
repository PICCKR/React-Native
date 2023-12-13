// getConvertedData function in 'getConvertedData.js' file
export const getConvertedData = (data, key) => {
    // Perform your data conversion logic here
    const convertedData = data.map(item => {
      return {
        ...item,
        itemName: item[key] // Setting 'itemName' based on 'item'
      };
    });
    return convertedData;
  };