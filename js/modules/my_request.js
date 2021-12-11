export default class MyRequest {

    constructor(name, url, concatenateFetchFunction,  concatenate_url) {
        this.name = name;
        this.url = url;
        this.concatenate = {
            fetchFunction: concatenateFetchFunction,
            url: concatenate_url
        }
    }
}