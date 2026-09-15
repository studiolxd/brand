'use client';
import './message-composer.css';
import { Button as e } from "./button.js";
import { Textarea as t } from "./textarea.js";
import { forwardRef as n, useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
var o = n(function({ value: n, onChange: o, onSend: s, placeholder: c = "Escribe un mensaje…", disabled: l, sendLabel: u = "Enviar", helperText: d, actions: f, inputId: p, inputLabel: m, inputLabelledBy: h, rows: g = 2, className: _, ...v }, y) {
	let b = `${r()}-helper`;
	function x() {
		n.trim() && s();
	}
	function S(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), x());
	}
	return /* @__PURE__ */ a("div", {
		ref: y,
		className: [
			"message-composer",
			l ? "message-composer--disabled" : "",
			_ ?? ""
		].filter(Boolean).join(" "),
		...v,
		children: [/* @__PURE__ */ a("div", {
			className: "message-composer__box",
			children: [/* @__PURE__ */ i(t, {
				bare: !0,
				className: "message-composer__input",
				id: p,
				"aria-label": m,
				"aria-labelledby": h,
				"aria-describedby": d ? b : void 0,
				placeholder: c,
				value: n,
				disabled: l,
				rows: g,
				onChange: (e) => o(e.target.value),
				onKeyDown: S
			}), /* @__PURE__ */ a("div", {
				className: "message-composer__actions",
				children: [/* @__PURE__ */ i(e, {
					variant: "primary",
					size: "md",
					disabled: l || !n.trim(),
					onClick: x,
					children: u
				}), f]
			})]
		}), d && /* @__PURE__ */ i("p", {
			className: "message-composer__helper",
			id: b,
			children: d
		})]
	});
});
//#endregion
export { o as MessageComposer };
