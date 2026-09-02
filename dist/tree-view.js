'use client';
import './tree-view.css';
import { Icon as e } from "./icon.js";
import { useCallback as t, useId as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
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
	let b = n(), x = i(null), [S, C] = a(f ?? []), w = d !== void 0, T = w ? d : S, [E, D] = a(h), O = m !== void 0, k = O ? m : E, A = r(() => new Set(T), [T]), j = r(() => l(u, A), [u, A]), [M, N] = a(void 0), P = M && j.some((e) => e.node.id === M) ? M : k && j.some((e) => e.node.id === k) ? k : j[0]?.node.id, F = i(""), I = i(0), L = t((e) => {
		w || C(e), p?.(e);
	}, [w, p]), R = t((e, t) => {
		let n = A.has(e), r = t ?? !n;
		r !== n && L(r ? [...T, e] : T.filter((t) => t !== e));
	}, [
		T,
		A,
		L
	]), z = t((e) => {
		O || D(e), g?.(e);
	}, [O, g]), B = t((e) => {
		let t = j.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !A.has(e));
		t.length !== 0 && L([...T, ...t]);
	}, [
		T,
		j,
		A,
		L
	]), V = t((e) => `${b}-${e}`, [b]), H = t((e) => {
		e && (N(e), x.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), U = t((e, t) => {
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
	function G(t, n, r) {
		return t.map((t) => {
			let i = !!t.children?.length, a = i && A.has(t.id), c = k === t.id;
			return /* @__PURE__ */ s("li", {
				role: "treeitem",
				"data-tree-item": t.id,
				"aria-labelledby": V(t.id),
				"aria-expanded": i ? a : void 0,
				"aria-selected": c,
				"aria-level": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: P === t.id ? 0 : -1,
				className: [
					"tree-view__item",
					c ? "tree-view__item--selected" : "",
					t.disabled ? "tree-view__item--disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (e) => {
					e.target === e.currentTarget && W(e, {
						node: t,
						level: n,
						parentId: r
					});
				},
				onFocus: (e) => {
					e.target === e.currentTarget && N(t.id);
				},
				onClick: t.disabled ? void 0 : (e) => {
					e.stopPropagation(), i && R(t.id), z(t.id), H(t.id);
				},
				children: [/* @__PURE__ */ s("span", {
					className: "tree-view__row",
					children: [
						/* @__PURE__ */ o("span", {
							className: "tree-view__chevron-slot",
							"aria-hidden": "true",
							children: i && /* @__PURE__ */ o(e, {
								name: "chevron",
								className: "tree-view__chevron",
								size: "sm"
							})
						}),
						t.icon && /* @__PURE__ */ o("span", {
							className: "tree-view__icon",
							"aria-hidden": "true",
							children: t.icon
						}),
						/* @__PURE__ */ o("span", {
							className: "tree-view__label",
							id: V(t.id),
							children: t.label
						})
					]
				}), i && a && /* @__PURE__ */ o("ul", {
					role: "group",
					className: "tree-view__group",
					children: G(t.children, n + 1, t.id)
				})]
			}, t.id);
		});
	}
	return /* @__PURE__ */ o("ul", {
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
