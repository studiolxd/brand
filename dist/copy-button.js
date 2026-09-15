'use client';
import './copy-button.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { n as i, t as a } from "./_shared/copy-to-clipboard.js";
import { forwardRef as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var u = o(function({ value: o, children: u, label: d, copiedLabel: f, errorLabel: p, variant: m = "ghost", size: h, feedbackDuration: g = a, onCopy: _, onCopyError: v, className: y, ...b }, x) {
	let S = e("copy"), { status: C, copy: w } = i(g), T = async () => {
		let e = await w(o);
		e.ok ? _?.(e.text) : v?.(e.error);
	}, E = C === "copied" ? S("copied", f) : C === "error" ? S("error", p) : "", D = u == null ? null : C === "copied" ? S("copied", f) : C === "error" ? S("error", p) : u;
	return /* @__PURE__ */ l(s, { children: [u == null ? /* @__PURE__ */ c(r, {
		...b,
		ref: x,
		variant: m,
		...h ? { size: h } : {},
		iconOnly: !0,
		"aria-label": S("label", d),
		onClick: T,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: /* @__PURE__ */ c(t, {
			name: C === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ l(r, {
		...b,
		ref: x,
		variant: m,
		...h ? { size: h } : {},
		onClick: T,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ c(t, {
			name: C === "copied" ? "check" : "copy",
			size: "sm"
		}), D]
	}), /* @__PURE__ */ c(n, {
		role: "status",
		children: E
	})] });
});
//#endregion
export { u as CopyButton };
