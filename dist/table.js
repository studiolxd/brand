'use client';
import './table.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Table/Table.tsx
function a({ children: e, ...t }) {
	return /* @__PURE__ */ r("thead", {
		...t,
		children: e
	});
}
function o({ children: e, ...t }) {
	return /* @__PURE__ */ r("tfoot", {
		...t,
		children: e
	});
}
function s({ children: e, ...t }) {
	return /* @__PURE__ */ r("tbody", {
		...t,
		children: e
	});
}
function c({ sortable: a = !1, sorted: o = !1, onSort: s, actions: c = !1, actionsLabel: l, sortedAscLabel: u, sortedDescLabel: d, sortableLabel: f, sticky: p, nowrap: m = !1, children: h, className: g, scope: _ = "col", ...v }) {
	let y = e("table"), b = [
		"table__header",
		a ? "table__header--sortable" : "",
		o === "asc" ? "table__header--sorted-asc" : "",
		o === "desc" ? "table__header--sorted-desc" : "",
		c ? "table__header--actions" : "",
		p === "end" ? "table__header--sticky" : "",
		m ? "table__header--nowrap" : "",
		g
	].filter(Boolean).join(" ");
	return a ? /* @__PURE__ */ i("th", {
		...v,
		scope: _,
		className: b,
		"aria-sort": o === "asc" ? "ascending" : o === "desc" ? "descending" : "none",
		children: [/* @__PURE__ */ i("button", {
			type: "button",
			className: "table__header-content",
			onClick: s,
			children: [h, /* @__PURE__ */ r(t, {
				name: "chevron",
				size: "xs",
				className: "table__sort-icon"
			})]
		}), /* @__PURE__ */ r(n, { children: o === "asc" ? y("sortedAscending", u) : o === "desc" ? y("sortedDescending", d) : y("sortable", f) })]
	}) : c ? /* @__PURE__ */ r("th", {
		...v,
		scope: _,
		className: b,
		children: /* @__PURE__ */ r(n, { children: h ?? y("actions", l) })
	}) : /* @__PURE__ */ r("th", {
		...v,
		scope: _,
		className: b,
		children: h
	});
}
function l({ onClick: e, interactive: t = !1, selected: n = !1, label: i, children: a, className: o, ...s }) {
	let c = t || !!e, l = c ? n : n || void 0, u = [
		"table__row",
		c ? "table__row--interactive" : "",
		n ? "table__row--selected" : "",
		o
	].filter(Boolean).join(" ");
	return c ? /* @__PURE__ */ r("tr", {
		...s,
		className: u,
		"aria-label": i,
		"aria-selected": l,
		onClick: e,
		onKeyDown: (t) => {
			(t.key === "Enter" || t.key === " ") && (t.preventDefault(), e?.());
		},
		tabIndex: 0,
		children: a
	}) : /* @__PURE__ */ r("tr", {
		...s,
		className: u,
		"aria-label": i,
		"aria-selected": l,
		children: a
	});
}
function u({ sticky: e, actions: t = !1, nowrap: n = !1, children: i, className: a, ...o }) {
	let s = [
		"table__cell",
		e === "end" ? "table__cell--sticky" : "",
		t ? "table__cell--actions" : "",
		n ? "table__cell--nowrap" : "",
		a
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r("td", {
		...o,
		className: s,
		children: i
	});
}
function d({ caption: e, children: t, size: n = "md", className: a, ...o }) {
	return /* @__PURE__ */ r("div", {
		className: "table__wrapper",
		children: /* @__PURE__ */ i("table", {
			className: [
				"table",
				n === "sm" ? "table--sm" : "",
				a ?? ""
			].filter(Boolean).join(" "),
			...o,
			children: [e && /* @__PURE__ */ r("caption", {
				className: "visually-hidden",
				children: e
			}), t]
		})
	});
}
d.Head = a, d.Footer = o, d.Header = c, d.Body = s, d.Row = l, d.Cell = u;
//#endregion
export { d as Table, s as TableBody, u as TableCell, o as TableFooter, a as TableHead, c as TableHeader, l as TableRow };
