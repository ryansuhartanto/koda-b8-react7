import React from "react";
import Check from "~icons/lucide/check";
import Plus from "~icons/lucide/plus";
import Trash from "~icons/lucide/trash";

import { useTodoData } from "#/hooks/data";
import { cn } from "#/lib/utils";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

/**
 * @param {object}
 * @param {boolean} [.value]
 * @param {string} [.className]
 * @param {React.RefObject<HTMLInputElement>} [.ref]
 * @param {React.ComponentProps<"input">["onChange"]} [.onChange]
 */
function Checkbox({ value, className, ref, onChange }) {
	return (
		<div className={cn("relative size-6", className)}>
			<input
				ref={ref}
				type="checkbox"
				className="peer appearance-none size-6 rounded border-2 border-pink-400 checked:bg-pink-500 checked:border-pink-500 cursor-pointer transition-colors"
				defaultChecked={value}
				onChange={onChange}
			/>
			<Check className="absolute inset-0 size-6 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
		</div>
	);
}

/**
 * @param {object}
 * @param {React.RefObject<HTMLButtonElement>} [.ref]
 * @param {React.ComponentProps<"button">["onClick"]} [.onClick]
 */
function Delete({ ref, onClick }) {
	return (
		<button
			ref={ref}
			type="button"
			className="text-pink-200 hover:text-pink-500 cursor-pointer transition-colors"
			onClick={onClick}
		>
			<Trash className="size-6" />
		</button>
	);
}

/**
 * @typedef TodoCardProps
 * @prop {boolean} [done]
 * @prop {string} [content]
 * @prop {React.RefObject<HTMLInputElement>} [done-ref]
 * @prop {React.RefObject<HTMLTextAreaElement>} [content-ref]
 * @prop {React.RefObject<HTMLButtonElement>} [delete-ref]
 * @prop {React.ComponentProps<"input">["onChange"]} [onDone]
 * @prop {React.ComponentProps<"textarea">["onChange"]} [onEdit]
 * @prop {React.ComponentProps<"button">["onClick"]} [onDelete]
 */

/**
 * @param {TodoCardProps}
 */
function TodoCard({
	done = false,
	content = "",
	"done-ref": doneRef,
	"content-ref": contentRef,
	"delete-ref": deleteRef,
	onDone,
	onEdit,
	onDelete,
}) {
	return (
		<div className="p-6 flex justify-between items-start gap-6 text-lg border-2 border-pink-300 rounded-xl bg-white">
			<div className="flex flex-1 gap-6">
				<Checkbox
					value={done}
					ref={doneRef}
					onChange={onDone}
				/>
				<textarea
					type="text"
					className={cn(
						"-my-0.5 flex-1 w-full resize-none field-sizing-content box-border focus:outline-none focus:ring-0 decoration-2",
						{ "line-through": done },
					)}
					ref={contentRef}
					value={content}
					onChange={onEdit}
				/>
			</div>
			<Delete
				ref={deleteRef}
				onClick={onDelete}
			/>
		</div>
	);
}

export default function Layout() {
	const [todos, , appendTodo, editTodo, deleteTodo] = useTodoData();
	const newTodoRef = React.useRef(null);
	const isAdding = React.useRef(false);

	React.useEffect(() => {
		if (isAdding.current && newTodoRef.current) {
			newTodoRef.current.focus();
			isAdding.current = false;
		}
	}, [todos.length]);

	function addTodo() {
		isAdding.current = true;
		appendTodo({ done: false, content: "" });
	}

	function updateTodo(index, patch) {
		editTodo(index, (t) => ({ ...t, ...patch }));
	}

	return (
		<main className="min-h-screen flex flex-col justify-center items-center bg-pink-50">
			<div className="max-w-2xl w-full mx-auto py-8 flex flex-col gap-4">
				<div className="flex justify-center">
					<button
						type="button"
						className="grid place-items-center p-4 text-white rounded-full  bg-pink-500 hover:bg-pink-800 transition-colors cursor-pointer"
						onClick={addTodo}
					>
						<Plus className="size-6" />
					</button>
				</div>
				{todos.map(({ done, content }, i) => (
					<TodoCard
						key={i}
						done={done}
						content={content}
						content-ref={i === todos.length - 1 ? newTodoRef : undefined}
						onDone={(e) => updateTodo(i, { done: e.target.checked })}
						onEdit={(e) => updateTodo(i, { content: e.target.value })}
						onDelete={() => deleteTodo(i)}
					/>
				))}
			</div>
		</main>
	);
}
