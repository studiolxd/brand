'use client';
import './copy-button.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { useEffect as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var c = 1500;
function l({ value: l, children: u, label: d = "Copiar", copiedLabel: f = "Copiado", errorLabel: p = "No se pudo copiar", variant: m = "ghost", size: h, feedbackDuration: g = c, onCopy: _, onCopyError: v, className: y, ...b }) {
	let [x, S] = i("idle");
	r(() => {
		if (x === "idle") return;
		let e = setTimeout(() => S("idle"), g);
		return () => clearTimeout(e);
	}, [x, g]);
	let C = async () => {
		let e = typeof l == "function" ? l() : l;
		try {
			await navigator.clipboard.writeText(e), S("copied"), _?.(e);
		} catch (e) {
			S("error"), v?.(e);
		}
	}, w = x === "copied" ? f : x === "error" ? p : "", T = u == null ? null : x === "copied" ? f : x === "error" ? p : u;
	return /* @__PURE__ */ s(a, { children: [u == null ? /* @__PURE__ */ o(n, {
		...b,
		variant: m,
		...h ? { size: h } : {},
		iconOnly: !0,
		"aria-label": d,
		onClick: C,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: /* @__PURE__ */ o(e, {
			name: x === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ s(n, {
		...b,
		variant: m,
		...h ? { size: h } : {},
		onClick: C,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ o(e, {
			name: x === "copied" ? "check" : "copy",
			size: "sm"
		}), T]
	}), /* @__PURE__ */ o(t, {
		role: "status",
		children: w
	})] });
}
//#endregion
export { l as CopyButton };
