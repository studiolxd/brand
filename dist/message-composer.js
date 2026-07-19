'use client';
import './message-composer.css';
import { Button as e } from "./button.js";
import { Textarea as t } from "./textarea.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
function i({ value: i, onChange: a, onSend: o, placeholder: s = "Escribe un mensaje…", disabled: c, sendLabel: l = "Enviar", sendAriaLabel: u = "Enviar mensaje", actions: d, className: f, ...p }) {
	function m() {
		i.trim() && o();
	}
	function h(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), m());
	}
	return /* @__PURE__ */ r("div", {
		className: `message-composer${f ? ` ${f}` : ""}`,
		...p,
		children: [
			/* @__PURE__ */ n(t, {
				placeholder: s,
				value: i,
				disabled: c,
				rows: 2,
				onChange: (e) => a(e.target.value),
				onKeyDown: h
			}),
			/* @__PURE__ */ n(e, {
				variant: "primary",
				size: "md",
				disabled: c || !i.trim(),
				onClick: m,
				"aria-label": u,
				children: l
			}),
			d
		]
	});
}
//#endregion
export { i as MessageComposer };
