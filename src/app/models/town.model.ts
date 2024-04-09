import { ViewWeatherTown } from "./weatherTownView.model";

export class TownModel {
    name?: string;
    country?: string;
    id?: string;
    lat?: number;
    lng?: number;
    public viewerInfo?: ViewWeatherTown;

    constructor(nameTown: string, codeCountry?: string) {
        this.name = nameTown,
            this.country = codeCountry,
            this.viewerInfo = new ViewWeatherTown()
    }
}