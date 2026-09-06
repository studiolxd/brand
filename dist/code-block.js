'use client';
import './code-block.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Tag as r } from "./tag.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { useEffect as s, useRef as c, useState as l } from "react";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
var u = 1500, d = (e) => e ? `Bloque de código ${e}` : "Bloque de código";
function f({ children: f, language: p, copyable: m = !1, singleLine: h, copyLabel: g = "Copiar código", copiedLabel: _ = "Copiado", codeLabel: v = d, className: y, ...b }) {
	let x = c(null), [S, C] = l(!1);
	s(() => {
		if (!S) return;
		let e = setTimeout(() => C(!1), u);
		return () => clearTimeout(e);
	}, [S]);
	let w = async () => {
		let e = x.current?.textContent ?? "";
		try {
			await navigator.clipboard.writeText(e), C(!0);
		} catch {
			C(!1);
		}
	}, T = typeof f == "string" && !f.includes("\n"), E = h ?? T, D = !!p || m, O = [
		"code-block",
		E ? "code-block--single-line" : "",
		y ?? ""
	].filter(Boolean).join(" "), k = p && /* @__PURE__ */ a(r, {
		variant: "neutral",
		className: "code-block__language",
		children: p
	}), A = m && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, {
		iconOnly: !0,
		variant: "ghost",
		size: "sm",
		"aria-label": g,
		onClick: w,
		className: "code-block__copy",
		children: /* @__PURE__ */ a(e, {
			name: S ? "check" : "copy",
			size: "sm"
		})
	}), /* @__PURE__ */ a(t, {
		role: "status",
		children: S ? _ : ""
	})] }), j = /* @__PURE__ */ a("pre", {
		className: "code-block__pre",
		tabIndex: 0,
		role: "region",
		"aria-label": v(p),
		children: /* @__PURE__ */ a("code", {
			ref: x,
			className: "code-block__code",
			children: f
		})
	});
	return E ? /* @__PURE__ */ a("div", {
		className: O,
		...b,
		children: /* @__PURE__ */ o("div", {
			className: "code-block__row",
			children: [j, D && /* @__PURE__ */ o("div", {
				className: "code-block__controls",
				children: [k, A]
			})]
		})
	}) : /* @__PURE__ */ o("div", {
		className: O,
		...b,
		children: [D && /* @__PURE__ */ o("div", {
			className: "code-block__header",
			children: [k, A]
		}), j]
	});
}
//#endregion
export { f as CodeBlock };
