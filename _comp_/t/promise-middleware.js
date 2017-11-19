export default function promiseMiddleware() {
    return function (next) {
        return function (action) {
            const { promise, types, ...rest } = action;
            if (!promise) {
                return next(action);
            }
            const [REQUEST, SUCCESS, FAILURE] = types;
            next({ ...rest, type: REQUEST });
            return promise().then((result) => {
                next({ ...rest, result, type: SUCCESS });
            }, (error) => {
                next({ ...rest, error, type: FAILURE });
            });
        };
    };
}
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/store/promise-middleware.js.map