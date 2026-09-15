'use client';
import './copy-button.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { n as r, t as i } from "./_shared/copy-to-clipboard.js";
import { forwardRef as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/CopyButton/CopyButton.tsx
var l = a(function({ value: a, children: l, label: u = "Copiar", copiedLabel: d = "Copiado", errorLabel: f = "No se pudo copiar", variant: p = "ghost", size: m, feedbackDuration: h = i, onCopy: g, onCopyError: _, className: v, ...y }, b) {
	let { status: x, copy: S } = r(h), C = async () => {
		let e = await S(a);
		e.ok ? g?.(e.text) : _?.(e.error);
	}, w = x === "copied" ? d : x === "error" ? f : "", T = l == null ? null : x === "copied" ? d : x === "error" ? f : l;
	return /* @__PURE__ */ c(o, { children: [l == null ? /* @__PURE__ */ s(n, {
		...y,
		ref: b,
		variant: p,
		...m ? { size: m } : {},
		iconOnly: !0,
		"aria-label": u,
		onClick: C,
		className: ["copy-button", v].filter(Boolean).join(" "),
		children: /* @__PURE__ */ s(e, {
			name: x === "copied" ? "check" : "copy",
			size: "sm"
		})
	}) : /* @__PURE__ */ c(n, {
		...y,
		ref: b,
		variant: p,
		...m ? { size: m } : {},
		onClick: C,
		className: ["copy-button", v].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ s(e, {
			name: x === "copied" ? "check" : "copy",
			size: "sm"
		}), T]
	}), /* @__PURE__ */ s(t, {
		role: "status",
		children: w
	})] });
});
//#endregion
export { l as CopyButton };
