'use client';
import './tree-view.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { useCallback as n, useId as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/TreeView/TreeView.tsx
var l = 500;
function u(e, t, n = 1, r) {
	return e.flatMap((e) => [{
		node: e,
		level: n,
		parentId: r
	}, ...e.children && t.has(e.id) ? u(e.children, t, n + 1, e.id) : []]);
}
function d({ items: d, expanded: f, defaultExpanded: p, onExpandedChange: m, selected: h, defaultSelected: g, onSelectedChange: _, label: v, truncateFromLevel: y = 4, nodeRef: b, chevron: x = !0, className: S, ...C }) {
	let w = e("treeView"), T = r(), E = a(null), [D, O] = o(p ?? []), k = f !== void 0, A = k ? f : D, [j, M] = o(g), N = h !== void 0, P = N ? h : j, F = i(() => new Set(A), [A]), I = i(() => u(d, F), [d, F]), [L, R] = o(void 0), z = L && I.some((e) => e.node.id === L) ? L : P && I.some((e) => e.node.id === P) ? P : I[0]?.node.id, B = a(""), V = a(0), H = n((e) => {
		k || O(e), m?.(e);
	}, [k, m]), U = n((e, t) => {
		let n = F.has(e), r = t ?? !n;
		r !== n && H(r ? [...A, e] : A.filter((t) => t !== e));
	}, [
		A,
		F,
		H
	]), W = n((e) => {
		N || M(e), _?.(e);
	}, [N, _]), G = n((e) => {
		let t = I.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !F.has(e));
		t.length !== 0 && H([...A, ...t]);
	}, [
		A,
		I,
		F,
		H
	]), K = n((e) => `${T}-${e}`, [T]), q = n((e) => {
		e && (R(e), E.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), J = n((e, t) => {
		let n = Date.now(), r = n - V.current > l ? e : B.current + e;
		B.current = r, V.current = n;
		let i = r.length === 1 ? t + 1 : Math.max(t, 0), a = r.toLowerCase();
		for (let e = 0; e < I.length; e++) {
			let t = I[(i + e) % I.length].node.id;
			if ((E.current?.querySelector(`[data-tree-item="${CSS.escape(t)}"] > .tree-view__row .tree-view__label`)?.textContent ?? "").trim().toLowerCase().startsWith(a)) {
				q(t);
				return;
			}
		}
	}, [I, q]);
	function Y(e, t) {
		let { node: n, parentId: r } = t, i = I.findIndex((e) => e.node.id === n.id), a = !!n.children?.length, o = F.has(n.id);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), q(I[i + 1]?.node.id);
				break;
			case "ArrowUp":
				e.preventDefault(), q(I[i - 1]?.node.id);
				break;
			case "ArrowRight":
				e.preventDefault(), a && !o ? U(n.id, !0) : a && o && q(I[i + 1]?.node.id);
				break;
			case "ArrowLeft":
				e.preventDefault(), a && o ? U(n.id, !1) : r && q(r);
				break;
			case "Home":
				e.preventDefault(), q(I[0]?.node.id);
				break;
			case "End":
				e.preventDefault(), q(I[I.length - 1]?.node.id);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), n.disabled || W(n.id);
				break;
			case "*":
				e.preventDefault(), G(t);
				break;
			default:
				e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), J(e.key, i));
				break;
		}
	}
	function X(e, n, r) {
		return e.map((e) => {
			let i = !!e.children?.length, a = i && F.has(e.id), o = P === e.id, l = a && e.iconExpanded || e.icon, u = n >= y, d = u && typeof e.label == "string" ? e.label : void 0, f = e.dropTarget ? "target" : e.dropDisabled ? "disabled" : void 0;
			return /* @__PURE__ */ c("li", {
				role: "treeitem",
				"data-tree-item": e.id,
				"aria-labelledby": K(e.id),
				"aria-expanded": i ? a : void 0,
				"aria-selected": o,
				"aria-level": n,
				"data-level": n,
				"aria-disabled": e.disabled || void 0,
				"data-drop": f,
				tabIndex: z === e.id ? 0 : -1,
				className: [
					"tree-view__item",
					o ? "tree-view__item--selected" : "",
					e.disabled ? "tree-view__item--disabled" : "",
					e.dropTarget ? "tree-view__item--drop-target" : "",
					e.dropDisabled ? "tree-view__item--drop-disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (t) => {
					t.target === t.currentTarget && Y(t, {
						node: e,
						level: n,
						parentId: r
					});
				},
				onFocus: (t) => {
					t.target === t.currentTarget && R(e.id);
				},
				onClick: e.disabled ? void 0 : (t) => {
					t.stopPropagation(), i && U(e.id), W(e.id), q(e.id);
				},
				children: [/* @__PURE__ */ c("span", {
					className: "tree-view__row",
					ref: b ? (t) => b(e.id, t) : void 0,
					children: [
						x && /* @__PURE__ */ s("span", {
							className: "tree-view__chevron-slot",
							"aria-hidden": "true",
							children: i && /* @__PURE__ */ s(t, {
								name: "chevron",
								className: "tree-view__chevron",
								size: "sm"
							})
						}),
						l && /* @__PURE__ */ s("span", {
							className: "tree-view__icon",
							"aria-hidden": "true",
							children: l
						}),
						/* @__PURE__ */ s("span", {
							className: ["tree-view__label", u ? "tree-view__label--truncated" : ""].filter(Boolean).join(" "),
							id: K(e.id),
							title: d,
							children: e.label
						}),
						e.actions && /* @__PURE__ */ s("span", {
							className: "tree-view__actions",
							onClick: (e) => e.stopPropagation(),
							onKeyDown: (e) => e.stopPropagation(),
							onKeyUp: (e) => e.stopPropagation(),
							children: e.actions
						})
					]
				}), i && a && /* @__PURE__ */ s("ul", {
					role: "group",
					className: "tree-view__group",
					children: X(e.children, n + 1, e.id)
				})]
			}, e.id);
		});
	}
	return /* @__PURE__ */ s("ul", {
		ref: E,
		role: "tree",
		"aria-label": w("label", v),
		className: ["tree-view", S].filter(Boolean).join(" "),
		...C,
		children: X(d, 1)
	});
}
//#endregion
export { d as TreeView };
