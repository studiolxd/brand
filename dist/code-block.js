'use client';
import './code-block.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Tag as n } from "./tag.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
var c = 1500;
function l({ children: l, language: u, copyable: d = !1, copyLabel: f = "Copiar código", copiedLabel: p = "Copiado", className: m }) {
	let h = o(null), [g, _] = s(!1);
	a(() => {
		if (!g) return;
		let e = setTimeout(() => _(!1), c);
		return () => clearTimeout(e);
	}, [g]);
	let v = async () => {
		let e = h.current?.textContent ?? "";
		await navigator.clipboard.writeText(e), _(!0);
	}, y = !!u || d;
	return /* @__PURE__ */ i("div", {
		className: ["code-block", m ?? ""].filter(Boolean).join(" "),
		children: [y && /* @__PURE__ */ i("div", {
			className: "code-block__header",
			children: [u && /* @__PURE__ */ r(n, {
				variant: "neutral",
				className: "code-block__language",
				children: u
			}), d && /* @__PURE__ */ r(t, {
				iconOnly: !0,
				variant: "ghost",
				size: "sm",
				"aria-label": g ? p : f,
				onClick: v,
				className: "code-block__copy",
				children: /* @__PURE__ */ r(e, {
					name: g ? "check" : "copy",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ r("pre", {
			className: "code-block__pre",
			children: /* @__PURE__ */ r("code", {
				ref: h,
				className: "code-block__code",
				children: l
			})
		})]
	});
}
//#endregion
export { l as CodeBlock };
