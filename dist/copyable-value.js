'use client';
import './copyable-value.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { n as r } from "./_shared/copy-to-clipboard.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, isValidElement as c } from "react";
//#region src/stories/atoms/CopyableValue/CopyableValue.tsx
var l = 6, u = 12, d = new Set([
	"/",
	"-",
	"_",
	"."
]);
function f(e) {
	if (e.length <= l) return {
		head: "",
		tail: e
	};
	let t = Math.max(0, e.length - u);
	for (let n = e.length - 2; n >= t; n--) if (d.has(e[n])) return {
		head: e.slice(0, n),
		tail: e.slice(n)
	};
	return {
		head: e.slice(0, e.length - l),
		tail: e.slice(e.length - l)
	};
}
function p(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) {
		let t = "";
		for (let n of e) {
			let e = p(n);
			if (e === null) return null;
			t += e;
		}
		return t;
	}
	return c(e) ? p(e.props.children) : null;
}
var m = 24, h = s(function({ children: s, copyText: c, copyLabel: l = "Copiar", copiedLabel: u = "Copiado", className: d }, h) {
	let { status: g, copy: _ } = r(), v = g === "copied", y = ["copyable-value", d].filter(Boolean).join(" "), b = typeof s == "string", x = b ? f(s) : null, S = b ? null : p(s), C = b ? s : S ?? "", w = !b && S !== null && !/\s/.test(S) && S.length <= m, T = /* @__PURE__ */ a(n, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": l,
		onClick: () => _(() => c ?? C),
		className: "copyable-value__copy",
		children: /* @__PURE__ */ a(e, {
			name: v ? "check" : "copy",
			size: "sm"
		})
	}), E;
	if (b) {
		let { head: e, tail: t } = x;
		E = /* @__PURE__ */ o("span", {
			className: "copyable-value__value",
			children: [e, /* @__PURE__ */ o("span", {
				className: "copyable-value__tail",
				children: [
					t,
					"⁠",
					T
				]
			})]
		});
	} else E = w ? /* @__PURE__ */ o("span", {
		className: "copyable-value__tail",
		children: [
			/* @__PURE__ */ a("span", {
				className: "copyable-value__value",
				children: s
			}),
			"⁠",
			T
		]
	}) : /* @__PURE__ */ o(i, { children: [
		/* @__PURE__ */ a("span", {
			className: "copyable-value__value",
			children: s
		}),
		"⁠",
		T
	] });
	return /* @__PURE__ */ o("span", {
		ref: h,
		className: y,
		children: [E, /* @__PURE__ */ a(t, {
			role: "status",
			children: v ? u : ""
		})]
	});
});
//#endregion
export { h as CopyableValue };
