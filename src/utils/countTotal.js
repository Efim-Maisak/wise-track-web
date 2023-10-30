// функция для раcчета суммы показаний счетчиков одного типа. Принимает в аргументы объект с показаниями и строку с типом счетчика

export const countTotal = (data, deviceTypeCode) => {
    const dataArr = Object.values(data)[0];

    if(!dataArr.some((item) => item.device_id?.device_type_id?.type_code === deviceTypeCode)) {
        return ["*", "*"];
    } else {
        const sumTotal = dataArr.filter(item => {
            if(item.device_id.device_type_id.type_code === deviceTypeCode) return item
        }).reduce((acc, item) => acc + item.value, 0);

        const sumMohtly = dataArr.filter(item => {
            if(item.device_id.device_type_id.type_code === deviceTypeCode) return item
        }).reduce((acc, item) => acc + item.monthly_change, 0);

        return [sumTotal, sumMohtly];
    }
}