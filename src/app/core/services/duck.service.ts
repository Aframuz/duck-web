import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DuckResponse } from "../models/duck.model";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root"
})

export class DuckService {
    private readonly BASE_URL = environment.API_URL

    // Enable HTTP requests
    constructor(private http: HttpClient) {}

    // Get random duck from API
    getRandomDuck(): Observable<DuckResponse> {
        return this.http.get<DuckResponse>(`${this.BASE_URL}/random`)
    }

    // Get Ducks by ID from API
    getDuckById(id: number): Observable<DuckResponse> {
        return this.http.get<DuckResponse>(`${this.BASE_URL}/${id}`)
    }
}