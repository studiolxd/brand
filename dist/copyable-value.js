'use client';
import './copyable-value.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { n as r } from "./_shared/copy-to-clipboard.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useRef as s } from "react";
//#region src/stories/atoms/CopyableValue/CopyableValue.tsx
var c = o(function({ children: o, copyText: c, copyLabel: l = "Copiar", copiedLabel: u = "Copiado", className: d }, f) {
	let p = s(null), { status: m, copy: h } = r(), g = m === "copied";
	return /* @__PURE__ */ a("span", {
		ref: f,
		className: ["copyable-value", d].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i("span", {
				ref: p,
				className: "copyable-value__value",
				children: o
			}),
			"⁠",
			/* @__PURE__ */ i(n, {
				iconOnly: !0,
				variant: "ghost",
				size: "sm",
				"aria-label": l,
				onClick: () => h(() => c ?? p.current?.textContent ?? ""),
				className: "copyable-value__copy",
				children: /* @__PURE__ */ i(e, {
					name: g ? "check" : "copy",
					size: "sm"
				})
			}),
			/* @__PURE__ */ i(t, {
				role: "status",
				children: g ? u : ""
			})
		]
	});
});
//#endregion
export { c as CopyableValue };
