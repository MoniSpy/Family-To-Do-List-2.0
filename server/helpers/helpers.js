function getDate(date){
    let day = ("0" + date.getDate()).slice(-2);  //Get day
    let month = ("0" + (date.getMonth() + 1)).slice(-2);// get current month
    let year = date.getFullYear(); // get current year
    let shorter_Date=(day + "-" + month + "-" + year);
    return shorter_Date;
  }
  export {getDate};