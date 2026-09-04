'use client';
import './message-composer.css';
import { Button as e } from "./button.js";
import { Textarea as t } from "./textarea.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useId as a } from "react";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
var o = i(function({ value: i, onChange: o, onSend: s, placeholder: c = "Escribe un mensaje…", disabled: l, sendLabel: u = "Enviar", helperText: d, actions: f, inputId: p, inputLabel: m, inputLabelledBy: h, rows: g = 2, className: _, ...v }, y) {
	let b = `${a()}-helper`;
	function x() {
		i.trim() && s();
	}
	function S(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), x());
	}
	return /* @__PURE__ */ r("div", {
		ref: y,
		className: [
			"message-composer",
			l ? "message-composer--disabled" : "",
			_ ?? ""
		].filter(Boolean).join(" "),
		...v,
		children: [/* @__PURE__ */ r("div", {
			className: "message-composer__box",
			children: [/* @__PURE__ */ n(t, {
				bare: !0,
				className: "message-composer__input",
				id: p,
				"aria-label": m,
				"aria-labelledby": h,
				"aria-describedby": d ? b : void 0,
				placeholder: c,
				value: i,
				disabled: l,
				rows: g,
				onChange: (e) => o(e.target.value),
				onKeyDown: S
			}), /* @__PURE__ */ r("div", {
				className: "message-composer__actions",
				children: [/* @__PURE__ */ n(e, {
					variant: "primary",
					size: "md",
					disabled: l || !i.trim(),
					onClick: x,
					children: u
				}), f]
			})]
		}), d && /* @__PURE__ */ n("p", {
			className: "message-composer__helper",
			id: b,
			children: d
		})]
	});
});
//#endregion
export { o as MessageComposer };
