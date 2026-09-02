'use client';
import './copy-button.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { forwardRef as r, useEffect as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var l = 1500, u = r(function({ value: r, children: u, label: d = "Copiar", copiedLabel: f = "Copiado", errorLabel: p = "No se pudo copiar", variant: m = "ghost", size: h, feedbackDuration: g = l, onCopy: _, onCopyError: v, className: y, ...b }, x) {
	let [S, C] = a("idle");
	i(() => {
		if (S === "idle") return;
		let e = setTimeout(() => C("idle"), g);
		return () => clearTimeout(e);
	}, [S, g]);
	let w = async () => {
		let e = typeof r == "function" ? r() : r;
		try {
			await navigator.clipboard.writeText(e), C("copied"), _?.(e);
		} catch (e) {
			C("error"), v?.(e);
		}
	}, T = S === "copied" ? f : S === "error" ? p : "", E = u == null ? null : S === "copied" ? f : S === "error" ? p : u;
	return /* @__PURE__ */ c(o, { children: [u == null ? /* @__PURE__ */ s(n, {
		...b,
		ref: x,
		variant: m,
		...h ? { size: h } : {},
		iconOnly: !0,
		"aria-label": d,
		onClick: w,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: /* @__PURE__ */ s(e, {
			name: S === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ c(n, {
		...b,
		ref: x,
		variant: m,
		...h ? { size: h } : {},
		onClick: w,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ s(e, {
			name: S === "copied" ? "check" : "copy",
			size: "sm"
		}), E]
	}), /* @__PURE__ */ s(t, {
		role: "status",
		children: T
	})] });
});
//#endregion
export { u as CopyButton };
