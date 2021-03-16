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

export const VALIDATION_RULES = {
    name: {
        required: true,
        maxLength: 255,
        minLength: 1,
    },
    userName: {
        required: true,
        maxLength: 255,
        minLength: 1,
    },
    email: {
        required: true,
        pattern: {
            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            message: "Email chưa hợp lệ",
        },
    },
    phone: {
        required: true,
        pattern: {
            value: /^([0-9]{10,11})$/,
            message: "Số điện thoại phải từ 10 đến 11 ký tự.",
        },
    },
    address: {
        required: true,
    },
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
