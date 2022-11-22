export const stringToDate = (date) => {
    
    let realDate = new Date(date);
    return (realDate);
};
export const getMonthDay = (date) => {

    let months = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    let realDate = new Date(date);

    return (realDate.getDay().toString() + " " + months[realDate.getMonth()] );
};
export const getTime = (date) => {

    let realDate = new Date(date);

    return (realDate.toLocaleTimeString().slice(0,-3) );
};
