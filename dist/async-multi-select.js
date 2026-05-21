'use client';
import './async-multi-select.css';
"use client";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useEffect as r, useId as i, useRef as a, useState as o } from "react";
import * as s from "@radix-ui/react-popover";
import { DismissableLayerBranch as c } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function l({ onSearch: l, value: u, defaultValue: d = [], onValueChange: f, selectedOptions: p = [], placeholder: m = "Buscar…", disabled: h, readOnly: g, dark: _, size: v = "md", id: y, "aria-label": b, "aria-describedby": x }) {
	let [S, C] = o(!1), [w, T] = o(""), [E, D] = o(!1), [O, k] = o([]), [A, j] = o(!1), [M, N] = o(-1), [P, F] = o(d), I = a(null), L = a(null), R = a(null), z = i(), B = i(), V = u === void 0 ? P : u, H = (e) => `${B}-opt-${e}`;
	r(() => {
		N(-1);
	}, [O]);
	let U = n(async (e) => {
		D(!0), j(!1);
		try {
			k(await l(e));
		} catch {
			k([]);
		} finally {
			D(!1), j(!0);
		}
	}, [l]);
	function W(e) {
		let t = e.target.value;
		T(t), I.current && clearTimeout(I.current), I.current = setTimeout(() => void U(t), 300);
	}
	function G() {
		h || g || (N(-1), T(""), k([]), j(!1), C(!0), U(""));
	}
	function K(e) {
		let t = V.includes(e) ? V.filter((t) => t !== e) : [...V, e];
		u === void 0 && F(t), f?.(t);
	}
	function q(e) {
		if (e.key === "ArrowDown") e.preventDefault(), S ? N((e) => Math.min(e + 1, O.length - 1)) : (C(!0), U(w));
		else if (e.key === "ArrowUp") e.preventDefault(), N((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && M >= 0 && O[M]) e.preventDefault(), K(O[M].value), L.current?.focus();
		else if (e.key === "Escape") C(!1), T(""), N(-1);
		else if (e.key === "Tab") C(!1), N(-1);
		else if (e.key === "Backspace" && w === "" && V.length > 0) {
			let e = V[V.length - 1];
			K(e);
		}
	}
	let J = [
		"async-multi-select",
		v === "md" ? "" : `async-multi-select--${v}`,
		h ? "async-multi-select--disabled" : "",
		S ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), Y = [
		"async-multi-select__content",
		v === "md" ? "" : `async-multi-select__content--${v}`,
		_ ? "async-multi-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(s.Root, {
		open: S,
		modal: !1,
		onOpenChange: (e) => {
			e || (C(!1), N(-1));
		},
		children: [/* @__PURE__ */ e(s.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ t("div", {
				ref: R,
				className: J,
				"data-state": S ? "open" : "closed",
				children: [/* @__PURE__ */ t("div", {
					className: "async-multi-select__input-area",
					children: [p.map((n) => /* @__PURE__ */ t("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ e("span", {
							className: "async-multi-select__pill-label",
							children: n.label
						}), !h && !g && /* @__PURE__ */ e("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": `Quitar ${n.label}`,
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), K(n.value);
							},
							children: "×"
						})]
					}, n.value)), /* @__PURE__ */ e("input", {
						ref: L,
						id: y,
						type: "text",
						className: "async-multi-select__input",
						value: w,
						onChange: W,
						onFocus: G,
						onKeyDown: q,
						placeholder: V.length === 0 ? m : void 0,
						disabled: h,
						readOnly: g,
						"aria-label": b ?? m,
						"aria-describedby": x,
						"aria-expanded": S,
						"aria-haspopup": "listbox",
						"aria-controls": z,
						"aria-activedescendant": M >= 0 ? H(M) : void 0,
						autoComplete: "off",
						role: "combobox"
					})]
				}), E && /* @__PURE__ */ e("span", {
					className: "async-multi-select__spinner",
					"aria-hidden": "true"
				})]
			})
		}), /* @__PURE__ */ e(s.Portal, { children: /* @__PURE__ */ e(c, { children: /* @__PURE__ */ e(s.Content, {
			className: Y,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				R.current?.contains(e.target) || C(!1);
			},
			children: /* @__PURE__ */ t("div", {
				role: "listbox",
				"aria-multiselectable": "true",
				"aria-label": b ?? m,
				id: z,
				children: [
					E && /* @__PURE__ */ e("div", {
						className: "async-multi-select__loading",
						role: "status",
						"aria-label": "Buscando…",
						children: /* @__PURE__ */ e("span", {
							className: "async-multi-select__spinner",
							"aria-hidden": "true"
						})
					}),
					!E && A && O.length === 0 && /* @__PURE__ */ e("div", {
						className: "async-multi-select__empty",
						children: "Sin resultados"
					}),
					!E && O.map((n, r) => {
						let i = V.includes(n.value), a = M === r;
						return /* @__PURE__ */ t("div", {
							id: H(r),
							role: "option",
							"aria-selected": i,
							className: [
								"async-multi-select__item",
								i ? "async-multi-select__item--selected" : "",
								a ? "async-multi-select__item--active" : ""
							].filter(Boolean).join(" "),
							onPointerDown: (e) => e.preventDefault(),
							onClick: () => {
								K(n.value), L.current?.focus();
							},
							children: [/* @__PURE__ */ e("span", {
								className: "async-multi-select__item-check",
								"aria-hidden": "true",
								children: /* @__PURE__ */ e("span", { className: "async-multi-select__item-check-mark" })
							}), /* @__PURE__ */ e("span", { children: n.label })]
						}, n.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { l as AsyncMultiSelect };
