'use client';
import './message-composer.css';
import { Button as e } from "./button.js";
import { Kbd as t } from "./kbd.js";
import { Textarea as n } from "./textarea.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
var c = /* @__PURE__ */ a(r, { children: [
	/* @__PURE__ */ i(t, {
		size: "sm",
		children: "Enter"
	}),
	" para enviar, ",
	/* @__PURE__ */ i(t, {
		size: "sm",
		children: "Mayús"
	}),
	" +",
	" ",
	/* @__PURE__ */ i(t, {
		size: "sm",
		children: "Enter"
	}),
	" para salto de línea"
] }), l = o(function({ value: t, onChange: r, onSend: o, placeholder: l = "Escribe un mensaje…", disabled: u, sendLabel: d = "Enviar", helperText: f = c, actions: p, inputId: m, inputLabel: h, inputLabelledBy: g, rows: _ = 2, className: v, ...y }, b) {
	let x = `${s()}-helper`;
	function S() {
		t.trim() && o();
	}
	function C(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), S());
	}
	return /* @__PURE__ */ a("div", {
		ref: b,
		className: [
			"message-composer",
			u ? "message-composer--disabled" : "",
			v ?? ""
		].filter(Boolean).join(" "),
		...y,
		children: [/* @__PURE__ */ a("div", {
			className: "message-composer__box",
			children: [/* @__PURE__ */ i(n, {
				bare: !0,
				className: "message-composer__input",
				id: m,
				"aria-label": h,
				"aria-labelledby": g,
				"aria-describedby": f ? x : void 0,
				placeholder: l,
				value: t,
				disabled: u,
				rows: _,
				onChange: (e) => r(e.target.value),
				onKeyDown: C
			}), /* @__PURE__ */ a("div", {
				className: "message-composer__actions",
				children: [/* @__PURE__ */ i(e, {
					variant: "primary",
					size: "md",
					disabled: u || !t.trim(),
					onClick: S,
					children: d
				}), p]
			})]
		}), f && /* @__PURE__ */ i("p", {
			className: "message-composer__helper",
			id: x,
			children: f
		})]
	});
});
//#endregion
export { l as MessageComposer };
