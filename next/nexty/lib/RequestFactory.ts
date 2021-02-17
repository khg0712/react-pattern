import axios from "axios";

const instance = axios.create({
    baseURL: '/',
})

enum ApiRoute {}

export default abstract class RequestFactory {
    abstract createRequest(type: string): Request
}

enum MovieApiRoute {
    list = "/"
}

export class MovieRequestFactory extends RequestFactory {
    createRequest(type: MovieApiRoute) {
        switch(type) {
            case MovieApiRoute.list:
                return new Request();
        }
    }

}

class Request {
    constructor() {

    }
}

class MovieRq extends Request {

}

class Model {
    rqFactory = new MovieRequestFactory();

    load() {
        this.rqFactory.createRequest(MovieApiRoute.list)
    }
}