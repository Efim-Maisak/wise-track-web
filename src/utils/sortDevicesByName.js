// функция сортировки массива по алфавиту

export const sortDevicesByName = (devicesArr) => {
    if (devicesArr) {
        const sortedArr = devicesArr.sort((a, b) => {
            if (a.device_name < b.device_name) return -1;
            if (a.device_name > b.device_name) return 1;
            return 0;
        });
        return sortedArr;
    };
};