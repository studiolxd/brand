'use client';
import './code-block.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { n as i } from "./_shared/copy-to-clipboard.js";
import { Tag as a } from "./tag.js";
import { useRef as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
function u({ children: u, language: d, copyable: f = !1, singleLine: p, copyLabel: m, copiedLabel: h, codeLabel: g, className: _, ...v }) {
	let y = e("codeBlock"), b = e("copy"), x = o(null), { status: S, copy: C } = i(), w = S === "copied", T = () => C(() => x.current?.textContent ?? ""), E = typeof u == "string" && !u.includes("\n"), D = p ?? E, O = !!d || f, k = [
		"code-block",
		D ? "code-block--single-line" : "",
		_ ?? ""
	].filter(Boolean).join(" "), A = d && /* @__PURE__ */ c(a, {
		variant: "neutral",
		className: "code-block__language",
		children: d
	}), j = f && /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(r, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": y("copy", m),
		onClick: T,
		className: "code-block__copy",
		children: /* @__PURE__ */ c(t, {
			name: w ? "check" : "copy",
			size: "sm"
		})
	}), /* @__PURE__ */ c(n, {
		role: "status",
		children: w ? b("copied", h) : ""
	})] }), M = /* @__PURE__ */ c("pre", {
		className: "code-block__pre",
		tabIndex: 0,
		role: "region",
		"aria-label": y("region", g)(d),
		children: /* @__PURE__ */ c("code", {
			ref: x,
			className: "code-block__code",
			children: u
		})
	});
	return D ? /* @__PURE__ */ c("div", {
		className: k,
		...v,
		children: /* @__PURE__ */ l("div", {
			className: "code-block__row",
			children: [M, O && /* @__PURE__ */ l("div", {
				className: "code-block__controls",
				children: [A, j]
			})]
		})
	}) : /* @__PURE__ */ l("div", {
		className: k,
		...v,
		children: [O && /* @__PURE__ */ l("div", {
			className: "code-block__header",
			children: [A, j]
		}), M]
	});
}
function d({ type: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ c("span", {
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
