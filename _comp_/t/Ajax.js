var AJAX;
(function (AJAX) {
    function httpGet(parameters) {
        let { url, successCallback, failureCallback, headers } = parameters;
        let ajax = new Ajax();
        ajax.send({
            url: url,
            method: HttpVerb.GET,
            data: null,
            successCallback: successCallback,
            failureCallback: failureCallback,
            headers: headers
        });
    }
    AJAX.httpGet = httpGet;
    function httpPost(parameters) {
        let { url, data, successCallback, failureCallback, headers } = parameters;
        let ajax = new Ajax();
        ajax.send({
            url: url,
            method: HttpVerb.POST,
            data: data,
            successCallback: successCallback,
            failureCallback: failureCallback,
            headers: headers
        });
    }
    AJAX.httpPost = httpPost;
    class HttpVerb {
    }
    HttpVerb.CONNECT = "CONNECT";
    HttpVerb.DELETE = "DELETE";
    HttpVerb.GET = "GET";
    HttpVerb.HEAD = "HEAD";
    HttpVerb.OPTIONS = "OPTIONS";
    HttpVerb.POST = "POST";
    HttpVerb.PUT = "PUT";
    HttpVerb.TRACE = "TRACE";
    class Ajax {
        send(parameters) {
            let { url, method, data, successCallback, failureCallback, headers } = parameters;
            let isComplete = false;
            let request = this.getRequestObject();
            let uniqueUrl = this.getCacheBusterUrl(url);
            request.open(method, url, true);
            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            request.setRequestHeader("Accept", "application/json");
            if (data !== null) {
                request.setRequestHeader("Content-type", "application/json");
            }
            for (let i = 0; i < headers.length; ++i) {
                request.setRequestHeader(headers[i].name, headers[i].value);
            }
            request.onreadystatechange = () => {
                if (request.readyState == 4 && !isComplete) {
                    isComplete = true;
                    if (this.isResponseSuccess(request.status)) {
                        successCallback.call(request, request);
                    }
                    else {
                        failureCallback.call(request, request);
                    }
                }
            };
            if (data !== null) {
                request.send(JSON.stringify(data));
            }
            else {
                request.send();
            }
        }
        getRequestObject() {
            let requestObject;
            if (XMLHttpRequest) {
                requestObject = new XMLHttpRequest();
            }
            else {
                try {
                    requestObject = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        requestObject = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e) {
                    }
                }
            }
            return requestObject;
        }
        getCacheBusterUrl(url) {
            if (url.indexOf("?") > -1) {
                url += "&" + new Date().getTime();
            }
            else {
                url += "?" + new Date().getTime();
            }
            return url;
        }
        isResponseSuccess(responseCode) {
            let firstDigit = responseCode.toString().substring(0, 1);
            switch (firstDigit) {
                case "1":
                case "2":
                case "3":
                    return true;
                default:
                    return false;
            }
        }
    }
})(AJAX || (AJAX = {}));
export default AJAX;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/common/Ajax.js.map