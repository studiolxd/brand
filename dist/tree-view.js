'use client';
import './tree-view.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useId as i, useMemo as a, useRef as o, useState as s } from "react";
//#region src/stories/molecules/TreeView/TreeView.tsx
var c = 500;
function l(e, t, n = 1, r) {
	return e.flatMap((e) => [{
		node: e,
		level: n,
		parentId: r
	}, ...e.children && t.has(e.id) ? l(e.children, t, n + 1, e.id) : []]);
}
function u({ items: u, expanded: d, defaultExpanded: f, onExpandedChange: p, selected: m, defaultSelected: h, onSelectedChange: g, label: _ = "Árbol", className: v, ...y }) {
	let b = i(), x = o(null), [S, C] = s(f ?? []), w = d !== void 0, T = w ? d : S, [E, D] = s(h), O = m !== void 0, k = O ? m : E, A = a(() => new Set(T), [T]), j = a(() => l(u, A), [u, A]), [M, N] = s(void 0), P = M && j.some((e) => e.node.id === M) ? M : k && j.some((e) => e.node.id === k) ? k : j[0]?.node.id, F = o(""), I = o(0), L = r((e) => {
		w || C(e), p?.(e);
	}, [w, p]), R = r((e, t) => {
		let n = A.has(e), r = t ?? !n;
		r !== n && L(r ? [...T, e] : T.filter((t) => t !== e));
	}, [
		T,
		A,
		L
	]), z = r((e) => {
		O || D(e), g?.(e);
	}, [O, g]), B = r((e) => {
		let t = j.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !A.has(e));
		t.length !== 0 && L([...T, ...t]);
	}, [
		T,
		j,
		A,
		L
	]), V = r((e) => `${b}-${e}`, [b]), H = r((e) => {
		e && (N(e), x.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), U = r((e, t) => {
		let n = Date.now(), r = n - I.current > c ? e : F.current + e;
		F.current = r, I.current = n;
		let i = r.length === 1 ? t + 1 : Math.max(t, 0), a = r.toLowerCase();
		for (let e = 0; e < j.length; e++) {
			let t = j[(i + e) % j.length].node.id;
			if ((x.current?.querySelector(`[data-tree-item="${CSS.escape(t)}"] > .tree-view__row .tree-view__label`)?.textContent ?? "").trim().toLowerCase().startsWith(a)) {
				H(t);
				return;
			}
		}
	}, [j, H]);
	function W(e, t) {
		let { node: n, parentId: r } = t, i = j.findIndex((e) => e.node.id === n.id), a = !!n.children?.length, o = A.has(n.id);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), H(j[i + 1]?.node.id);
				break;
			case "ArrowUp":
				e.preventDefault(), H(j[i - 1]?.node.id);
				break;
			case "ArrowRight":
				e.preventDefault(), a && !o ? R(n.id, !0) : a && o && H(j[i + 1]?.node.id);
				break;
			case "ArrowLeft":
				e.preventDefault(), a && o ? R(n.id, !1) : r && H(r);
				break;
			case "Home":
				e.preventDefault(), H(j[0]?.node.id);
				break;
			case "End":
				e.preventDefault(), H(j[j.length - 1]?.node.id);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), n.disabled || z(n.id);
				break;
			case "*":
				e.preventDefault(), B(t);
				break;
			default:
				e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), U(e.key, i));
				break;
		}
	}
	function G(r, i, a) {
		return r.map((r) => {
			let o = !!r.children?.length, s = o && A.has(r.id), c = k === r.id;
			return /* @__PURE__ */ n("li", {
				role: "treeitem",
				"data-tree-item": r.id,
				"aria-labelledby": V(r.id),
				"aria-expanded": o ? s : void 0,
				"aria-selected": c,
				"aria-level": i,
				"aria-disabled": r.disabled || void 0,
				tabIndex: P === r.id ? 0 : -1,
				className: [
					"tree-view__item",
					c ? "tree-view__item--selected" : "",
					r.disabled ? "tree-view__item--disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (e) => {
					e.target === e.currentTarget && W(e, {
						node: r,
						level: i,
						parentId: a
					});
				},
				onFocus: (e) => {
					e.target === e.currentTarget && N(r.id);
				},
				onClick: r.disabled ? void 0 : (e) => {
					e.stopPropagation(), o && R(r.id), z(r.id), H(r.id);
				},
				children: [/* @__PURE__ */ n("span", {
					className: "tree-view__row",
					children: [
						/* @__PURE__ */ t("span", {
							className: "tree-view__chevron-slot",
							"aria-hidden": "true",
							children: o && /* @__PURE__ */ t(e, {
								name: "chevron",
								className: "tree-view__chevron",
								size: "sm"
							})
						}),
						r.icon && /* @__PURE__ */ t("span", {
							className: "tree-view__icon",
							"aria-hidden": "true",
							children: r.icon
						}),
						/* @__PURE__ */ t("span", {
							className: "tree-view__label",
							id: V(r.id),
							children: r.label
						})
					]
				}), o && s && /* @__PURE__ */ t("ul", {
					role: "group",
					className: "tree-view__group",
					children: G(r.children, i + 1, r.id)
				})]
			}, r.id);
		});
	}
	return /* @__PURE__ */ t("ul", {
		ref: x,
		role: "tree",
		"aria-label": _,
		className: ["tree-view", v].filter(Boolean).join(" "),
		...y,
		children: G(u, 1)
	});
}
//#endregion
export { u as TreeView };
