export const ERROR_MESSAGES: any = {
    required: "Thông tin này bắt buộc",
    maxLength: "Nhập từ 1 đến 255 ký tự",
    minLength: "Nhập từ 1 đến 255 ký tự",
    // pattern: "",
    // min: "",
    // max: "",
    // validate: "",
    // valueAsNumber: "",
    // valueAsDate: "",
    // setValueAs: "",
};

export const getErrorMessage = (
    typeError: string,
    defaultMessage: string | ""
) => {
    if (typeError && ERROR_MESSAGES[typeError]) {
        return ERROR_MESSAGES[typeError];
    }
    return defaultMessage;
};
