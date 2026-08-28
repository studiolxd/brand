'use client';
import './tree-view.css';
import { Icon as e } from "./icon.js";
import { useCallback as t, useId as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/TreeView/TreeView.tsx
function c(e, t, n = 1, r) {
	return e.flatMap((e) => [{
		node: e,
		level: n,
		parentId: r
	}, ...e.children && t.has(e.id) ? c(e.children, t, n + 1, e.id) : []]);
}
function l({ items: l, expanded: u, defaultExpanded: d, onExpandedChange: f, selected: p, defaultSelected: m, onSelectedChange: h, label: g = "Árbol", className: _, ...v }) {
	let y = n(), b = i(null), [x, S] = a(d ?? []), C = u !== void 0, w = C ? u : x, [T, E] = a(m), D = p !== void 0, O = D ? p : T, k = r(() => new Set(w), [w]), A = r(() => c(l, k), [l, k]), j = r(() => A.filter((e) => !e.node.disabled), [A]), [M, N] = a(void 0), P = M && j.some((e) => e.node.id === M) ? M : O && j.some((e) => e.node.id === O) ? O : j[0]?.node.id, F = t((e) => {
		C || S(e), f?.(e);
	}, [C, f]), I = t((e, t) => {
		let n = k.has(e), r = t ?? !n;
		r !== n && F(r ? [...w, e] : w.filter((t) => t !== e));
	}, [
		w,
		k,
		F
	]), L = t((e) => {
		D || E(e), h?.(e);
	}, [D, h]), R = t((e) => `${y}-${e}`, [y]), z = t((e) => {
		e && (N(e), b.current?.querySelector(`[data-tree-item="${CSS.escape(e)}"]`)?.focus());
	}, []);
	function B(e, t) {
		let { node: n, parentId: r } = t, i = j.findIndex((e) => e.node.id === n.id), a = !!n.children?.length, o = k.has(n.id);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), z(j[i + 1]?.node.id);
				break;
			case "ArrowUp":
				e.preventDefault(), z(j[i - 1]?.node.id);
				break;
			case "ArrowRight":
				e.preventDefault(), a && !o ? I(n.id, !0) : a && o && z(j[i + 1]?.node.id);
				break;
			case "ArrowLeft":
				e.preventDefault(), a && o ? I(n.id, !1) : r && z(r);
				break;
			case "Home":
				e.preventDefault(), z(j[0]?.node.id);
				break;
			case "End":
				e.preventDefault(), z(j[j.length - 1]?.node.id);
				break;
			case "Enter":
			case " ":
				e.preventDefault(), L(n.id);
				break;
			default: break;
		}
	}
	function V(t, n, r) {
		return t.map((t) => {
			let i = !!t.children?.length, a = i && k.has(t.id), c = O === t.id;
			return /* @__PURE__ */ s("li", {
				role: "treeitem",
				"data-tree-item": t.id,
				"aria-labelledby": R(t.id),
				"aria-expanded": i ? a : void 0,
				"aria-selected": c,
				"aria-level": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: t.disabled ? void 0 : P === t.id ? 0 : -1,
				className: [
					"tree-view__item",
					c ? "tree-view__item--selected" : "",
					t.disabled ? "tree-view__item--disabled" : ""
				].filter(Boolean).join(" "),
				onKeyDown: t.disabled ? void 0 : (e) => {
					e.target === e.currentTarget && B(e, {
						node: t,
						level: n,
						parentId: r
					});
				},
				onFocus: (e) => {
					e.target === e.currentTarget && N(t.id);
				},
				onClick: t.disabled ? void 0 : (e) => {
					e.stopPropagation(), i && I(t.id), L(t.id), z(t.id);
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
							id: R(t.id),
							children: t.label
						})
					]
				}), i && a && /* @__PURE__ */ o("ul", {
					role: "group",
					className: "tree-view__group",
					children: V(t.children, n + 1, t.id)
				})]
			}, t.id);
		});
	}
	return /* @__PURE__ */ o("ul", {
		ref: b,
		role: "tree",
		"aria-label": g,
		className: ["tree-view", _].filter(Boolean).join(" "),
		...v,
		children: V(l, 1)
	});
}
//#endregion
export { l as TreeView };
