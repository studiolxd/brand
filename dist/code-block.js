'use client';
import './code-block.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Tag as n } from "./tag.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
var c = 1500;
function l({ children: l, language: u, copyable: d = !1, className: f }) {
	let p = o(null), [m, h] = s(!1);
	a(() => {
		if (!m) return;
		let e = setTimeout(() => h(!1), c);
		return () => clearTimeout(e);
	}, [m]);
	let g = async () => {
		let e = p.current?.textContent ?? "";
		await navigator.clipboard.writeText(e), h(!0);
	}, _ = !!u || d;
	return /* @__PURE__ */ i("div", {
		className: ["code-block", f ?? ""].filter(Boolean).join(" "),
		children: [_ && /* @__PURE__ */ i("div", {
			className: "code-block__header",
			children: [u && /* @__PURE__ */ r(n, {
				variant: "neutral",
				className: "code-block__language",
				children: u
			}), d && /* @__PURE__ */ r(t, {
				iconOnly: !0,
				variant: "ghost",
				size: "sm",
				"aria-label": m ? "Copiado" : "Copiar código",
				onClick: g,
				className: "code-block__copy",
				children: /* @__PURE__ */ r(e, {
					name: m ? "check" : "copy",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ r("pre", {
			className: "code-block__pre",
			children: /* @__PURE__ */ r("code", {
				ref: p,
				className: "code-block__code",
				children: l
			})
		})]
	});
}
//#endregion
export { l as CodeBlock };
