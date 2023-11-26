// функция для валидация пароля

export const passwordValidation = (passStr) => {
    if(passStr.split("").length >= 6) {
        return true;
    } else {
        return false;
    }
};