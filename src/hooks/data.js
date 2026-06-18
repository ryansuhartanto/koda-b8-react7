import { useEffect, useState } from "react";

/**
 * @typedef TodoItem
 * @prop {boolean} done
 * @prop {string} todo
 */

const key = "todo.data";

export function useTodoData() {
	/** @type {ReturnType<typeof React.useState<TodoItem[]>>} */
	const [data, setData] = useState(() => {
		const item = globalThis.window.localStorage.getItem(key);
		return item ? JSON.parse(item) : [];
	});

	/** @param {TodoItem} data */
	function appendData(data) {
		setData((prev) => [...prev, data]);
	}

	/**
	 * @param {number} index
	 * @param {(TodoItem) => TodoItem} cb
	 */
	function editData(index, cb) {
		setData((prev) => prev.map((item, i) => (i === index ? cb(item) : item)));
	}

	function deleteData(index) {
		setData((prev) => prev.filter((_, i) => i !== index));
	}

	useEffect(() => {
		globalThis.window.localStorage.setItem(key, JSON.stringify(data));
	}, [data]);

	return [data, setData, appendData, editData, deleteData];
}
