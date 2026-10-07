'use client';
import './table.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { t as r } from "./_shared/overflow-focusable.js";
import { useId as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/Table/Table.tsx
function c({ children: e, ...t }) {
	return /* @__PURE__ */ o("thead", {
		...t,
		children: e
	});
}
function l({ children: e, ...t }) {
	return /* @__PURE__ */ o("tfoot", {
		...t,
		children: e
	});
}
function u({ children: e, ...t }) {
	return /* @__PURE__ */ o("tbody", {
		...t,
		children: e
	});
}
function d({ sortable: r = !1, sorted: i = !1, onSort: a, actions: c = !1, actionsLabel: l, sortedAscLabel: u, sortedDescLabel: d, sortableLabel: f, sticky: p, nowrap: m = !1, children: h, className: g, scope: _ = "col", ...v }) {
	let y = e("table"), b = [
		"table__header",
		r ? "table__header--sortable" : "",
		i === "asc" ? "table__header--sorted-asc" : "",
		i === "desc" ? "table__header--sorted-desc" : "",
		c ? "table__header--actions" : "",
		p === "end" ? "table__header--sticky" : "",
		m ? "table__header--nowrap" : "",
		g
	].filter(Boolean).join(" ");
	return r ? /* @__PURE__ */ s("th", {
		...v,
		scope: _,
		className: b,
		"aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : "none",
		children: [/* @__PURE__ */ s("button", {
			type: "button",
			className: "table__header-content",
			onClick: a,
			children: [h, /* @__PURE__ */ o(t, {
				name: "chevron",
				size: "sm",
				className: "table__sort-icon"
			})]
		}), /* @__PURE__ */ o(n, { children: i === "asc" ? y("sortedAscending", u) : i === "desc" ? y("sortedDescending", d) : y("sortable", f) })]
	}) : c ? /* @__PURE__ */ o("th", {
		...v,
		scope: _,
		className: b,
		children: /* @__PURE__ */ o(n, { children: h ?? y("actions", l) })
	}) : /* @__PURE__ */ o("th", {
		...v,
		scope: _,
		className: b,
		children: h
	});
}
function f({ onClick: e, interactive: t = !1, selected: n = !1, label: r, children: i, className: a, ...s }) {
	let c = t || !!e, l = [
		"table__row",
		c ? "table__row--interactive" : "",
		n ? "table__row--selected" : "",
		a
	].filter(Boolean).join(" ");
	return c ? /* @__PURE__ */ o("tr", {
		...s,
		className: l,
		"aria-label": r,
		onClick: e,
		onKeyDown: (t) => {
			(t.key === "Enter" || t.key === " ") && (t.preventDefault(), e?.());
		},
		tabIndex: 0,
		children: i
	}) : /* @__PURE__ */ o("tr", {
		...s,
		className: l,
		"aria-label": r,
		children: i
	});
}
function p({ sticky: e, actions: t = !1, nowrap: n = !1, children: r, className: i, ...a }) {
	let s = [
		"table__cell",
		e === "end" ? "table__cell--sticky" : "",
		t ? "table__cell--actions" : "",
		n ? "table__cell--nowrap" : "",
		i
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ o("td", {
		...a,
		className: s,
		children: r
	});
}
function m({ caption: e, children: t, size: n = "md", className: c, ...l }) {
	let u = [
		"table",
		n === "sm" ? "table--sm" : "",
		c ?? ""
	].filter(Boolean).join(" "), d = a(null), f = i(), p = r(d), m = e ? { "aria-labelledby": f } : l["aria-labelledby"] ? { "aria-labelledby": l["aria-labelledby"] } : l["aria-label"] ? { "aria-label": l["aria-label"] } : void 0;
	return /* @__PURE__ */ o("div", {
		ref: d,
		className: "table__wrapper",
		...p ? {
			tabIndex: 0,
			...m && {
				role: "region",
				...m
			}
		} : void 0,
		children: /* @__PURE__ */ s("table", {
			className: u,
			...l,
			children: [e && /* @__PURE__ */ o("caption", {
				id: f,
				className: "visually-hidden",
				children: e
			}), t]
		})
	});
}
m.Head = c, m.Footer = l, m.Header = d, m.Body = u, m.Row = f, m.Cell = p;
//#endregion
export { m as Table, u as TableBody, p as TableCell, l as TableFooter, c as TableHead, d as TableHeader, f as TableRow };
