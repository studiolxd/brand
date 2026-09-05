'use client';
import './field-row.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/field-labels.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Children as i, createContext as a, isValidElement as o, useContext as s } from "react";
//#region src/stories/molecules/FieldRow/FieldRow.tsx
var c = a(void 0);
function l({ labels: e = "first-row", empty: t, children: r, className: a, ...s }) {
	let l = i.toArray(r), u = ["field-rows", a].filter(Boolean).join(" ");
	return l.length === 0 && t ? /* @__PURE__ */ n("div", {
		className: u,
		...s,
		children: /* @__PURE__ */ n("div", {
			className: "field-rows__empty",
			children: t
		})
	}) : /* @__PURE__ */ n("div", {
		className: u,
		...s,
		children: l.map((t, r) => {
			let i = e === "every-row" || r === 0, a = o(t) && t.key != null ? t.key : r;
			return /* @__PURE__ */ n(c.Provider, {
				value: { labelled: i },
				children: t
			}, a);
		})
	});
}
function u({ widths: a, action: o, labelled: l, size: u, children: d, className: f, ...p }) {
	let m = e(u), h = s(c), g = l ?? h?.labelled ?? !0, _ = i.toArray(d), v = [
		"field-row",
		m === "md" ? "" : `field-row--${m}`,
		f
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(t.Provider, {
		value: !g,
		children: /* @__PURE__ */ r("div", {
			className: v,
			...p,
			children: [_.map((e, t) => /* @__PURE__ */ n("div", {
				className: `field-row__cell field-row__cell--${a?.[t] ?? (t === 0 ? "grow" : "md")}`,
				children: e
			}, t)), o && /* @__PURE__ */ r("div", {
				className: "field-row__action",
				children: [g && /* @__PURE__ */ n("span", {
					className: "field-row__action-offset",
					"aria-hidden": "true"
				}), o]
			})]
		})
	});
}
//#endregion
export { u as FieldRow, l as FieldRows };
