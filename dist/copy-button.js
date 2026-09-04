'use client';
import './copy-button.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useEffect as s, useState as c } from "react";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var l = 1500, u = o(function({ value: o, children: u, label: d = "Copiar", copiedLabel: f = "Copiado", errorLabel: p = "No se pudo copiar", variant: m = "ghost", size: h, feedbackDuration: g = l, onCopy: _, onCopyError: v, className: y, ...b }, x) {
	let [S, C] = c("idle");
	s(() => {
		if (S === "idle") return;
		let e = setTimeout(() => C("idle"), g);
		return () => clearTimeout(e);
	}, [S, g]);
	let w = async () => {
		let e = typeof o == "function" ? o() : o;
		try {
			await navigator.clipboard.writeText(e), C("copied"), _?.(e);
		} catch (e) {
			C("error"), v?.(e);
		}
	}, T = S === "copied" ? f : S === "error" ? p : "", E = u == null ? null : S === "copied" ? f : S === "error" ? p : u;
	return /* @__PURE__ */ a(r, { children: [u == null ? /* @__PURE__ */ i(n, {
		...b,
		ref: x,
		variant: m,
		...h ? { size: h } : {},
		iconOnly: !0,
		"aria-label": d,
		onClick: w,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: /* @__PURE__ */ i(e, {
			name: S === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ a(n, {
		...b,
		ref: x,
		variant: m,
		...h ? { size: h } : {},
		onClick: w,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ i(e, {
			name: S === "copied" ? "check" : "copy",
			size: "sm"
		}), E]
	}), /* @__PURE__ */ i(t, {
		role: "status",
		children: T
	})] });
});
//#endregion
export { u as CopyButton };
