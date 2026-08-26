'use client';
import './async-multi-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useId as a, useRef as o, useState as s } from "react";
import { Popover as c } from "@base-ui-components/react/popover";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function l({ onSearch: l, value: u, defaultValue: d = [], onValueChange: f, selectedOptions: p = [], placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", id: v, "aria-label": y, "aria-describedby": b, emptyMessage: x = "Sin resultados", loadingLabel: S = "Buscando…", container: C }) {
	let [w, T] = s(!1), [E, D] = s(""), [O, k] = s(!1), [A, j] = s([]), [M, N] = s(!1), [P, F] = s(-1), [I, L] = s(d), R = o(null), z = o(null), B = o(null), V = a(), H = a(), U = u === void 0 ? I : u, W = (e) => `${H}-opt-${e}`, G = i(async (e) => {
		k(!0), N(!1);
		try {
			j(await l(e)), F(-1);
		} catch {
			j([]), F(-1);
		} finally {
			k(!1), N(!0);
		}
	}, [l]);
	function K(e) {
		let t = e.target.value;
		D(t), w || T(!0), R.current && clearTimeout(R.current), R.current = setTimeout(() => void G(t), 300);
	}
	function q(e) {
		h || g || w || (e.preventDefault(), z.current?.focus(), F(-1), D(""), j([]), N(!1), T(!0), G(""));
	}
	function J(e) {
		let t = U.includes(e) ? U.filter((t) => t !== e) : [...U, e];
		u === void 0 && L(t), f?.(t);
	}
	function Y(e) {
		if (e.key === "ArrowDown") e.preventDefault(), w ? F((e) => Math.min(e + 1, A.length - 1)) : (T(!0), G(E));
		else if (e.key === "ArrowUp") e.preventDefault(), F((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && P >= 0 && A[P]) e.preventDefault(), J(A[P].value), z.current?.focus();
		else if (e.key === "Escape") T(!1), D(""), F(-1);
		else if (e.key === "Tab") T(!1), F(-1);
		else if (e.key === "Backspace" && E === "" && U.length > 0) {
			let e = U[U.length - 1];
			J(e);
		}
	}
	function X(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && B.current?.contains(e)) return;
			}
			T(!1), D(""), F(-1);
		}
	}
	let Z = [
		"async-multi-select",
		_ === "md" ? "" : `async-multi-select--${_}`,
		h ? "async-multi-select--disabled" : "",
		w ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), Q = ["async-multi-select__content", _ === "md" ? "" : `async-multi-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(c.Root, {
		open: w,
		onOpenChange: X,
		children: [/* @__PURE__ */ r("div", {
			ref: B,
			className: Z,
			"data-popup-open": w || void 0,
			children: [/* @__PURE__ */ r("div", {
				className: "async-multi-select__input-area",
				children: [p.map((t) => /* @__PURE__ */ r("span", {
					className: "async-multi-select__pill",
					children: [/* @__PURE__ */ n("span", {
						className: "async-multi-select__pill-label",
						children: t.label
					}), !h && !g && /* @__PURE__ */ n("button", {
						type: "button",
						className: "async-multi-select__pill-remove",
						"aria-label": `Quitar ${t.label}`,
						tabIndex: -1,
						onMouseDown: (e) => {
							e.preventDefault(), J(t.value);
						},
						children: /* @__PURE__ */ n(e, {
							name: "close",
							size: "xs"
						})
					})]
				}, t.value)), /* @__PURE__ */ n("input", {
					ref: z,
					id: v,
					type: "text",
					className: "async-multi-select__input",
					value: E,
					onChange: K,
					onPointerDown: q,
					onKeyDown: Y,
					placeholder: U.length === 0 ? m : void 0,
					disabled: h,
					readOnly: g,
					"aria-label": y ?? m,
					"aria-describedby": b,
					"aria-expanded": w,
					"aria-haspopup": "listbox",
					"aria-controls": V,
					"aria-activedescendant": P >= 0 ? W(P) : void 0,
					autoComplete: "off",
					role: "combobox"
				})]
			}), O && /* @__PURE__ */ n(t, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ n(c.Portal, {
			container: C,
			children: /* @__PURE__ */ n(c.Positioner, {
				className: "async-multi-select__positioner",
				anchor: B,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ n(c.Popup, {
					className: Q,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ r("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": y ?? m,
						id: V,
						children: [
							O && /* @__PURE__ */ n("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ n(t, {
									size: "sm",
									label: S
								})
							}),
							!O && M && A.length === 0 && /* @__PURE__ */ n("div", {
								className: "async-multi-select__empty",
								children: x
							}),
							!O && A.map((e, t) => {
								let i = U.includes(e.value), a = P === t;
								return /* @__PURE__ */ r("div", {
									id: W(t),
									role: "option",
									"aria-selected": i,
									className: [
										"async-multi-select__item",
										i ? "async-multi-select__item--selected" : "",
										a ? "async-multi-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => {
										J(e.value), z.current?.focus();
									},
									children: [/* @__PURE__ */ n("span", {
										className: "async-multi-select__item-check",
										"aria-hidden": "true",
										children: /* @__PURE__ */ n("span", { className: "async-multi-select__item-check-mark" })
									}), /* @__PURE__ */ n("span", { children: e.label })]
								}, e.value);
							})
						]
					})
				})
			})
		})]
	});
}
//#endregion
export { l as AsyncMultiSelect };
