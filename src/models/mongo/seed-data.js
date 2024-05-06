export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret"
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "secret"
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "secret"
        }
    },
    placemarks: {
        _model: "Placemark",
        schull: {
            name: "Schull",
            category: "Bronze Age",
            userid: "->users.homer"
        },
    },
    sites: {
        _model: "Site",
        site_1: {
            title: "Altar",
            year: 2000,
            era: "BC",
            latitude: 51.513756,
            longitude: -9.644037,
            description: "Altar Wedge Tomb is a wedge-shaped gallery grave and national monument located outside the village of Schull, in County Cork, Ireland.",
            placemarkid: "->placemarks.schull"
        }
    }
};
