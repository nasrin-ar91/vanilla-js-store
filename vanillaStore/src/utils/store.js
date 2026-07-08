function createStore() {
	const state = {};
	const listeners = {};

	function setState(key, value) {
		state[key] = value;
		if (listeners[key]) {
			listeners[key].forEach((callback) => callback(value));
		}
	}

	function getState(key) {
		return state[key];
	}

	function subscribe(key, callback) {
		if (!listeners[key]) {
			listeners[key] = [];
		}
		listeners[key].push(callback);

		return function unsubscribe() {
			listeners[key] = listeners[key].filter((cb) => cb !== callback);
		};
	}

	return {
		setState,
		getState,
		subscribe,
	};
}

export const store = createStore();
