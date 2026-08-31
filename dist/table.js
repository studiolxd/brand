'use client';
import './table.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Table/Table.tsx
function i({ children: e, ...t }) {
	return /* @__PURE__ */ n("thead", {
		...t,
		children: e
	});
}
function a({ children: e, ...t }) {
	return /* @__PURE__ */ n("tfoot", {
		...t,
		children: e
	});
}
function o({ children: e, ...t }) {
	return /* @__PURE__ */ n("tbody", {
		...t,
		children: e
	});
}
function s({ sortable: i = !1, sorted: a = !1, onSort: o, actions: s = !1, actionsLabel: c = "Acciones", sortedAscLabel: l = "Ordenado ascendente", sortedDescLabel: u = "Ordenado descendente", sortableLabel: d = "Activar ordenación", children: f, className: p, scope: m = "col", ...h }) {
	let g = [
		"table__header",
		i ? "table__header--sortable" : "",
		a === "asc" ? "table__header--sorted-asc" : "",
		a === "desc" ? "table__header--sorted-desc" : "",
		s ? "table__header--actions" : "",
		p
	].filter(Boolean).join(" ");
	return i ? /* @__PURE__ */ r("th", {
		...h,
		scope: m,
		className: g,
		"aria-sort": a === "asc" ? "ascending" : a === "desc" ? "descending" : "none",
		children: [/* @__PURE__ */ r("button", {
			type: "button",
			className: "table__header-content",
			onClick: o,
			children: [f, /* @__PURE__ */ n(e, {
				name: "chevron",
				size: "xs",
				className: "table__sort-icon"
			})]
		}), /* @__PURE__ */ n(t, { children: a === "asc" ? l : a === "desc" ? u : d })]
	}) : s ? /* @__PURE__ */ n("th", {
		...h,
		scope: m,
		className: g,
		children: /* @__PURE__ */ n(t, { children: f ?? c })
	}) : /* @__PURE__ */ n("th", {
		...h,
		scope: m,
		className: g,
		children: f
	});
}
function c({ onClick: e, interactive: t = !1, selected: r = !1, label: i, children: a, className: o, ...s }) {
	let c = t || !!e, l = c ? r : r || void 0, u = [
		"table__row",
		c ? "table__row--interactive" : "",
		r ? "table__row--selected" : "",
		o
	].filter(Boolean).join(" ");
	return c ? /* @__PURE__ */ n("tr", {
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
	}) : /* @__PURE__ */ n("tr", {
		...s,
		className: u,
		"aria-label": i,
		"aria-selected": l,
		children: a
	});
}
function l({ children: e, className: t, ...r }) {
	let i = ["table__cell", t].filter(Boolean).join(" ");
	return /* @__PURE__ */ n("td", {
		...r,
		className: i,
		children: e
	});
}
function u({ caption: e, children: t, size: i = "md", className: a, ...o }) {
	return /* @__PURE__ */ n("div", {
		className: "table__wrapper",
		children: /* @__PURE__ */ r("table", {
			className: [
				"table",
				i === "sm" ? "table--sm" : "",
				a ?? ""
			].filter(Boolean).join(" "),
			...o,
			children: [e && /* @__PURE__ */ n("caption", {
				className: "visually-hidden",
				children: e
			}), t]
		})
	});
}
u.Head = i, u.Footer = a, u.Header = s, u.Body = o, u.Row = c, u.Cell = l;
//#endregion
export { u as Table, o as TableBody, l as TableCell, a as TableFooter, i as TableHead, s as TableHeader, c as TableRow };
