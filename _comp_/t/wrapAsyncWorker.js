export default function wrapAsyncWorker(asyncAction, worker) {
    return function wrappedWorker(dispatch, params) {
        dispatch(asyncAction.started(params));
        return worker(params).then(result => {
            dispatch(asyncAction.done({ params, result }));
            return result;
        }, (error) => {
            dispatch(asyncAction.failed({ params, error }));
            throw error;
        });
    };
}
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/common/wrapAsyncWorker.js.map