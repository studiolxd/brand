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
function o({ mode: o = "pages", total: s = 0, pageCount: c, page: l = 1, pageSize: u = 10, hrefs: d, previousHref: f, nextHref: p, onPrevious: m, onNext: h, onPageChange: g, hrefBuilder: _, linkComponent: v, onPageSizeChange: y, pageSizeOptions: b = i, afterPageSize: x, showTotal: S = !1, size: C = "md", ariaLabel: w = "Paginación", pageLabel: T = (e) => `Página ${e}`, previousLabel: E = "Página anterior", nextLabel: D = "Página siguiente", pagesGroupLabel: O = "Páginas", pageSizeLabel: k = "Registros por página", totalLabel: A = (e) => `${e} resultados`, className: j }) {
	let M = _ ?? (d ? (e) => d[e] : void 0), N = v ?? "a";
	if (o === "cursor") {
		let t = C === "sm" ? "xs" : C === "lg" ? "md" : "sm", i = (r) => {
			let i = r === "prev" ? f : p, a = r === "prev" ? m : h, o = !i && !a, s = r === "prev" ? E : D, c = /* @__PURE__ */ n(e, {
				name: "chevron",
				size: t,
				className: r === "prev" ? "pagination__chevron--prev" : void 0
			});
			return i ? /* @__PURE__ */ n(N, {
				href: i,
				className: "pagination__btn pagination__btn--nav",
				"aria-label": s,
				children: c
			}) : /* @__PURE__ */ n("button", {
				type: "button",
				className: "pagination__btn pagination__btn--nav",
				disabled: o,
				"aria-label": s,
				onClick: a,
				children: c
			});
		};
		return /* @__PURE__ */ n("nav", {
			className: [
				"pagination",
				`pagination--${C}`,
				j
			].filter(Boolean).join(" "),
			"aria-label": w,
			children: /* @__PURE__ */ r("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": O,
				children: [i("prev"), i("next")]
			})
		});
	}
	if (c === void 0 && s === 0 && !x) return null;
	let P = c ?? (u === "all" ? 1 : Math.ceil(s / u)), F = P > 1 ? a(l, P) : [];
	function I(e, t) {
		if (e === "...") return /* @__PURE__ */ n("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let r = e === l, i = ["pagination__btn", r ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return M && !r ? /* @__PURE__ */ n(N, {
			href: M(e),
			className: i,
			"aria-label": T(e),
			onClick: g ? (t) => {
				t.preventDefault(), g(e);
			} : void 0,
			children: e
		}, e) : /* @__PURE__ */ n("button", {
			type: "button",
			className: i,
			"aria-current": r ? "page" : void 0,
			"aria-label": T(e),
			onClick: r ? void 0 : () => g?.(e),
			children: e
		}, e);
	}
	function L(t, r, i) {
		let a = r === "prev" ? E : D, o = /* @__PURE__ */ n(e, {
			name: "chevron",
			size: C === "sm" ? "xs" : C === "lg" ? "md" : "sm",
			className: r === "prev" ? "pagination__chevron--prev" : void 0
		});
		return M && !i ? /* @__PURE__ */ n(N, {
			href: M(t),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": a,
			onClick: g ? (e) => {
				e.preventDefault(), g(t);
			} : void 0,
			children: o
		}) : /* @__PURE__ */ n("button", {
			type: "button",
			className: "pagination__btn pagination__btn--nav",
			disabled: i,
			"aria-label": a,
			onClick: () => g?.(t),
			children: o
		});
	}
	let R = S || !!y || !!x;
	return /* @__PURE__ */ r("nav", {
		className: [
			"pagination",
			`pagination--${C}`,
			j
		].filter(Boolean).join(" "),
		"aria-label": w,
		children: [R && /* @__PURE__ */ r("div", {
			className: "pagination__meta",
			children: [
				S && /* @__PURE__ */ n("span", {
					className: "pagination__summary",
					children: A(s)
				}),
				y && /* @__PURE__ */ n("div", {
					className: "pagination__size-selector",
					children: /* @__PURE__ */ n(t, {
						options: b,
						value: u === "all" ? "all" : String(u),
						onValueChange: y,
						"aria-label": k,
						size: C
					})
				}),
				x && /* @__PURE__ */ n("div", {
					className: "pagination__after-page-size",
					children: x
				})
			]
		}), P > 1 && /* @__PURE__ */ r("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": O,
			children: [
				L(l - 1, "prev", l <= 1),
				F.map((e, t) => I(e, t)),
				L(l + 1, "next", l >= P)
			]
		})]
	});
}
//#endregion
export { o as Pagination };
