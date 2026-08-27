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
function f({ children: f, language: p, copyable: m = !1, copyLabel: h = "Copiar código", copiedLabel: g = "Copiado", codeLabel: _ = d, className: v, ...y }) {
	let b = c(null), [x, S] = l(!1);
	s(() => {
		if (!x) return;
		let e = setTimeout(() => S(!1), u);
		return () => clearTimeout(e);
	}, [x]);
	let C = async () => {
		let e = b.current?.textContent ?? "";
		try {
			await navigator.clipboard.writeText(e), S(!0);
		} catch {
			S(!1);
		}
	}, w = !!p || m;
	return /* @__PURE__ */ o("div", {
		className: ["code-block", v ?? ""].filter(Boolean).join(" "),
		...y,
		children: [w && /* @__PURE__ */ o("div", {
			className: "code-block__header",
			children: [p && /* @__PURE__ */ a(r, {
				variant: "neutral",
				className: "code-block__language",
				children: p
			}), m && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, {
				iconOnly: !0,
				variant: "ghost",
				size: "sm",
				"aria-label": h,
				onClick: C,
				className: "code-block__copy",
				children: /* @__PURE__ */ a(e, {
					name: x ? "check" : "copy",
					size: "sm"
				})
			}), /* @__PURE__ */ a(t, {
				role: "status",
				children: x ? g : ""
			})] })]
		}), /* @__PURE__ */ a("pre", {
			className: "code-block__pre",
			tabIndex: 0,
			role: "region",
			"aria-label": _(p),
			children: /* @__PURE__ */ a("code", {
				ref: b,
				className: "code-block__code",
				children: f
			})
		})]
	});
}
//#endregion
export { f as CodeBlock };
