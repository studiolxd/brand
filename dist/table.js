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
	return /* @__PURE__ */ n("tbody", { children: e });
}
function o({ sortable: i = !1, sorted: a = !1, onSort: o, children: s }) {
	let c = [
		"table__header",
		i ? "table__header--sortable" : "",
		a === "asc" ? "table__header--sorted-asc" : "",
		a === "desc" ? "table__header--sorted-desc" : ""
	].filter(Boolean).join(" ");
	return i ? /* @__PURE__ */ n("th", {
		scope: "col",
		className: c,
		onClick: o,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), o?.());
		},
		tabIndex: 0,
		"aria-sort": a === "asc" ? "ascending" : a === "desc" ? "descending" : "none",
		children: /* @__PURE__ */ r("span", {
			className: "table__header-content",
			children: [
				s,
				/* @__PURE__ */ n(e, {
					size: "xs",
					className: "table__sort-icon"
				}),
				/* @__PURE__ */ n(t, { children: a === "asc" ? "Ordenado ascendente" : a === "desc" ? "Ordenado descendente" : "Activar ordenación" })
			]
		})
	}) : /* @__PURE__ */ n("th", {
		scope: "col",
		className: c,
		children: s
	});
}
function s({ onClick: e, interactive: t = !1, children: r }) {
	let i = t || !!e, a = ["table__row", i ? "table__row--interactive" : ""].filter(Boolean).join(" ");
	return i ? /* @__PURE__ */ n("tr", {
		className: a,
		onClick: e,
		onKeyDown: (t) => {
			(t.key === "Enter" || t.key === " ") && (t.preventDefault(), e?.());
		},
		tabIndex: 0,
		children: r
	}) : /* @__PURE__ */ n("tr", {
		className: a,
		children: r
	});
}
function c({ children: e }) {
	return /* @__PURE__ */ n("td", {
		className: "table__cell",
		children: e
	});
}
function l({ caption: e, children: t, size: i = "md" }) {
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
l.Head = i, l.Header = o, l.Body = a, l.Row = s, l.Cell = c;
//#endregion
export { l as Table };
