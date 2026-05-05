export const getTransactions = () => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
};

export const saveTransactions = (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
};