export class WeatherResponse {

    coord?: CoordTown;
    weather?: Array<WeatherDetails>;
    main?: MainTownInfo;
    // visibility on meters
    visibility?: number;
    wind?: WindInfo;
    clouds?: Clouds;
    sys?: SysCountry;
    id?: string;

    weatherMainUrl?: string;
    iconUrl?: string;
}
export class CoordTown {
    // Latitude (szer)
    lon?: number;
    // Longitude (dł)
    lat?: number;
}
export class WeatherDetails {
    // Group of weather parameters (Rain, Snow etc.)
    id?: number;
    // group of weather (Thunderstorm / Drizzle / Rain / Snow / Atmosphere / Clear / Clouds)
    description?: GroupOfWeather;
    // icon of weather
    icon?: string;
}
export class MainTownInfo {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number
}
export class WindInfo {
    // speed of wind - meter/sec
    speed?: number;
    // direct of wind [degrees]
    deg?: number;
}

export class Clouds {
    // Clouds [%]
    all?: string
}

export class SysCountry {
    // Sunrise time, Unix, UTC
    sunrise?: string;
    // Sunset time, Unix, UTC
    sunset?: string
}

export enum GroupOfWeather {
    Thunderstorm,
    Drizzle,
    Rain,
    Snow,
    Atmosphere,
    Clear,
    Clouds
}
