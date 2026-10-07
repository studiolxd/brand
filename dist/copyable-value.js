'use client';
import './copyable-value.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { r as i, t as a } from "./_shared/copy.js";
import { forwardRef as o, isValidElement as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/atoms/CopyableValue/CopyableValue.tsx
var d = 6, f = 12, p = new Set([
	"/",
	"-",
	"_",
	"."
]);
function m(e) {
	if (e.length <= d) return {
		head: "",
		tail: e
	};
	let t = Math.max(0, e.length - f);
	for (let n = e.length - 2; n >= t; n--) if (p.has(e[n])) return {
		head: e.slice(0, n),
		tail: e.slice(n)
	};
	return {
		head: e.slice(0, e.length - d),
		tail: e.slice(e.length - d)
	};
}
function h(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) {
		let t = "";
		for (let n of e) {
			let e = h(n);
			if (e === null) return null;
			t += e;
		}
		return t;
	}
	return s(e) ? h(e.props.children) : null;
}
var g = 24, _ = o(function({ children: o, copyText: s, copyLabel: d, copiedLabel: f, className: p }, _) {
	let v = e("copy", a), { status: y, copy: b } = i(), x = y === "copied", S = ["copyable-value", p].filter(Boolean).join(" "), C = typeof o == "string", w = C ? m(o) : null, T = C ? null : h(o), E = C ? o : T ?? "", D = !C && T !== null && !/\s/.test(T) && T.length <= g, O = /* @__PURE__ */ l(r, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": v("label", d),
		onClick: () => b(() => s ?? E),
		className: "copyable-value__copy",
		children: /* @__PURE__ */ l(t, {
			name: x ? "check" : "copy",
			size: "sm"
		})
	}), k;
	if (C) {
		let { head: e, tail: t } = w;
		k = /* @__PURE__ */ u("span", {
			className: "copyable-value__value",
			children: [e, /* @__PURE__ */ u("span", {
				className: "copyable-value__tail",
				children: [
					t,
					"⁠",
					O
				]
			})]
		});
	} else k = D ? /* @__PURE__ */ u("span", {
		className: "copyable-value__tail",
		children: [
			/* @__PURE__ */ l("span", {
				className: "copyable-value__value",
				children: o
			}),
			"⁠",
			O
		]
	}) : /* @__PURE__ */ u(c, { children: [
		/* @__PURE__ */ l("span", {
			className: "copyable-value__value",
			children: o
		}),
		"⁠",
		O
	] });
	return /* @__PURE__ */ u("span", {
		ref: _,
		className: S,
		children: [k, /* @__PURE__ */ l(n, {
			role: "status",
			children: x ? v("copied", f) : ""
		})]
	});
});
//#endregion
export { _ as CopyableValue };
