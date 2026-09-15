'use client';
import './pagination.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Select as n } from "./select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Pagination/Pagination.tsx
function a(e) {
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
function o(e, t) {
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
function s({ mode: s = "pages", total: c, pageCount: l, page: u = 1, pageSize: d = 10, hrefs: f, previousHref: p, nextHref: m, onPrevious: h, onNext: g, onPageChange: _, hrefBuilder: v, linkComponent: y, onPageSizeChange: b, pageSizeOptions: x, afterPageSize: S, showTotal: C = !1, size: w = "md", ariaLabel: T, pageLabel: E, previousLabel: D, nextLabel: O, pagesGroupLabel: k, pageSizeLabel: A, totalLabel: j, className: M }) {
	let N = e("pagination"), P = v ?? (f ? (e) => f[e] : void 0), F = y ?? "a";
	if (s === "cursor") {
		let e = w === "sm" ? "xs" : w === "lg" ? "md" : "sm", n = (n) => {
			let i = n === "prev" ? p : m, a = n === "prev" ? h : g, o = !i && !a, s = n === "prev" ? N("previous", D) : N("next", O), c = /* @__PURE__ */ r(t, {
				name: "chevron",
				size: e,
				className: n === "prev" ? "pagination__chevron--prev" : void 0
			});
			return i ? /* @__PURE__ */ r(F, {
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
				`pagination--${w}`,
				M
			].filter(Boolean).join(" "),
			"aria-label": N("label", T),
			children: /* @__PURE__ */ i("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": N("pagesGroup", k),
				children: [n("prev"), n("next")]
			})
		});
	}
	if (c === 0 || l === 0 || c === void 0 && (l ?? 1) <= 1 && !S) return null;
	let I = c ?? 0, L = l ?? (d === "all" ? 1 : Math.ceil(I / d)), R = L > 1 ? o(u, L) : [];
	function z(e, t) {
		if (e === "...") return /* @__PURE__ */ r("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let n = e === u, i = ["pagination__btn", n ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return P && !n ? /* @__PURE__ */ r(F, {
			href: P(e),
			className: i,
			"aria-label": N("goToPage", E)(e),
			onClick: _ ? (t) => {
				t.preventDefault(), _(e);
			} : void 0,
			children: e
		}, e) : /* @__PURE__ */ r("button", {
			type: "button",
			className: i,
			"aria-current": n ? "page" : void 0,
			"aria-label": N("goToPage", E)(e),
			onClick: n ? void 0 : () => _?.(e),
			children: e
		}, e);
	}
	function B(e, n, i) {
		let a = n === "prev" ? N("previous", D) : N("next", O), o = /* @__PURE__ */ r(t, {
			name: "chevron",
			size: w === "sm" ? "xs" : w === "lg" ? "md" : "sm",
			className: n === "prev" ? "pagination__chevron--prev" : void 0
		});
		return P && !i ? /* @__PURE__ */ r(F, {
			href: P(e),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": a,
			onClick: _ ? (t) => {
				t.preventDefault(), _(e);
			} : void 0,
			children: o
		}) : /* @__PURE__ */ r("button", {
			type: "button",
			className: "pagination__btn pagination__btn--nav",
			disabled: i,
			"aria-label": a,
			onClick: () => _?.(e),
			children: o
		});
	}
	let V = C || !!b || !!S;
	return /* @__PURE__ */ i("nav", {
		className: [
			"pagination",
			`pagination--${w}`,
			M
		].filter(Boolean).join(" "),
		"aria-label": N("label", T),
		children: [V && /* @__PURE__ */ i("div", {
			className: "pagination__meta",
			children: [
				C && /* @__PURE__ */ r("span", {
					className: "pagination__summary",
					children: N("total", j)(I)
				}),
				b && /* @__PURE__ */ r("div", {
					className: "pagination__size-selector",
					children: /* @__PURE__ */ r(n, {
						options: x ?? a(N("allOption")),
						value: d === "all" ? "all" : String(d),
						onValueChange: b,
						"aria-label": N("perPage", A),
						size: w
					})
				}),
				S && /* @__PURE__ */ r("div", {
					className: "pagination__after-page-size",
					children: S
				})
			]
		}), L > 1 && /* @__PURE__ */ i("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": N("pagesGroup", k),
			children: [
				B(u - 1, "prev", u <= 1),
				R.map((e, t) => z(e, t)),
				B(u + 1, "next", u >= L)
			]
		})]
	});
}
//#endregion
export { s as Pagination };
