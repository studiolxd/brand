'use client';
import './message-composer.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Textarea as n } from "./textarea.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/messageComposer.ts
var s = {
	placeholder: "Escribe un mensaje…",
	send: "Enviar"
}, c = r(function({ value: r, onChange: c, onSend: l, placeholder: u, disabled: d, sendLabel: f, helperText: p, actions: m, inputId: h, inputLabel: g, inputLabelledBy: _, rows: v = 2, className: y, ...b }, x) {
	let S = e("messageComposer", s), C = `${i()}-helper`;
	function w() {
		r.trim() && l();
	}
	function T(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), w());
	}
	return /* @__PURE__ */ o("div", {
		ref: x,
		className: [
			"message-composer",
			d ? "message-composer--disabled" : "",
			y ?? ""
		].filter(Boolean).join(" "),
		...b,
		children: [/* @__PURE__ */ o("div", {
			className: "message-composer__box",
			children: [/* @__PURE__ */ a(n, {
				bare: !0,
				className: "message-composer__input",
				id: h,
				"aria-label": g,
				"aria-labelledby": _,
				"aria-describedby": p ? C : void 0,
				placeholder: S("placeholder", u),
				value: r,
				disabled: d,
				rows: v,
				onChange: (e) => c(e.target.value),
				onKeyDown: T
			}), /* @__PURE__ */ o("div", {
				className: "message-composer__actions",
				children: [/* @__PURE__ */ a(t, {
					variant: "primary",
					size: "md",
					disabled: d || !r.trim(),
					onClick: w,
					children: S("send", f)
				}), m]
			})]
		}), p && /* @__PURE__ */ a("p", {
			className: "message-composer__helper",
			id: C,
			children: p
		})]
	});
});
//#endregion
export { c as MessageComposer };
