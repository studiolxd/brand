'use client';
import './code-block.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Tag as n } from "./tag.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/CodeBlock/CodeBlock.tsx
var c = 1500;
function l({ children: l, language: u, copyable: d = !1, copyLabel: f = "Copiar código", copiedLabel: p = "Copiado", className: m }) {
	let h = i(null), [g, _] = a(!1);
	r(() => {
		if (!g) return;
		let e = setTimeout(() => _(!1), c);
		return () => clearTimeout(e);
	}, [g]);
	let v = async () => {
		let e = h.current?.textContent ?? "";
		await navigator.clipboard.writeText(e), _(!0);
	}, y = !!u || d;
	return /* @__PURE__ */ s("div", {
		className: ["code-block", m ?? ""].filter(Boolean).join(" "),
		children: [y && /* @__PURE__ */ s("div", {
			className: "code-block__header",
			children: [u && /* @__PURE__ */ o(n, {
				variant: "neutral",
				className: "code-block__language",
				children: u
			}), d && /* @__PURE__ */ o(t, {
				iconOnly: !0,
				variant: "ghost",
				size: "sm",
				"aria-label": g ? p : f,
				onClick: v,
				className: "code-block__copy",
				children: /* @__PURE__ */ o(e, {
					name: g ? "check" : "copy",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ o("pre", {
			className: "code-block__pre",
			children: /* @__PURE__ */ o("code", {
				ref: h,
				className: "code-block__code",
				children: l
			})
		})]
	});
}
//#endregion
export { l as CodeBlock };
