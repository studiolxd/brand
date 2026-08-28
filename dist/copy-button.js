'use client';
import './copy-button.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { useEffect as o, useState as s } from "react";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var c = 1500;
function l({ value: l, children: u, label: d = "Copiar", copiedLabel: f = "Copiado", errorLabel: p = "No se pudo copiar", variant: m = "ghost", size: h, feedbackDuration: g = c, onCopy: _, onCopyError: v, className: y, ...b }) {
	let [x, S] = s("idle");
	o(() => {
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
	return /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ a(n, {
		...b,
		variant: m,
		...h ? { size: h } : {},
		iconOnly: u == null,
		"aria-label": u == null ? d : void 0,
		onClick: C,
		className: ["copy-button", y].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ i(e, {
			name: x === "copied" ? "check" : "copy",
			size: "sm"
		}), T]
	}), /* @__PURE__ */ i(t, {
		role: "status",
		children: w
	})] });
}
//#endregion
export { l as CopyButton };
