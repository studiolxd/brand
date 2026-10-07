'use client';
import './copy-button.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { n as i, r as a, t as o } from "./_shared/copy.js";
import { forwardRef as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var d = s(function({ value: s, children: d, label: f, copiedLabel: p, errorLabel: m, variant: h = "ghost", size: g, feedbackDuration: _ = i, onCopy: v, onCopyError: y, className: b, ...x }, S) {
	let C = e("copy", o), { status: w, copy: T } = a(_), E = async () => {
		let e = await T(s);
		e.ok ? v?.(e.text) : y?.(e.error);
	}, D = w === "copied" ? C("copied", p) : w === "error" ? C("error", m) : "", O = d == null ? null : w === "copied" ? C("copied", p) : w === "error" ? C("error", m) : d;
	return /* @__PURE__ */ u(c, { children: [d == null ? /* @__PURE__ */ l(r, {
		...x,
		ref: S,
		variant: h,
		...g ? { size: g } : {},
		iconOnly: !0,
		"aria-label": C("label", f),
		onClick: E,
		className: ["copy-button", b].filter(Boolean).join(" "),
		children: /* @__PURE__ */ l(t, {
			name: w === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ u(r, {
		...x,
		ref: S,
		variant: h,
		...g ? { size: g } : {},
		onClick: E,
		className: ["copy-button", b].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ l(t, {
			name: w === "copied" ? "check" : "copy",
			size: "sm"
		}), O]
	}), /* @__PURE__ */ l(n, {
		role: "status",
		children: D
	})] });
});
//#endregion
export { d as CopyButton };
