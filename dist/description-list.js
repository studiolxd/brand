'use client';
import './description-list.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { n as r } from "./_shared/copy-to-clipboard.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useRef as s } from "react";
//#region src/stories/atoms/DescriptionList/DescriptionList.tsx
var c = o(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("dl", {
		ref: r,
		className: ["description-list", e].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), l = o(function({ as: e = "dt", className: t, children: n, ...r }, a) {
	return /* @__PURE__ */ i(e, {
		ref: a,
		className: ["description-list__term", t].filter(Boolean).join(" "),
		...r,
		children: n
	});
}), u = o(function({ as: o = "dd", className: c, children: l, copyable: u = !1, copyText: d, copyLabel: f = "Copiar", copiedLabel: p = "Copiado", ...m }, h) {
	let g = s(null), { status: _, copy: v } = r(), y = _ === "copied", b = [
		"description-list__details",
		u ? "description-list__details--copyable" : "",
		c
	].filter(Boolean).join(" ");
	return u ? /* @__PURE__ */ a(o, {
		ref: h,
		className: b,
		...m,
		children: [
			/* @__PURE__ */ i("span", {
				ref: g,
				className: "description-list__value",
				children: l
			}),
			/* @__PURE__ */ i(n, {
				iconOnly: !0,
				variant: "ghost",
				size: "sm",
				"aria-label": f,
				onClick: () => v(() => d ?? g.current?.textContent ?? ""),
				className: "description-list__copy",
				children: /* @__PURE__ */ i(e, {
					name: y ? "check" : "copy",
					size: "sm"
				})
			}),
			/* @__PURE__ */ i(t, {
				role: "status",
				children: y ? p : ""
			})
		]
	}) : /* @__PURE__ */ i(o, {
		ref: h,
		className: b,
		...m,
		children: l
	});
});
//#endregion
export { u as DescriptionDetails, c as DescriptionList, l as DescriptionTerm };
