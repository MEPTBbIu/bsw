import { AsyncActionCreators, Success, Failure} from "typescript-fsa";
import {Handler} from 'typescript-fsa-reducers';


/**
 * @interface IFsaAsynchHandlers
 * @template InS - Тип текущего состояния
 * @template OutS - Тип следующего состояния
 * @template TParam - Параметры вызова Action
 * @template TErr - Тип ошибки выполнения
 */
export  interface IFsaAsynchHandlers<InS extends OutS , OutS, TParam, TErr> {
	done?: Handler<InS, OutS, Success<TParam, OutS>>;
	failed?:Handler<InS, OutS, Failure<TParam, TErr>>;
	started?:Handler<InS, OutS, TParam>;
}


// https://github.com/aikoven/typescript-fsa/issues/5#issuecomment-255347353

export function FsaWrapAsyncWorker<TParameters, TSuccess, TError>(
			asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
			worker: ( params: TParameters ) => Promise<TSuccess> ) {
	return function wrappedWorker( dispatch, params: TParameters ): Promise<TSuccess> {
		dispatch( asyncAction.started( params ) );
		return worker( params ).then( result => {
			dispatch( asyncAction.done( { params, result } ) );
			return result;
		}, ( error: TError ) => {
			dispatch( asyncAction.failed( { params, error } ) );
			throw error;
		} );
	};
}
