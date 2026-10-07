'use client';
import './tree-view.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { useCallback as n, useId as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/messages/es/treeView.ts
var l = { label: "Árbol" }, u = 500;
function d(e, t, n = 1, r) {
	return e.flatMap((e) => [{
		node: e,
		level: n,
		parentId: r
	}, ...e.children && t.has(e.id) ? d(e.children, t, n + 1, e.id) : []]);
}
function f({ items: f, expanded: p, defaultExpanded: m, onExpandedChange: h, selected: g, defaultSelected: _, onSelectedChange: v, label: y, truncateFromLevel: b = 4, nodeRef: x, chevron: S = !0, className: C, ...w }) {
	let T = e("treeView", l), E = r(), D = a(null), [O, k] = o(m ?? []), A = p !== void 0, j = A ? p : O, [M, N] = o(_), P = g !== void 0, F = P ? g : M, I = i(() => new Set(j), [j]), L = i(() => d(f, I), [f, I]), [R, z] = o(void 0), B = R && L.some((e) => e.node.id === R) ? R : F && L.some((e) => e.node.id === F) ? F : L[0]?.node.id, V = a(""), H = a(0), U = n((e) => {
		A || k(e), h?.(e);
	}, [A, h]), W = n((e, t) => {
		let n = I.has(e), r = t ?? !n;
		r !== n && U(r ? [...j, e] : j.filter((t) => t !== e));
	}, [
		j,
		I,
		U
	]), G = n((e) => {
		P || N(e), v?.(e);
	}, [P, v]), K = n((e) => {
		let t = L.filter((t) => t.parentId === e.parentId && t.node.children?.length).map((e) => e.node.id).filter((e) => !I.has(e));
		t.length !== 0 && U([...j, ...t]);
	}, [
		j,
		L,
		I,
		U
	]), q = n((e) => `${E}-${e}`, [E]), J = n((e) => {
		e && (z(e), D.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []), Y = n((e, t) => {
		let n = Date.now(), r = n - H.current > u ? e : V.current + e;
		V.current = r, H.current = n;
		let i = r.length === 1 ? t + 1 : Math.max(t, 0), a = r.toLowerCase();
		for (let e = 0; e < L.length; e++) {
			let t = L[(i + e) % L.length].node.id;
			if ((D.current?.querySelector(`[data-tree-item="${CSS.escape(t)}"] > .tree-view__row .tree-view__label`)?.textContent ?? "").trim().toLowerCase().startsWith(a)) {
				J(t);
				return;
			}
		}
	}, [L, J]);
	function X(e, t) {
		let { node: n, parentId: r } = t, i = L.findIndex((e) => e.node.id === n.id), a = !!n.children?.length, o = I.has(n.id);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), J(L[i + 1]?.node.id);
				break;
			case "ArrowUp":
				e.preventDefault(), J(L[i - 1]?.node.id);
				break;
			case "ArrowRight":
				e.preventDefault(), a && !o ? W(n.id, !0) : a && o && J(L[i + 1]?.node.id);
				break;
			case "ArrowLeft":
				e.preventDefault(), a && o ? W(n.id, !1) : r && J(r);
				break;
			case "Home":
				e.preventDefault(), J(L[0]?.node.id);
				break;
			case "End":
				e.preventDefault(), J(L[L.length - 1]?.node.id);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), n.disabled || G(n.id);
				break;
			case "*":
				e.preventDefault(), K(t);
				break;
			default:
				e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), Y(e.key, i));
				break;
		}
	}
	function Z(e, n, r) {
		return e.map((e) => {
			let i = !!e.children?.length, a = i && I.has(e.id), o = F === e.id, l = a && e.iconExpanded || e.icon, u = n >= b, d = u && typeof e.label == "string" ? e.label : void 0, f = e.dropTarget ? "target" : e.dropDisabled ? "disabled" : void 0;
			return /* @__PURE__ */ c("li", {
				role: "treeitem",
				"data-tree-item": e.id,
				"aria-labelledby": q(e.id),
				"aria-expanded": i ? a : void 0,
				"aria-selected": o,
				"aria-level": n,
				"data-level": n,
				"aria-disabled": e.disabled || void 0,
				"data-drop": f,
				tabIndex: B === e.id ? 0 : -1,
				className: [
					"tree-view__item",
					o ? "tree-view__item--selected" : "",
					e.disabled ? "tree-view__item--disabled" : "",
					e.dropTarget ? "tree-view__item--drop-target" : "",
					e.dropDisabled ? "tree-view__item--drop-disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: (t) => {
					t.target === t.currentTarget && X(t, {
						node: e,
						level: n,
						parentId: r
					});
				},
				onFocus: (t) => {
					t.target === t.currentTarget && z(e.id);
				},
				onClick: e.disabled ? void 0 : (t) => {
					t.stopPropagation(), i && W(e.id), G(e.id), J(e.id);
				},
				children: [/* @__PURE__ */ c("span", {
					className: "tree-view__row",
					ref: x ? (t) => x(e.id, t) : void 0,
					children: [
						S && /* @__PURE__ */ s("span", {
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
							id: q(e.id),
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
					children: Z(e.children, n + 1, e.id)
				})]
			}, e.id);
		});
	}
	return /* @__PURE__ */ s("ul", {
		ref: D,
		role: "tree",
		"aria-label": T("label", y),
		className: ["tree-view", C].filter(Boolean).join(" "),
		...w,
		children: Z(f, 1)
	});
}
//#endregion
export { f as TreeView };
