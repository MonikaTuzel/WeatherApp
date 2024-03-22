export class WeatherResponse {

    coord?: CoordTown;
    weather?: Array<WeatherDetails>;
    base?: string;
    main?: MainTownInfo;
    visibility?: number;
    wind?: WindInfo;

    name?: string;
}
export class CoordTown {
    lon?: number;
    lat?: number;
}
export class WeatherDetails {
    id?: number;
    main?: string;
    description?: string;
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
    speed?: number;
    deg?: number;
}
