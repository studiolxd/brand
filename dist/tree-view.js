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
function u({ items: u, expanded: d, defaultExpanded: f, onExpandedChange: p, selected: m, defaultSelected: h, onSelectedChange: g, label: _ = "Árbol", truncateFromLevel: v = 4, nodeRef: y, className: b, ...x }) {
	let S = i(), C = o(null), [w, T] = s(f ?? []), E = d !== void 0, D = E ? d : w, [O, k] = s(h), A = m !== void 0, j = A ? m : O, M = a(() => new Set(D), [D]), N = a(() => l(u, M), [u, M]), [P, F] = s(void 0), I = P && N.some((e) => e.node.id === P) ? P : j && N.some((e) => e.node.id === j) ? j : N[0]?.node.id, L = o(""), R = o(0), z = r((e) => {
		E || T(e), p?.(e);
	}, [E, p]), B = r((e, t) => {
		let n = M.has(e), r = t ?? !n;
		r !== n && z(r ? [...D, e] : D.filter((t) => t !== e));
	}, [
		D,
		M,
		z
	]), V = r((e) => {
		A || k(e), g?.(e);
	}, [A, g]), H = r((e) => {
		let t = N.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !M.has(e));
		t.length !== 0 && z([...D, ...t]);
	}, [
		D,
		N,
		M,
		z
	]), U = r((e) => `${S}-${e}`, [S]), W = r((e) => {
		e && (F(e), C.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), G = r((e, t) => {
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
	function q(r, i, a) {
		return r.map((r) => {
			let o = !!r.children?.length, s = o && M.has(r.id), c = j === r.id, l = s && r.iconExpanded || r.icon, u = i >= v, d = u && typeof r.label == "string" ? r.label : void 0, f = r.dropTarget ? "target" : r.dropDisabled ? "disabled" : void 0;
			return /* @__PURE__ */ n("li", {
				role: "treeitem",
				"data-tree-item": r.id,
				"aria-labelledby": U(r.id),
				"aria-expanded": o ? s : void 0,
				"aria-selected": c,
				"aria-level": i,
				"aria-disabled": r.disabled || void 0,
				"data-drop": f,
				tabIndex: I === r.id ? 0 : -1,
				className: [
					"tree-view__item",
					c ? "tree-view__item--selected" : "",
					r.disabled ? "tree-view__item--disabled" : "",
					r.dropTarget ? "tree-view__item--drop-target" : "",
					r.dropDisabled ? "tree-view__item--drop-disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (e) => {
					e.target === e.currentTarget && K(e, {
						node: r,
						level: i,
						parentId: a
					});
				},
				onFocus: (e) => {
					e.target === e.currentTarget && F(r.id);
				},
				onClick: r.disabled ? void 0 : (e) => {
					e.stopPropagation(), o && B(r.id), V(r.id), W(r.id);
				},
				children: [/* @__PURE__ */ n("span", {
					className: "tree-view__row",
					ref: y ? (e) => y(r.id, e) : void 0,
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
						l && /* @__PURE__ */ t("span", {
							className: "tree-view__icon",
							"aria-hidden": "true",
							children: l
						}),
						/* @__PURE__ */ t("span", {
							className: ["tree-view__label", u ? "tree-view__label--truncated" : ""].filter(Boolean).join(" "),
							id: U(r.id),
							title: d,
							children: r.label
						}),
						r.actions && /* @__PURE__ */ t("span", {
							className: "tree-view__actions",
							onClick: (e) => e.stopPropagation(),
							onKeyDown: (e) => e.stopPropagation(),
							onKeyUp: (e) => e.stopPropagation(),
							children: r.actions
						})
					]
				}), o && s && /* @__PURE__ */ t("ul", {
					role: "group",
					className: "tree-view__group",
					children: q(r.children, i + 1, r.id)
				})]
			}, r.id);
		});
	}
	return /* @__PURE__ */ t("ul", {
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
