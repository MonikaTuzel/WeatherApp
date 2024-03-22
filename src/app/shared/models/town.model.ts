export class TownModel {
    name?: string;
    country?: string;
}

export function setTownList(): Array<TownModel> {
    let townList: Array<TownModel> = [
        { name: 'Warsaw', country: 'pl' },
        { name: 'Jelenia Góra', country: 'pl' },
        { name: 'London', country: 'uk' },
        { name: 'Hannover', country: 'de' },
    ];

    return townList;
}