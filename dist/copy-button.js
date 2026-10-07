'use client';
import './copy-button.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { t as r } from "./_shared/focusable-when-disabled.js";
import { Button as i } from "./button.js";
import { n as a, r as o, t as s } from "./_shared/copy.js";
import { forwardRef as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var f = c(function({ value: r, children: c, label: f, copiedLabel: p, errorLabel: m, variant: h = "ghost", size: g, feedbackDuration: _ = a, onCopy: v, onCopyError: y, className: b, ...x }, S) {
	let C = e("copy", s), { status: w, copy: T } = o(_), E = async () => {
		let e = await T(r);
		e.ok ? v?.(e.text) : y?.(e.error);
	}, D = w === "copied" ? C("copied", p) : w === "error" ? C("error", m) : "", O = c == null ? null : w === "copied" ? C("copied", p) : w === "error" ? C("error", m) : c;
	return /* @__PURE__ */ d(l, { children: [c == null ? /* @__PURE__ */ u(i, {
		...x,
		ref: S,
		variant: h,
		...g ? { size: g } : {},
		iconOnly: !0,
		"aria-label": C("label", f),
		onClick: E,
		className: ["copy-button", b].filter(Boolean).join(" "),
		children: /* @__PURE__ */ u(t, {
			name: w === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ d(i, {
		...x,
		ref: S,
		variant: h,
		...g ? { size: g } : {},
		onClick: E,
		className: ["copy-button", b].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ u(t, {
			name: w === "copied" ? "check" : "copy",
			size: "sm"
		}), O]
	}), /* @__PURE__ */ u(n, {
		role: "status",
		children: D
	})] });
});
r(f);
//#endregion
export { f as CopyButton };
