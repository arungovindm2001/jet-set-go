export interface Prefs {
  city: boolean,
  beach: boolean,
  nature: boolean,
  mountain: boolean
}

export interface UserData {
    username: string;
    email:string;
    name: string;
    phone: number;
    address: string;
    environment_preferences: Prefs;
    hotel_ratings: Record<string, number>;
    city: string;
    state: string;
    country: string;
  }