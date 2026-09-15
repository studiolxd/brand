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
function d({ items: d, expanded: f, defaultExpanded: p, onExpandedChange: m, selected: h, defaultSelected: g, onSelectedChange: _, label: v, truncateFromLevel: y = 4, nodeRef: b, className: x, ...S }) {
	let C = e("treeView"), w = r(), T = a(null), [E, D] = o(p ?? []), O = f !== void 0, k = O ? f : E, [A, j] = o(g), M = h !== void 0, N = M ? h : A, P = i(() => new Set(k), [k]), F = i(() => u(d, P), [d, P]), [I, L] = o(void 0), R = I && F.some((e) => e.node.id === I) ? I : N && F.some((e) => e.node.id === N) ? N : F[0]?.node.id, z = a(""), B = a(0), V = n((e) => {
		O || D(e), m?.(e);
	}, [O, m]), H = n((e, t) => {
		let n = P.has(e), r = t ?? !n;
		r !== n && V(r ? [...k, e] : k.filter((t) => t !== e));
	}, [
		k,
		P,
		V
	]), U = n((e) => {
		M || j(e), _?.(e);
	}, [M, _]), W = n((e) => {
		let t = F.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !P.has(e));
		t.length !== 0 && V([...k, ...t]);
	}, [
		k,
		F,
		P,
		V
	]), G = n((e) => `${w}-${e}`, [w]), K = n((e) => {
		e && (L(e), T.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), q = n((e, t) => {
		let n = Date.now(), r = n - B.current > l ? e : z.current + e;
		z.current = r, B.current = n;
		let i = r.length === 1 ? t + 1 : Math.max(t, 0), a = r.toLowerCase();
		for (let e = 0; e < F.length; e++) {
			let t = F[(i + e) % F.length].node.id;
			if ((T.current?.querySelector(`[data-tree-item="${CSS.escape(t)}"] > .tree-view__row .tree-view__label`)?.textContent ?? "").trim().toLowerCase().startsWith(a)) {
				K(t);
				return;
			}
		}
	}, [F, K]);
	function J(e, t) {
		let { node: n, parentId: r } = t, i = F.findIndex((e) => e.node.id === n.id), a = !!n.children?.length, o = P.has(n.id);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), K(F[i + 1]?.node.id);
				break;
			case "ArrowUp":
				e.preventDefault(), K(F[i - 1]?.node.id);
				break;
			case "ArrowRight":
				e.preventDefault(), a && !o ? H(n.id, !0) : a && o && K(F[i + 1]?.node.id);
				break;
			case "ArrowLeft":
				e.preventDefault(), a && o ? H(n.id, !1) : r && K(r);
				break;
			case "Home":
				e.preventDefault(), K(F[0]?.node.id);
				break;
			case "End":
				e.preventDefault(), K(F[F.length - 1]?.node.id);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), n.disabled || U(n.id);
				break;
			case "*":
				e.preventDefault(), W(t);
				break;
			default:
				e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), q(e.key, i));
				break;
		}
	}
	function Y(e, n, r) {
		return e.map((e) => {
			let i = !!e.children?.length, a = i && P.has(e.id), o = N === e.id, l = a && e.iconExpanded || e.icon, u = n >= y, d = u && typeof e.label == "string" ? e.label : void 0, f = e.dropTarget ? "target" : e.dropDisabled ? "disabled" : void 0;
			return /* @__PURE__ */ c("li", {
				role: "treeitem",
				"data-tree-item": e.id,
				"aria-labelledby": G(e.id),
				"aria-expanded": i ? a : void 0,
				"aria-selected": o,
				"aria-level": n,
				"aria-disabled": e.disabled || void 0,
				"data-drop": f,
				tabIndex: R === e.id ? 0 : -1,
				className: [
					"tree-view__item",
					o ? "tree-view__item--selected" : "",
					e.disabled ? "tree-view__item--disabled" : "",
					e.dropTarget ? "tree-view__item--drop-target" : "",
					e.dropDisabled ? "tree-view__item--drop-disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (t) => {
					t.target === t.currentTarget && J(t, {
						node: e,
						level: n,
						parentId: r
					});
				},
				onFocus: (t) => {
					t.target === t.currentTarget && L(e.id);
				},
				onClick: e.disabled ? void 0 : (t) => {
					t.stopPropagation(), i && H(e.id), U(e.id), K(e.id);
				},
				children: [/* @__PURE__ */ c("span", {
					className: "tree-view__row",
					ref: b ? (t) => b(e.id, t) : void 0,
					children: [
						/* @__PURE__ */ s("span", {
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
							id: G(e.id),
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
					children: Y(e.children, n + 1, e.id)
				})]
			}, e.id);
		});
	}
	return /* @__PURE__ */ s("ul", {
		ref: T,
		role: "tree",
		"aria-label": C("label", v),
		className: ["tree-view", x].filter(Boolean).join(" "),
		...S,
		children: Y(d, 1)
	});
}
//#endregion
export { d as TreeView };
