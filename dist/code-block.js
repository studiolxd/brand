'use client';
import './code-block.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { r as i, t as a } from "./_shared/copy.js";
import { Tag as o } from "./tag.js";
import { useRef as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/messages/es/codeBlock.ts
var d = {
	copy: "Copiar código",
	region: (e) => e ? `Bloque de código ${e}` : "Bloque de código"
};
//#endregion
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
function f({ children: f, language: p, copyable: m = !1, singleLine: h, copyLabel: g, copiedLabel: _, codeLabel: v, className: y, ...b }) {
	let x = e("codeBlock", d), S = e("copy", a), C = s(null), { status: w, copy: T } = i(), E = w === "copied", D = () => T(() => C.current?.textContent ?? ""), O = typeof f == "string" && !f.includes("\n"), k = h ?? O, A = !!p || m, j = [
		"code-block",
		k ? "code-block--single-line" : "",
		y ?? ""
	].filter(Boolean).join(" "), M = p && /* @__PURE__ */ l(o, {
		variant: "neutral",
		className: "code-block__language",
		children: p
	}), N = m && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(r, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": x("copy", g),
		onClick: D,
		className: "code-block__copy",
		children: /* @__PURE__ */ l(t, {
			name: E ? "check" : "copy",
			size: "sm"
		})
	}), /* @__PURE__ */ l(n, {
		role: "status",
		children: E ? S("copied", _) : ""
	})] }), P = /* @__PURE__ */ l("pre", {
		className: "code-block__pre",
		tabIndex: 0,
		role: "region",
		"aria-label": x("region", v)(p),
		children: /* @__PURE__ */ l("code", {
			ref: C,
			className: "code-block__code",
			children: f
		})
	});
	return k ? /* @__PURE__ */ l("div", {
		className: j,
		...b,
		children: /* @__PURE__ */ u("div", {
			className: "code-block__row",
			children: [P, A && /* @__PURE__ */ u("div", {
				className: "code-block__controls",
				children: [M, N]
			})]
		})
	}) : /* @__PURE__ */ u("div", {
		className: j,
		...b,
		children: [A && /* @__PURE__ */ u("div", {
			className: "code-block__header",
			children: [M, N]
		}), P]
	});
}
function p({ type: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ l("span", {
		className: [
			"code-block__token",
			`code-block__token--${e}`,
			t ?? ""
		].filter(Boolean).join(" "),
		...r,
		children: n
	});
}
//#endregion
export { f as CodeBlock, p as CodeToken };
