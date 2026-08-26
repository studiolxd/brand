'use client';
import './async-multi-select.css';
import { Icon as e } from "./icon.js";
import { i as t, n, r, t as i } from "./_shared/PopoverPopup.js";
import { Spinner as a } from "./spinner.js";
import { useCallback as o, useId as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function f({ onSearch: f, value: p, defaultValue: m = [], onValueChange: h, selectedOptions: g = [], placeholder: _ = "Buscar…", disabled: v, readOnly: y, size: b = "md", id: x, "aria-label": S, "aria-describedby": C, emptyMessage: w = "Sin resultados", loadingLabel: T = "Buscando…", container: E }) {
	let [D, O] = l(!1), [k, A] = l(""), [j, M] = l(!1), [N, P] = l([]), [F, I] = l(!1), [L, R] = l(-1), [z, B] = l(m), V = c(null), H = c(null), U = c(null), W = s(), G = s(), K = p === void 0 ? z : p, q = (e) => `${G}-opt-${e}`, J = o(async (e) => {
		M(!0), I(!1);
		try {
			P(await f(e)), R(-1);
		} catch {
			P([]), R(-1);
		} finally {
			M(!1), I(!0);
		}
	}, [f]);
	function Y(e) {
		let t = e.target.value;
		A(t), D || O(!0), V.current && clearTimeout(V.current), V.current = setTimeout(() => void J(t), 300);
	}
	function X(e) {
		v || y || D || (e.preventDefault(), H.current?.focus(), R(-1), A(""), P([]), I(!1), O(!0), J(""));
	}
	function Z(e) {
		let t = K.includes(e) ? K.filter((t) => t !== e) : [...K, e];
		p === void 0 && B(t), h?.(t);
	}
	function Q(e) {
		if (e.key === "ArrowDown") e.preventDefault(), D ? R((e) => Math.min(e + 1, N.length - 1)) : (O(!0), J(k));
		else if (e.key === "ArrowUp") e.preventDefault(), R((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && L >= 0 && N[L]) e.preventDefault(), Z(N[L].value), H.current?.focus();
		else if (e.key === "Escape") O(!1), A(""), R(-1);
		else if (e.key === "Tab") O(!1), R(-1);
		else if (e.key === "Backspace" && k === "" && K.length > 0) {
			let e = K[K.length - 1];
			Z(e);
		}
	}
	function $(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && U.current?.contains(e)) return;
			}
			O(!1), A(""), R(-1);
		}
	}
	let ee = [
		"async-multi-select",
		b === "md" ? "" : `async-multi-select--${b}`,
		v ? "async-multi-select--disabled" : "",
		D ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), te = ["async-multi-select__content", b === "md" ? "" : `async-multi-select__content--${b}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(t, {
		open: D,
		onOpenChange: $,
		children: [/* @__PURE__ */ d("div", {
			ref: U,
			className: ee,
			"data-popup-open": D || void 0,
			children: [/* @__PURE__ */ d("div", {
				className: "async-multi-select__input-area",
				children: [g.map((t) => /* @__PURE__ */ d("span", {
					className: "async-multi-select__pill",
					children: [/* @__PURE__ */ u("span", {
						className: "async-multi-select__pill-label",
						children: t.label
					}), !v && !y && /* @__PURE__ */ u("button", {
						type: "button",
						className: "async-multi-select__pill-remove",
						"aria-label": `Quitar ${t.label}`,
						tabIndex: -1,
						onMouseDown: (e) => {
							e.preventDefault(), Z(t.value);
						},
						children: /* @__PURE__ */ u(e, {
							name: "close",
							size: "xs"
						})
					})]
				}, t.value)), /* @__PURE__ */ u("input", {
					ref: H,
					id: x,
					type: "text",
					className: "async-multi-select__input",
					value: k,
					onChange: Y,
					onPointerDown: X,
					onKeyDown: Q,
					placeholder: K.length === 0 ? _ : void 0,
					disabled: v,
					readOnly: y,
					"aria-label": S ?? _,
					"aria-describedby": C,
					"aria-expanded": D,
					"aria-haspopup": "listbox",
					"aria-controls": W,
					"aria-activedescendant": L >= 0 ? q(L) : void 0,
					autoComplete: "off",
					role: "combobox"
				})]
			}), j && /* @__PURE__ */ u(a, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ u(r, {
			container: E,
			children: /* @__PURE__ */ u(n, {
				className: "async-multi-select__positioner",
				anchor: U,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ u(i, {
					className: te,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ d("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": S ?? _,
						id: W,
						children: [
							j && /* @__PURE__ */ u("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ u(a, {
									size: "sm",
									label: T
								})
							}),
							!j && F && N.length === 0 && /* @__PURE__ */ u("div", {
								className: "async-multi-select__empty",
								children: w
							}),
							!j && N.map((e, t) => {
								let n = K.includes(e.value), r = L === t;
								return /* @__PURE__ */ d("div", {
									id: q(t),
									role: "option",
									"aria-selected": n,
									className: [
										"async-multi-select__item",
										n ? "async-multi-select__item--selected" : "",
										r ? "async-multi-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => {
										Z(e.value), H.current?.focus();
									},
									children: [/* @__PURE__ */ u("span", {
										className: "async-multi-select__item-check",
										"aria-hidden": "true",
										children: /* @__PURE__ */ u("span", { className: "async-multi-select__item-check-mark" })
									}), /* @__PURE__ */ u("span", { children: e.label })]
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
export { f as AsyncMultiSelect };
