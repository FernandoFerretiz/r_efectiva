class MainClass{
    constructor(){
        this.format_hr = '';
        this.full_date = '';
    }

    httpRequest(config){
        let xhr = new XMLHttpRequest();
            xhr.open('GET', config.urlRequest);
            if(typeof config.header !== 'undefined'){
                xhr.setRequestHeader(config.header.name, config.header.value);
            }
            xhr.responseType = 'json';

            

            xhr.onload = function() {
                if (xhr.status != 200) {
                    console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                } else { 

                    config.onSuccess(xhr.response);

                }
            };

            xhr.onprogress = function(event) {
                if (event.lengthComputable) {
                    console.log(`Received ${event.loaded} of ${event.total} bytes`);
                } else {
                    console.log(`Received ${event.loaded} bytes`); // no Content-Length
                }
            };

            xhr.onerror = function() {
                console.log("Request failed");
            };

            xhr.send();
    }
}