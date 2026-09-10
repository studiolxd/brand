'use client';
import './code-block.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { n as r } from "./_shared/copy-to-clipboard.js";
import { Tag as i } from "./tag.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { useRef as c } from "react";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
var l = (e) => e ? `Bloque de código ${e}` : "Bloque de código";
function u({ children: u, language: d, copyable: f = !1, singleLine: p, copyLabel: m = "Copiar código", copiedLabel: h = "Copiado", codeLabel: g = l, className: _, ...v }) {
	let y = c(null), { status: b, copy: x } = r(), S = b === "copied", C = () => x(() => y.current?.textContent ?? ""), w = typeof u == "string" && !u.includes("\n"), T = p ?? w, E = !!d || f, D = [
		"code-block",
		T ? "code-block--single-line" : "",
		_ ?? ""
	].filter(Boolean).join(" "), O = d && /* @__PURE__ */ o(i, {
		variant: "neutral",
		className: "code-block__language",
		children: d
	}), k = f && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(n, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": m,
		onClick: C,
		className: "code-block__copy",
		children: /* @__PURE__ */ o(e, {
			name: S ? "check" : "copy",
			size: "sm"
		})
	}), /* @__PURE__ */ o(t, {
		role: "status",
		children: S ? h : ""
	})] }), A = /* @__PURE__ */ o("pre", {
		className: "code-block__pre",
		tabIndex: 0,
		role: "region",
		"aria-label": g(d),
		children: /* @__PURE__ */ o("code", {
			ref: y,
			className: "code-block__code",
			children: u
		})
	});
	return T ? /* @__PURE__ */ o("div", {
		className: D,
		...v,
		children: /* @__PURE__ */ s("div", {
			className: "code-block__row",
			children: [A, E && /* @__PURE__ */ s("div", {
				className: "code-block__controls",
				children: [O, k]
			})]
		})
	}) : /* @__PURE__ */ s("div", {
		className: D,
		...v,
		children: [E && /* @__PURE__ */ s("div", {
			className: "code-block__header",
			children: [O, k]
		}), A]
	});
}
function d({ type: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ o("span", {
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
