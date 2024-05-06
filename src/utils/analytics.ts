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
            default:
                correctYear = year;
        };
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const age = correctYear + currentYear;
        return age;
    },

};