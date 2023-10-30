// функция для форматирование даты

export const formatDate = (dateString, options) => {

    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);

    return date.toLocaleString("ru", options);
};