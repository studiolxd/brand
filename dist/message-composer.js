'use client';
import './message-composer.css';
import { Button as e } from "./button.js";
import { Textarea as t } from "./textarea.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
function i({ value: i, onChange: a, onSend: o, placeholder: s = "Escribe un mensaje…", disabled: c, sendLabel: l = "Enviar", sendAriaLabel: u = "Enviar mensaje", actions: d, inputId: f, inputLabel: p, inputLabelledBy: m, className: h, ...g }) {
	function _() {
		i.trim() && o();
	}
	function v(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), _());
	}
	return /* @__PURE__ */ r("div", {
		className: `message-composer${h ? ` ${h}` : ""}`,
		...g,
		children: [
			/* @__PURE__ */ n(t, {
				id: f,
				"aria-label": p,
				"aria-labelledby": m,
				placeholder: s,
				value: i,
				disabled: c,
				rows: 2,
				onChange: (e) => a(e.target.value),
				onKeyDown: v
			}),
			/* @__PURE__ */ n(e, {
				variant: "primary",
				size: "md",
				disabled: c || !i.trim(),
				onClick: _,
				"aria-label": u,
				children: l
			}),
			d
		]
	});
}
//#endregion
export { i as MessageComposer };
