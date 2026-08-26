'use client';
import './pagination.css';
import { Icon as e } from "./icon.js";
import { Select as t } from "./select.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Pagination/Pagination.tsx
var i = [
	{
		label: "10",
		value: "10"
	},
	{
		label: "20",
		value: "20"
	},
	{
		label: "50",
		value: "50"
	},
	{
		label: "100",
		value: "100"
	},
	{
		label: "Todos",
		value: "all"
	}
];
function a(e, t) {
	return t <= 3 ? Array.from({ length: t }, (e, t) => t + 1) : e <= 3 ? [
		1,
		2,
		3,
		"..."
	] : e >= t - 2 ? [
		"...",
		t - 2,
		t - 1,
		t
	] : [
		"...",
		e - 1,
		e,
		e + 1,
		"..."
	];
}
function o({ total: o, page: s, pageSize: c, onPageChange: l, hrefBuilder: u, linkComponent: d, onPageSizeChange: f, pageSizeOptions: p = i, showTotal: m = !1, size: h = "md", ariaLabel: g = "Paginación", pageLabel: _ = (e) => `Página ${e}`, previousLabel: v = "Página anterior", nextLabel: y = "Página siguiente", pagesGroupLabel: b = "Páginas", pageSizeLabel: x = "Registros por página", totalLabel: S = (e) => `${e} resultados`, className: C }) {
	if (o === 0) return null;
	let w = d ?? "a", T = c === "all" ? 1 : Math.ceil(o / c), E = T > 1 ? a(s, T) : [];
	function D(e, t) {
		if (e === "...") return /* @__PURE__ */ n("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let r = e === s, i = ["pagination__btn", r ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return u ? /* @__PURE__ */ n(w, {
			href: r ? void 0 : u(e),
			className: i,
			"aria-current": r ? "page" : void 0,
			"aria-label": _(e),
			onClick: !r && l ? (t) => {
				t.preventDefault(), l(e);
			} : void 0,
			children: e
		}, e) : /* @__PURE__ */ n("button", {
			className: i,
			"aria-current": r ? "page" : void 0,
			"aria-label": _(e),
			onClick: r ? void 0 : () => l?.(e),
			children: e
		}, e);
	}
	function O(t, r, i) {
		let a = r === "prev" ? v : y, o = /* @__PURE__ */ n(e, {
			name: "chevron",
			size: h === "sm" ? "xs" : h === "lg" ? "md" : "sm",
			className: r === "prev" ? "pagination__chevron--prev" : void 0
		});
		return u ? /* @__PURE__ */ n(w, {
			href: i ? void 0 : u(t),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": a,
			"aria-disabled": i ? "true" : void 0,
			onClick: !i && l ? (e) => {
				e.preventDefault(), l(t);
			} : void 0,
			children: o
		}) : /* @__PURE__ */ n("button", {
			className: "pagination__btn pagination__btn--nav",
			disabled: i,
			"aria-label": a,
			onClick: () => l?.(t),
			children: o
		});
	}
	let k = m || !!f;
	return /* @__PURE__ */ r("nav", {
		className: [
			"pagination",
			`pagination--${h}`,
			C
		].filter(Boolean).join(" "),
		"aria-label": g,
		children: [k && /* @__PURE__ */ r("div", {
			className: "pagination__meta",
			children: [m && /* @__PURE__ */ n("span", {
				className: "pagination__summary",
				children: S(o)
			}), f && /* @__PURE__ */ n("div", {
				className: "pagination__size-selector",
				children: /* @__PURE__ */ n(t, {
					options: p,
					value: c === "all" ? "all" : String(c),
					onValueChange: f,
					"aria-label": x,
					size: h
				})
			})]
		}), T > 1 && /* @__PURE__ */ r("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": b,
			children: [
				O(s - 1, "prev", s <= 1),
				E.map((e, t) => D(e, t)),
				O(s + 1, "next", s >= T)
			]
		})]
	});
}
//#endregion
export { o as Pagination };
