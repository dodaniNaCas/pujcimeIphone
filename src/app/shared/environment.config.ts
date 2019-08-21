import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IEnvironmentConfig } from './models/config.model';


@Injectable()
export class EnvironmentConfig {

    static settings: IEnvironmentConfig;

    constructor(private http: Http) {}

    load() {
        const jsonFile = `assets/config.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: Response) => {
               EnvironmentConfig.settings = <IEnvironmentConfig>response.json();
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
