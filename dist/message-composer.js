'use client';
import './message-composer.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Textarea as n } from "./textarea.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
var s = r(function({ value: r, onChange: s, onSend: c, placeholder: l, disabled: u, sendLabel: d, helperText: f, actions: p, inputId: m, inputLabel: h, inputLabelledBy: g, rows: _ = 2, className: v, ...y }, b) {
	let x = e("messageComposer"), S = `${i()}-helper`;
	function C() {
		r.trim() && c();
	}
	function w(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), C());
	}
	return /* @__PURE__ */ o("div", {
		ref: b,
		className: [
			"message-composer",
			u ? "message-composer--disabled" : "",
			v ?? ""
		].filter(Boolean).join(" "),
		...y,
		children: [/* @__PURE__ */ o("div", {
			className: "message-composer__box",
			children: [/* @__PURE__ */ a(n, {
				bare: !0,
				className: "message-composer__input",
				id: m,
				"aria-label": h,
				"aria-labelledby": g,
				"aria-describedby": f ? S : void 0,
				placeholder: x("placeholder", l),
				value: r,
				disabled: u,
				rows: _,
				onChange: (e) => s(e.target.value),
				onKeyDown: w
			}), /* @__PURE__ */ o("div", {
				className: "message-composer__actions",
				children: [/* @__PURE__ */ a(t, {
					variant: "primary",
					size: "md",
					disabled: u || !r.trim(),
					onClick: C,
					children: x("send", d)
				}), p]
			})]
		}), f && /* @__PURE__ */ a("p", {
			className: "message-composer__helper",
			id: S,
			children: f
		})]
	});
});
//#endregion
export { s as MessageComposer };
