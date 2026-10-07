import '../pagination.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { t as n } from "./select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/messages/es/pagination.ts
var a = {
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
function o(e) {
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
function s(e, t) {
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
function c({ mode: c = "pages", total: l, pageCount: u, page: d = 1, pageSize: f = 10, hrefs: p, previousHref: m, nextHref: h, onPrevious: g, onNext: _, onPageChange: v, hrefBuilder: y, linkComponent: b, onPageSizeChange: x, pageSizeOptions: S, afterPageSize: C, showTotal: w = !1, size: T = "md", ariaLabel: E, pageLabel: D, previousLabel: O, nextLabel: k, pagesGroupLabel: A, pageSizeLabel: j, totalLabel: M, className: N }) {
	let P = e("pagination", a), F = y ?? (p ? (e) => p[e] : void 0), I = b ?? "a";
	if (c === "cursor") {
		let e = T === "lg" ? "md" : "sm", n = (n) => {
			let i = n === "prev" ? m : h, a = n === "prev" ? g : _, o = !i && !a, s = n === "prev" ? P("previous", O) : P("next", k), c = /* @__PURE__ */ r(t, {
				name: "chevron",
				size: e,
				className: n === "prev" ? "pagination__chevron--prev" : void 0
			});
			return i ? /* @__PURE__ */ r(I, {
				href: i,
				className: "pagination__btn pagination__btn--nav",
				"aria-label": s,
				children: c
			}) : /* @__PURE__ */ r("button", {
				type: "button",
				className: "pagination__btn pagination__btn--nav",
				disabled: o,
				"aria-label": s,
				onClick: a,
				children: c
			});
		};
		return /* @__PURE__ */ r("nav", {
			className: [
				"pagination",
				`pagination--${T}`,
				N
			].filter(Boolean).join(" "),
			"aria-label": P("label", E),
			children: /* @__PURE__ */ i("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": P("pagesGroup", A),
				children: [n("prev"), n("next")]
			})
		});
	}
	if (l === 0 || u === 0 || l === void 0 && (u ?? 1) <= 1 && !C) return null;
	let L = l ?? 0, R = u ?? (f === "all" ? 1 : Math.ceil(L / f)), z = R > 1 ? s(d, R) : [];
	function B(e, t) {
		if (e === "...") return /* @__PURE__ */ r("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let n = e === d, i = ["pagination__btn", n ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return F && !n ? /* @__PURE__ */ r(I, {
			href: F(e),
			className: i,
			"aria-label": P("goToPage", D)(e),
			onClick: v ? (t) => {
				t.preventDefault(), v(e);
			} : void 0,
			children: e
		}, e) : /* @__PURE__ */ r("button", {
			type: "button",
			className: i,
			"aria-current": n ? "page" : void 0,
			"aria-label": P("goToPage", D)(e),
			onClick: n ? void 0 : () => v?.(e),
			children: e
		}, e);
	}
	function V(e, n, i) {
		let a = n === "prev" ? P("previous", O) : P("next", k), o = /* @__PURE__ */ r(t, {
			name: "chevron",
			size: T === "lg" ? "md" : "sm",
			className: n === "prev" ? "pagination__chevron--prev" : void 0
		});
		return F && !i ? /* @__PURE__ */ r(I, {
			href: F(e),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": a,
			onClick: v ? (t) => {
				t.preventDefault(), v(e);
			} : void 0,
			children: o
		}) : /* @__PURE__ */ r("button", {
			type: "button",
			className: "pagination__btn pagination__btn--nav",
			disabled: i,
			"aria-label": a,
			onClick: () => v?.(e),
			children: o
		});
	}
	let H = w || !!x || !!C;
	return /* @__PURE__ */ i("nav", {
		className: [
			"pagination",
			`pagination--${T}`,
			N
		].filter(Boolean).join(" "),
		"aria-label": P("label", E),
		children: [H && /* @__PURE__ */ i("div", {
			className: "pagination__meta",
			children: [
				w && /* @__PURE__ */ r("span", {
					className: "pagination__summary",
					children: P("total", M)(L)
				}),
				x && /* @__PURE__ */ r("div", {
					className: "pagination__size-selector",
					children: /* @__PURE__ */ r(n, {
						options: S ?? o(P("allOption")),
						value: f === "all" ? "all" : String(f),
						onValueChange: x,
						"aria-label": P("perPage", j),
						size: T
					})
				}),
				C && /* @__PURE__ */ r("div", {
					className: "pagination__after-page-size",
					children: C
				})
			]
		}), R > 1 && /* @__PURE__ */ i("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": P("pagesGroup", A),
			children: [
				V(d - 1, "prev", d <= 1),
				z.map((e, t) => B(e, t)),
				V(d + 1, "next", d >= R)
			]
		})]
	});
}
//#endregion
export { c as t };
