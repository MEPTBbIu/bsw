import AJAX from "./Ajax";
export default class Api {
    static validatePhoneInputAsync(phone) {
        return new Promise((resolve, reject) => {
            const url = `/bslo_retail/hs/loyalty/phone/validate/${phone}`;
            const ok = (response) => {
                let phoneInfo = JSON.parse(response.responseText);
                resolve(phoneInfo);
            };
            const error = (err) => {
                reject(err);
            };
            let headers = [{ name: "Content-Type", value: "application/x-www-form-urlencoded" },
                { name: "Authorization", value: "Basic d3M6d3M=" }];
            AJAX.httpGet({
                url: url,
                successCallback: ok,
                failureCallback: error,
                headers
            });
        });
    }
    static sendSMSCodeAsync(phone) {
        return new Promise((resolve, reject) => {
            const url = `/bslo_retail/hs/loyalty/sms/sendCode/${phone}`;
            const ok = (response) => {
                let res = JSON.parse(response.responseText);
                resolve(res);
            };
            const error = (err) => {
                reject({});
            };
            AJAX.httpGet({
                url: url,
                successCallback: ok,
                failureCallback: error,
                headers: [
                    { name: "Content-Type", value: "application/x-www-form-urlencoded" },
                    { name: "Authorization", value: "Basic d3M6d3M=" }
                ]
            });
        });
    }
    static loadProfileAsync(regCode) {
        return new Promise((resolve, reject) => {
            const url = `/bslo_retail/hs/loyalty/reg/${regCode}`;
            const ok = (response) => {
                let data = JSON.parse(response.responseText);
                let res = data.data || {};
                res.regCodeIsVerified = data.success;
                res.status = data.state.toString();
                resolve(res);
            };
            const error = (err) => {
                reject({});
            };
            AJAX.httpGet({
                url: url,
                successCallback: ok,
                failureCallback: error,
                headers: [
                    { name: "Content-Type", value: "application/x-www-form-urlencoded" },
                    { name: "Authorization", value: "Basic d3M6d3M=" }
                ]
            });
        });
    }
}
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/common/Api.js.map