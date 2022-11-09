export const getItem = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
   
export const setItem = (key: string, value: any) => {
    const data: string = JSON.stringify(value);
    localStorage.setItem(key, data);
}