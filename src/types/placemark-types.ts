export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  };

  export type Placemark = {
    name: string;
    img: string;
    category: String;
    _id?: string;
    userid: User | string;
    sites?: any[];
  };

  export type Site = {
    title: string;
    year: number;
    era: string;
    latitude: number;
    longitude: number;
    description: string;
    img: string;
    placemark: Placemark | string;
    _id?: string;
  };