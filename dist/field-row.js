'use client';
import './field-row.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/field-labels.js";
import { Children as n, createContext as r, isValidElement as i, useContext as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/FieldRow/FieldRow.tsx
var c = r(void 0);
function l({ labels: e = "first-row", empty: t, children: r, className: a, ...s }) {
	let l = n.toArray(r), u = ["field-rows", a].filter(Boolean).join(" ");
	return l.length === 0 && t ? /* @__PURE__ */ o("div", {
		className: u,
		...s,
		children: /* @__PURE__ */ o("div", {
			className: "field-rows__empty",
			children: t
		})
	}) : /* @__PURE__ */ o("div", {
		className: u,
		...s,
		children: l.map((t, n) => {
			let r = e === "every-row" || n === 0, a = i(t) && t.key != null ? t.key : n;
			return /* @__PURE__ */ o(c.Provider, {
				value: { labelled: r },
				children: t
			}, a);
		})
	});
}
function u({ widths: r, action: i, labelled: l, size: u, children: d, className: f, ...p }) {
	let m = e(u), h = a(c), g = l ?? h?.labelled ?? !0, _ = n.toArray(d), v = [
		"field-row",
		m === "md" ? "" : `field-row--${m}`,
		f
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ o(t.Provider, {
		value: !g,
		children: /* @__PURE__ */ s("div", {
			className: v,
			...p,
			children: [_.map((e, t) => /* @__PURE__ */ o("div", {
				className: `field-row__cell field-row__cell--${r?.[t] ?? (t === 0 ? "grow" : "md")}`,
				children: e
			}, t)), i && /* @__PURE__ */ s("div", {
				className: "field-row__action",
				children: [g && /* @__PURE__ */ o("span", {
					className: "field-row__action-offset",
					"aria-hidden": "true"
				}), i]
			})]
		})
	});
}
//#endregion
export { u as FieldRow, l as FieldRows };
