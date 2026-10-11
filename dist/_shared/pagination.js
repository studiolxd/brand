import '../pagination.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Select as n } from "../select.js";
import { t as r } from "./default-render-link.js";
import { Fragment as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/pagination.ts
var s = {
	label: "Paginación",
	pagesGroup: "Páginas",
	previous: "Página anterior",
	next: "Página siguiente",
	goToPage: (e) => `Página ${e}`,
	perPage: "Registros por página",
	total: (e) => `${e} resultados`,
	allOption: "Todos"
};
//#endregion
//#region src/stories/molecules/Pagination/Pagination.tsx
function c(e) {
	return [
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
			label: e,
			value: "all"
		}
	];
}
function l(e, t) {
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
function u({ mode: u = "pages", total: d, pageCount: f, page: p = 1, pageSize: m = 10, hrefs: h, previousHref: g, nextHref: _, onPrevious: v, onNext: y, onPageChange: b, hrefBuilder: x, renderLink: S = r, onPageSizeChange: C, pageSizeOptions: w, afterPageSize: T, showTotal: E = !1, size: D = "md", "aria-label": O, pageLabel: k, previousLabel: A, nextLabel: j, pagesGroupLabel: M, pageSizeLabel: N, totalLabel: P, className: F }) {
	let I = e("pagination", s), L = x ?? (h ? (e) => h[e] : void 0);
	if (u === "cursor") {
		let e = D === "lg" ? "md" : "sm", n = (n) => {
			let r = n === "prev" ? g : _, i = n === "prev" ? v : y, o = !r && !i, s = n === "prev" ? I("previous", A) : I("next", j), c = /* @__PURE__ */ a(t, {
				name: "chevron",
				size: e,
				className: n === "prev" ? "pagination__chevron--prev" : void 0
			});
			return r ? S({
				href: r,
				className: "pagination__btn pagination__btn--nav",
				"aria-label": s,
				children: c
			}) : /* @__PURE__ */ a("button", {
				type: "button",
				className: "pagination__btn pagination__btn--nav",
				disabled: o,
				"aria-label": s,
				onClick: i,
				children: c
			});
		};
		return /* @__PURE__ */ a("nav", {
			className: [
				"pagination",
				`pagination--${D}`,
				F
			].filter(Boolean).join(" "),
			"aria-label": I("label", O),
			children: /* @__PURE__ */ o("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": I("pagesGroup", M),
				children: [n("prev"), n("next")]
			})
		});
	}
	if (d === 0 || f === 0 || d === void 0 && (f ?? 1) <= 1 && !T) return null;
	let R = d ?? 0, z = f ?? (m === "all" ? 1 : Math.ceil(R / m)), B = z > 1 ? l(p, z) : [];
	function V(e, t) {
		if (e === "...") return /* @__PURE__ */ a("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let n = e === p, r = ["pagination__btn", n ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return L && !n ? /* @__PURE__ */ a(i, { children: S({
			href: L(e),
			className: r,
			"aria-label": I("goToPage", k)(e),
			onClick: b ? (t) => {
				t.preventDefault(), b(e);
			} : void 0,
			children: e
		}) }, e) : /* @__PURE__ */ a("button", {
			type: "button",
			className: r,
			"aria-current": n ? "page" : void 0,
			"aria-label": I("goToPage", k)(e),
			onClick: n ? void 0 : () => b?.(e),
			children: e
		}, e);
	}
	function H(e, n, r) {
		let i = n === "prev" ? I("previous", A) : I("next", j), o = /* @__PURE__ */ a(t, {
			name: "chevron",
			size: D === "lg" ? "md" : "sm",
			className: n === "prev" ? "pagination__chevron--prev" : void 0
		});
		return L && !r ? S({
			href: L(e),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": i,
			onClick: b ? (t) => {
				t.preventDefault(), b(e);
			} : void 0,
			children: o
		}) : /* @__PURE__ */ a("button", {
			type: "button",
			className: "pagination__btn pagination__btn--nav",
			disabled: r,
			"aria-label": i,
			onClick: () => b?.(e),
			children: o
		});
	}
	let U = E || !!C || !!T;
	return /* @__PURE__ */ o("nav", {
		className: [
			"pagination",
			`pagination--${D}`,
			F
		].filter(Boolean).join(" "),
		"aria-label": I("label", O),
		children: [U && /* @__PURE__ */ o("div", {
			className: "pagination__meta",
			children: [
				E && /* @__PURE__ */ a("span", {
					className: "pagination__summary",
					children: I("total", P)(R)
				}),
				C && /* @__PURE__ */ a("div", {
					className: "pagination__size-selector",
					children: /* @__PURE__ */ a(n, {
						options: w ?? c(I("allOption")),
						value: m === "all" ? "all" : String(m),
						onValueChange: C,
						"aria-label": I("perPage", N),
						size: D
					})
				}),
				T && /* @__PURE__ */ a("div", {
					className: "pagination__after-page-size",
					children: T
				})
			]
		}), z > 1 && /* @__PURE__ */ o("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": I("pagesGroup", M),
			children: [
				H(p - 1, "prev", p <= 1),
				B.map((e, t) => V(e, t)),
				H(p + 1, "next", p >= z)
			]
		})]
	});
}
//#endregion
export { u as t };
