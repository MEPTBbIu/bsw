export default function promiseMiddleware() {
	// console.log( 'Входим в thunkMiddleware' );
	return function(next) {
		// console.log( 'Функция "next" предоставляет:', next );
		return function(action) {
			// console.log( 'Обработка действия:', action );

			const { promise, types, ...rest } = action;

			if (!promise) {
				return next(action);
			}

			const [REQUEST, SUCCESS, FAILURE] = types;

			next({ ...rest, type: REQUEST });

			return promise().then(
				(result) => {
					next({ ...rest, result, type: SUCCESS });
				},
				(error) => {
					next({ ...rest, error, type: FAILURE });
				}
			);
		}
	}
}