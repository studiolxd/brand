import '../table.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { VisuallyHidden as n } from "../visually-hidden.js";
import { t as r } from "./overflow-focusable.js";
import { useId as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/table.ts
var c = {
	actions: "Acciones",
	sortable: "Activar ordenación",
	sortedAscending: "Ordenado ascendente",
	sortedDescending: "Ordenado descendente"
};
//#endregion
//#region src/stories/molecules/Table/Table.tsx
function l({ children: e, ...t }) {
	return /* @__PURE__ */ o("thead", {
		...t,
		children: e
	});
}
function u({ children: e, ...t }) {
	return /* @__PURE__ */ o("tfoot", {
		...t,
		children: e
	});
}
function d({ children: e, ...t }) {
	return /* @__PURE__ */ o("tbody", {
		...t,
		children: e
	});
}
function f({ sortable: r = !1, sorted: i = !1, onSort: a, actions: l = !1, actionsLabel: u, sortedAscLabel: d, sortedDescLabel: f, sortableLabel: p, sticky: m, nowrap: h = !1, children: g, className: _, scope: v = "col", ...y }) {
	let b = e("table", c), x = [
		"table__header",
		r ? "table__header--sortable" : "",
		i === "asc" ? "table__header--sorted-asc" : "",
		i === "desc" ? "table__header--sorted-desc" : "",
		l ? "table__header--actions" : "",
		m === "end" ? "table__header--sticky" : "",
		h ? "table__header--nowrap" : "",
		_
	].filter(Boolean).join(" ");
	return r ? /* @__PURE__ */ s("th", {
		...y,
		scope: v,
		className: x,
		"aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : "none",
		children: [/* @__PURE__ */ s("button", {
			type: "button",
			className: "table__header-content",
			onClick: a,
			children: [g, /* @__PURE__ */ o(t, {
				name: "chevron",
				size: "sm",
				className: "table__sort-icon"
			})]
		}), /* @__PURE__ */ o(n, { children: i === "asc" ? b("sortedAscending", d) : i === "desc" ? b("sortedDescending", f) : b("sortable", p) })]
	}) : l ? /* @__PURE__ */ o("th", {
		...y,
		scope: v,
		className: x,
		children: /* @__PURE__ */ o(n, { children: g ?? b("actions", u) })
	}) : /* @__PURE__ */ o("th", {
		...y,
		scope: v,
		className: x,
		children: g
	});
}
function p({ onClick: e, interactive: t = !1, selected: n = !1, label: r, children: i, className: a, ...s }) {
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
function m({ sticky: e, actions: t = !1, nowrap: n = !1, children: r, className: i, ...a }) {
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
function h({ caption: e, children: t, size: n = "md", className: c, ...l }) {
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
h.Head = l, h.Footer = u, h.Header = f, h.Body = d, h.Row = p, h.Cell = m;
//#endregion
export { l as a, u as i, d as n, f as o, m as r, p as s, h as t };
