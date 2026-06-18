import React from "react";
import Check from "~icons/lucide/check";
import Plus from "~icons/lucide/plus";
import Trash from "~icons/lucide/trash";

import { cn } from "#/lib/utils";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

const data = ["Todo 1", "Todo 2"];

/**
 * @param {object}
 * @param {boolean} [.value]
 * @param {string} [.className]
 * @param {React.RefObject<HTMLInputElement>} [.ref]
 * @param {HTMLInput}
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
 */
function Delete({ ref }) {
	return (
		<button
			ref={ref}
			type="button"
			className="text-pink-200 hover:text-pink-500 cursor-pointer transition-colors"
		>
			<Trash className="size-6" />
		</button>
	);
}

/**
 * @typedef TodoCardProps
 * @prop {boolean} [done]
 * @prop {string} [content]
 */

/**
 * @param {TodoCardProps}
 */
function TodoCard({ done = false, content = "" }) {
	const [checked, setChecked] = React.useState(done);
	const checkboxRef = React.useRef();
	const deleteRef = React.useRef();

	return (
		<div className="p-6 flex justify-between items-start gap-6 text-lg border-2 border-pink-300 rounded-xl bg-white">
			<div className="flex flex-1 gap-6">
				<Checkbox
					value={done}
					ref={checkboxRef}
					onChange={(e) => setChecked(e.target.checked)}
				/>
				<textarea
					type="text"
					className={cn(
						"-my-0.5 flex-1 w-full resize-none field-sizing-content box-border focus:outline-none focus:ring-0 decoration-2",
						{ "line-through": checked },
					)}
					defaultValue={content}
				/>
			</div>
			<Delete ref={deleteRef} />
		</div>
	);
}

export default function Layout() {
	return (
		<main className="min-h-screen flex flex-col justify-center items-center bg-pink-50">
			<div className="max-w-2xl w-full mx-auto py-8 flex flex-col gap-4">
				<div className="flex justify-center">
					<button
						type="button"
						className="grid place-items-center p-4 text-white rounded-full  bg-pink-500 hover:bg-pink-800 transition-colors cursor-pointer"
					>
						<Plus className="size-6" />
					</button>
				</div>
				{data.map((content) => (
					<TodoCard
						key={content}
						content={content}
					/>
				))}
			</div>
		</main>
	);
}
