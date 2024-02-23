export const analytics = {

    getSiteAge(year, era) {
        let correctYear = 0;
        switch(era){
            case "AD":
                correctYear = -year;
                break;
            case "BC":
                correctYear = year;
                break;
            case "Unknown":
                correctYear = null;
                break;
            default:
                correctYear = year;
        };
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        let age = null;
        if(era === "Unknown"){
            age = "Unknown";
        } else {
            age = correctYear + currentYear;
        }
        return age;
    },

};