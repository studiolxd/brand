'use client';
import './code-block.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { n as r } from "./_shared/copy-to-clipboard.js";
import { Tag as i } from "./tag.js";
import { useRef as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
var l = (e) => e ? `Bloque de código ${e}` : "Bloque de código";
function u({ children: u, language: d, copyable: f = !1, singleLine: p, copyLabel: m = "Copiar código", copiedLabel: h = "Copiado", codeLabel: g = l, className: _, ...v }) {
	let y = a(null), { status: b, copy: x } = r(), S = b === "copied", C = () => x(() => y.current?.textContent ?? ""), w = typeof u == "string" && !u.includes("\n"), T = p ?? w, E = !!d || f, D = [
		"code-block",
		T ? "code-block--single-line" : "",
		_ ?? ""
	].filter(Boolean).join(" "), O = d && /* @__PURE__ */ s(i, {
		variant: "neutral",
		className: "code-block__language",
		children: d
	}), k = f && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(n, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": m,
		onClick: C,
		className: "code-block__copy",
		children: /* @__PURE__ */ s(e, {
			name: S ? "check" : "copy",
			size: "sm"
		})
	}), /* @__PURE__ */ s(t, {
		role: "status",
		children: S ? h : ""
	})] }), A = /* @__PURE__ */ s("pre", {
		className: "code-block__pre",
		tabIndex: 0,
		role: "region",
		"aria-label": g(d),
		children: /* @__PURE__ */ s("code", {
			ref: y,
			className: "code-block__code",
			children: u
		})
	});
	return T ? /* @__PURE__ */ s("div", {
		className: D,
		...v,
		children: /* @__PURE__ */ c("div", {
			className: "code-block__row",
			children: [A, E && /* @__PURE__ */ c("div", {
				className: "code-block__controls",
				children: [O, k]
			})]
		})
	}) : /* @__PURE__ */ c("div", {
		className: D,
		...v,
		children: [E && /* @__PURE__ */ c("div", {
			className: "code-block__header",
			children: [O, k]
		}), A]
	});
}
function d({ type: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ s("span", {
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
export { u as CodeBlock, d as CodeToken };
