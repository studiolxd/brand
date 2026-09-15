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
function u({ items: u, expanded: d, defaultExpanded: f, onExpandedChange: p, selected: m, defaultSelected: h, onSelectedChange: g, label: _ = "Árbol", truncateFromLevel: v = 4, nodeRef: y, className: b, ...x }) {
	let S = n(), C = i(null), [w, T] = a(f ?? []), E = d !== void 0, D = E ? d : w, [O, k] = a(h), A = m !== void 0, j = A ? m : O, M = r(() => new Set(D), [D]), N = r(() => l(u, M), [u, M]), [P, F] = a(void 0), I = P && N.some((e) => e.node.id === P) ? P : j && N.some((e) => e.node.id === j) ? j : N[0]?.node.id, L = i(""), R = i(0), z = t((e) => {
		E || T(e), p?.(e);
	}, [E, p]), B = t((e, t) => {
		let n = M.has(e), r = t ?? !n;
		r !== n && z(r ? [...D, e] : D.filter((t) => t !== e));
	}, [
		D,
		M,
		z
	]), V = t((e) => {
		A || k(e), g?.(e);
	}, [A, g]), H = t((e) => {
		let t = N.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !M.has(e));
		t.length !== 0 && z([...D, ...t]);
	}, [
		D,
		N,
		M,
		z
	]), U = t((e) => `${S}-${e}`, [S]), W = t((e) => {
		e && (F(e), C.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), G = t((e, t) => {
		let n = Date.now(), r = n - R.current > c ? e : L.current + e;
		L.current = r, R.current = n;
		let i = r.length === 1 ? t + 1 : Math.max(t, 0), a = r.toLowerCase();
		for (let e = 0; e < N.length; e++) {
			let t = N[(i + e) % N.length].node.id;
			if ((C.current?.querySelector(`[data-tree-item="${CSS.escape(t)}"] > .tree-view__row .tree-view__label`)?.textContent ?? "").trim().toLowerCase().startsWith(a)) {
				W(t);
				return;
			}
		}
	}, [N, W]);
	function K(e, t) {
		let { node: n, parentId: r } = t, i = N.findIndex((e) => e.node.id === n.id), a = !!n.children?.length, o = M.has(n.id);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), W(N[i + 1]?.node.id);
				break;
			case "ArrowUp":
				e.preventDefault(), W(N[i - 1]?.node.id);
				break;
			case "ArrowRight":
				e.preventDefault(), a && !o ? B(n.id, !0) : a && o && W(N[i + 1]?.node.id);
				break;
			case "ArrowLeft":
				e.preventDefault(), a && o ? B(n.id, !1) : r && W(r);
				break;
			case "Home":
				e.preventDefault(), W(N[0]?.node.id);
				break;
			case "End":
				e.preventDefault(), W(N[N.length - 1]?.node.id);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), n.disabled || V(n.id);
				break;
			case "*":
				e.preventDefault(), H(t);
				break;
			default:
				e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), G(e.key, i));
				break;
		}
	}
	function q(t, n, r) {
		return t.map((t) => {
			let i = !!t.children?.length, a = i && M.has(t.id), c = j === t.id, l = a && t.iconExpanded || t.icon, u = n >= v, d = u && typeof t.label == "string" ? t.label : void 0, f = t.dropTarget ? "target" : t.dropDisabled ? "disabled" : void 0;
			return /* @__PURE__ */ s("li", {
				role: "treeitem",
				"data-tree-item": t.id,
				"aria-labelledby": U(t.id),
				"aria-expanded": i ? a : void 0,
				"aria-selected": c,
				"aria-level": n,
				"aria-disabled": t.disabled || void 0,
				"data-drop": f,
				tabIndex: I === t.id ? 0 : -1,
				className: [
					"tree-view__item",
					c ? "tree-view__item--selected" : "",
					t.disabled ? "tree-view__item--disabled" : "",
					t.dropTarget ? "tree-view__item--drop-target" : "",
					t.dropDisabled ? "tree-view__item--drop-disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (e) => {
					e.target === e.currentTarget && K(e, {
						node: t,
						level: n,
						parentId: r
					});
				},
				onFocus: (e) => {
					e.target === e.currentTarget && F(t.id);
				},
				onClick: t.disabled ? void 0 : (e) => {
					e.stopPropagation(), i && B(t.id), V(t.id), W(t.id);
				},
				children: [/* @__PURE__ */ s("span", {
					className: "tree-view__row",
					ref: y ? (e) => y(t.id, e) : void 0,
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
						l && /* @__PURE__ */ o("span", {
							className: "tree-view__icon",
							"aria-hidden": "true",
							children: l
						}),
						/* @__PURE__ */ o("span", {
							className: ["tree-view__label", u ? "tree-view__label--truncated" : ""].filter(Boolean).join(" "),
							id: U(t.id),
							title: d,
							children: t.label
						}),
						t.actions && /* @__PURE__ */ o("span", {
							className: "tree-view__actions",
							onClick: (e) => e.stopPropagation(),
							onKeyDown: (e) => e.stopPropagation(),
							onKeyUp: (e) => e.stopPropagation(),
							children: t.actions
						})
					]
				}), i && a && /* @__PURE__ */ o("ul", {
					role: "group",
					className: "tree-view__group",
					children: q(t.children, n + 1, t.id)
				})]
			}, t.id);
		});
	}
	return /* @__PURE__ */ o("ul", {
		ref: C,
		role: "tree",
		"aria-label": _,
		className: ["tree-view", b].filter(Boolean).join(" "),
		...x,
		children: q(u, 1)
	});
}
//#endregion
export { u as TreeView };
