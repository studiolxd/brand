'use client';
import './recovery-codes.css';
import { Inline as e } from "./inline.js";
import { CopyButton as t } from "./copy-button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/RecoveryCodes/RecoveryCodes.tsx
function i({ codes: i, columns: a = 2, labels: o, actions: s, className: c, id: l }) {
	return /* @__PURE__ */ r("div", {
		className: ["recovery-codes", c].filter(Boolean).join(" "),
		id: l,
		children: [/* @__PURE__ */ n("ol", {
			className: "recovery-codes__list",
			"aria-label": o.list,
			"data-columns": a,
			children: i.map((e, t) => /* @__PURE__ */ n("li", {
				className: "recovery-codes__item",
				children: /* @__PURE__ */ n("code", {
					className: "recovery-codes__code",
					children: e
				})
			}, t))
		}), /* @__PURE__ */ r(e, {
			gap: "sm",
			className: "recovery-codes__actions",
			children: [/* @__PURE__ */ n(t, {
				value: () => i.join("\n"),
				copiedLabel: o.copied,
				variant: "outline",
				children: o.copy
			}), s]
		})]
	});
}
//#endregion
export { i as RecoveryCodes };
