'use client';
import './table.css';
import { Chevron as e } from "./chevron.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Table/Table.tsx
function i({ children: e }) {
	return /* @__PURE__ */ n("thead", { children: e });
}
function a({ children: e }) {
	return /* @__PURE__ */ n("tfoot", { children: e });
}
function o({ children: e }) {
	return /* @__PURE__ */ n("tbody", { children: e });
}
function s({ sortable: i = !1, sorted: a = !1, onSort: o, actions: s = !1, actionsLabel: c = "Acciones", children: l, className: u, scope: d = "col", ...f }) {
	let p = [
		"table__header",
		i ? "table__header--sortable" : "",
		a === "asc" ? "table__header--sorted-asc" : "",
		a === "desc" ? "table__header--sorted-desc" : "",
		s ? "table__header--actions" : "",
		u
	].filter(Boolean).join(" ");
	return i ? /* @__PURE__ */ n("th", {
		...f,
		scope: d,
		className: p,
		onClick: o,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), o?.());
		},
		tabIndex: 0,
		"aria-sort": a === "asc" ? "ascending" : a === "desc" ? "descending" : "none",
		children: /* @__PURE__ */ r("span", {
			className: "table__header-content",
			children: [
				l,
				/* @__PURE__ */ n(e, {
					size: "xs",
					className: "table__sort-icon"
				}),
				/* @__PURE__ */ n(t, { children: a === "asc" ? "Ordenado ascendente" : a === "desc" ? "Ordenado descendente" : "Activar ordenación" })
			]
		})
	}) : s ? /* @__PURE__ */ n("th", {
		...f,
		scope: d,
		className: p,
		children: /* @__PURE__ */ n(t, { children: l ?? c })
	}) : /* @__PURE__ */ n("th", {
		...f,
		scope: d,
		className: p,
		children: l
	});
}
function c({ onClick: e, interactive: t = !1, children: r, className: i, ...a }) {
	let o = t || !!e, s = [
		"table__row",
		o ? "table__row--interactive" : "",
		i
	].filter(Boolean).join(" ");
	return o ? /* @__PURE__ */ n("tr", {
		...a,
		className: s,
		onClick: e,
		onKeyDown: (t) => {
			(t.key === "Enter" || t.key === " ") && (t.preventDefault(), e?.());
		},
		tabIndex: 0,
		children: r
	}) : /* @__PURE__ */ n("tr", {
		...a,
		className: s,
		children: r
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
function u({ caption: e, children: t, size: i = "md" }) {
	return /* @__PURE__ */ n("div", {
		className: "table__wrapper",
		children: /* @__PURE__ */ r("table", {
			className: ["table", i === "sm" ? "table--sm" : ""].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ n("caption", {
				className: "visually-hidden",
				children: e
			}), t]
		})
	});
}
u.Head = i, u.Footer = a, u.Header = s, u.Body = o, u.Row = c, u.Cell = l;
//#endregion
export { u as Table };
