'use client';
import './pagination.css';
import { Select as e } from "./select.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/Pagination/Pagination.tsx
var r = [
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
function i(e, t) {
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
function a({ total: a, page: o, pageSize: s, onPageChange: c, hrefBuilder: l, linkComponent: u, onPageSizeChange: d, pageSizeOptions: f = r, showTotal: p = !1, ariaLabel: m = "Paginación", className: h }) {
	if (a === 0) return null;
	let g = u ?? "a", _ = s === "all" ? 1 : Math.ceil(a / s), v = _ > 1 ? i(o, _) : [];
	function y(e, n) {
		if (e === "...") return /* @__PURE__ */ t("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${n}`);
		let r = e === o, i = ["pagination__btn", r ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return l ? /* @__PURE__ */ t(g, {
			href: r ? void 0 : l(e),
			className: i,
			"aria-current": r ? "page" : void 0,
			"aria-disabled": r ? "true" : void 0,
			"aria-label": `Página ${e}`,
			onClick: !r && c ? (t) => {
				t.preventDefault(), c(e);
			} : void 0,
			children: e
		}, e) : /* @__PURE__ */ t("button", {
			className: i,
			disabled: r,
			"aria-current": r ? "page" : void 0,
			"aria-label": `Página ${e}`,
			onClick: () => c?.(e),
			children: e
		}, e);
	}
	function b(e, n, r, i) {
		return l ? /* @__PURE__ */ t(g, {
			href: i ? void 0 : l(e),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": r,
			"aria-disabled": i ? "true" : void 0,
			onClick: !i && c ? (t) => {
				t.preventDefault(), c(e);
			} : void 0,
			children: n
		}) : /* @__PURE__ */ t("button", {
			className: "pagination__btn pagination__btn--nav",
			disabled: i,
			"aria-label": r,
			onClick: () => c?.(e),
			children: n
		});
	}
	return /* @__PURE__ */ n("nav", {
		className: ["pagination", h].filter(Boolean).join(" "),
		"aria-label": m,
		children: [
			p && /* @__PURE__ */ n("span", {
				className: "pagination__summary",
				children: [a, " resultados"]
			}),
			d && /* @__PURE__ */ n("div", {
				className: "pagination__size-selector",
				children: [/* @__PURE__ */ t("span", {
					className: "pagination__size-label",
					children: "Registros por página"
				}), /* @__PURE__ */ t(e, {
					options: f,
					value: s === "all" ? "all" : String(s),
					onValueChange: d,
					"aria-label": "Registros por página"
				})]
			}),
			_ > 1 && /* @__PURE__ */ n("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": "Páginas",
				children: [
					b(o - 1, "Anterior", "Página anterior", o <= 1),
					v.map((e, t) => y(e, t)),
					b(o + 1, "Siguiente", "Página siguiente", o >= _)
				]
			})
		]
	});
}
//#endregion
export { a as Pagination };
