'use client';
import './copyable-value.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { n as i } from "./_shared/copy-to-clipboard.js";
import { forwardRef as a, isValidElement as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/atoms/CopyableValue/CopyableValue.tsx
var u = 6, d = 12, f = new Set([
	"/",
	"-",
	"_",
	"."
]);
function p(e) {
	if (e.length <= u) return {
		head: "",
		tail: e
	};
	let t = Math.max(0, e.length - d);
	for (let n = e.length - 2; n >= t; n--) if (f.has(e[n])) return {
		head: e.slice(0, n),
		tail: e.slice(n)
	};
	return {
		head: e.slice(0, e.length - u),
		tail: e.slice(e.length - u)
	};
}
function m(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) {
		let t = "";
		for (let n of e) {
			let e = m(n);
			if (e === null) return null;
			t += e;
		}
		return t;
	}
	return o(e) ? m(e.props.children) : null;
}
var h = 24, g = a(function({ children: a, copyText: o, copyLabel: u, copiedLabel: d, className: f }, g) {
	let _ = e("copy"), { status: v, copy: y } = i(), b = v === "copied", x = ["copyable-value", f].filter(Boolean).join(" "), S = typeof a == "string", C = S ? p(a) : null, w = S ? null : m(a), T = S ? a : w ?? "", E = !S && w !== null && !/\s/.test(w) && w.length <= h, D = /* @__PURE__ */ c(r, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": _("label", u),
		onClick: () => y(() => o ?? T),
		className: "copyable-value__copy",
		children: /* @__PURE__ */ c(t, {
			name: b ? "check" : "copy",
			size: "sm"
		})
	}), O;
	if (S) {
		let { head: e, tail: t } = C;
		O = /* @__PURE__ */ l("span", {
			className: "copyable-value__value",
			children: [e, /* @__PURE__ */ l("span", {
				className: "copyable-value__tail",
				children: [
					t,
					"⁠",
					D
				]
			})]
		});
	} else O = E ? /* @__PURE__ */ l("span", {
		className: "copyable-value__tail",
		children: [
			/* @__PURE__ */ c("span", {
				className: "copyable-value__value",
				children: a
			}),
			"⁠",
			D
		]
	}) : /* @__PURE__ */ l(s, { children: [
		/* @__PURE__ */ c("span", {
			className: "copyable-value__value",
			children: a
		}),
		"⁠",
		D
	] });
	return /* @__PURE__ */ l("span", {
		ref: g,
		className: x,
		children: [O, /* @__PURE__ */ c(n, {
			role: "status",
			children: b ? _("copied", d) : ""
		})]
	});
});
//#endregion
export { g as CopyableValue };
