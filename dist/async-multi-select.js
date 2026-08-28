'use client';
import './async-multi-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { forwardRef as n, useCallback as r, useId as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = n(function({ onSearch: n, value: d, defaultValue: f = [], onValueChange: ee, selectedOptions: p = [], placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", id: v, name: y, error: b = !1, onBlur: x, className: S, "aria-label": C, "aria-describedby": w, removeLabel: T = (e) => `Quitar ${e}`, emptyMessage: E = "Sin resultados", loadingLabel: D = "Buscando…", container: O }, k) {
	let [A, j] = o(!1), [M, N] = o(""), [P, F] = o(!1), [I, L] = o([]), [R, z] = o(!1), [B, V] = o(-1), [H, U] = o(f), W = a(null), G = a(null), K = a(null), q = i(), J = i(), Y = d === void 0 ? H : d, X = (e) => `${J}-opt-${e}`, Z = r(async (e) => {
		F(!0), z(!1);
		try {
			L(await n(e)), V(-1);
		} catch {
			L([]), V(-1);
		} finally {
			F(!1), z(!0);
		}
	}, [n]);
	function Q(e) {
		let t = e.target.value;
		N(t), A || j(!0), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(t), 300);
	}
	function te(e) {
		h || g || A || (e.preventDefault(), G.current?.focus(), V(-1), N(""), L([]), z(!1), j(!0), Z(""));
	}
	function $(e) {
		let t = Y.includes(e) ? Y.filter((t) => t !== e) : [...Y, e];
		d === void 0 && U(t), ee?.(t);
	}
	function ne(e) {
		if (e.key === "ArrowDown") e.preventDefault(), A ? V((e) => Math.min(e + 1, I.length - 1)) : (j(!0), Z(M));
		else if (e.key === "ArrowUp") e.preventDefault(), V((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && B >= 0 && I[B]) e.preventDefault(), $(I[B].value), G.current?.focus();
		else if (e.key === "Escape") j(!1), N(""), V(-1);
		else if (e.key === "Tab") j(!1), V(-1);
		else if (e.key === "Backspace" && M === "" && Y.length > 0) {
			let e = Y[Y.length - 1];
			$(e);
		}
	}
	function re(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && K.current?.contains(e)) return;
			}
			j(!1), N(""), V(-1);
		}
	}
	let ie = [
		"async-multi-select",
		_ === "md" ? "" : `async-multi-select--${_}`,
		h ? "async-multi-select--disabled" : "",
		A ? "async-multi-select--open" : "",
		b ? "async-multi-select--error" : "",
		S ?? ""
	].filter(Boolean).join(" "), ae = ["async-multi-select__content", _ === "md" ? "" : `async-multi-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		open: A,
		onOpenChange: re,
		children: [/* @__PURE__ */ c("div", {
			ref: K,
			className: ie,
			"data-popup-open": A || void 0,
			children: [/* @__PURE__ */ c("div", {
				className: "async-multi-select__input-area",
				children: [
					p.map((t) => /* @__PURE__ */ c("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ s("span", {
							className: "async-multi-select__pill-label",
							children: t.label
						}), !h && !g && /* @__PURE__ */ s("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": T(t.label),
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), $(t.value);
							},
							children: /* @__PURE__ */ s(e, {
								name: "close",
								size: "xs"
							})
						})]
					}, t.value)),
					/* @__PURE__ */ s("input", {
						ref: (e) => {
							G.current = e, u(k, e);
						},
						id: v,
						type: "text",
						className: "async-multi-select__input",
						value: M,
						onChange: Q,
						onPointerDown: te,
						onKeyDown: ne,
						placeholder: Y.length === 0 ? m : void 0,
						disabled: h,
						readOnly: g,
						"aria-label": C,
						"aria-describedby": w,
						"aria-invalid": b || void 0,
						"aria-expanded": A,
						"aria-haspopup": "listbox",
						"aria-controls": q,
						"aria-activedescendant": B >= 0 ? X(B) : void 0,
						autoComplete: "off",
						role: "combobox",
						onBlur: x
					}),
					y && Y.map((e) => /* @__PURE__ */ s("input", {
						type: "hidden",
						name: y,
						value: e
					}, e))
				]
			}), P && /* @__PURE__ */ s(t, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ s(l.Portal, {
			container: O,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "async-multi-select__positioner",
				anchor: K,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ s(l.Popup, {
					className: ae,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ c("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": C ?? m,
						id: q,
						children: [
							P && /* @__PURE__ */ s("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ s(t, {
									size: "sm",
									label: D
								})
							}),
							!P && R && I.length === 0 && /* @__PURE__ */ s("div", {
								className: "async-multi-select__empty",
								children: E
							}),
							!P && I.map((e, t) => {
								let n = Y.includes(e.value), r = B === t;
								return /* @__PURE__ */ c("div", {
									id: X(t),
									role: "option",
									"aria-selected": n,
									className: [
										"async-multi-select__item",
										n ? "async-multi-select__item--selected" : "",
										r ? "async-multi-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => {
										$(e.value), G.current?.focus();
									},
									children: [/* @__PURE__ */ s("span", {
										className: "async-multi-select__item-check",
										"aria-hidden": "true",
										children: /* @__PURE__ */ s("span", { className: "async-multi-select__item-check-mark" })
									}), /* @__PURE__ */ s("span", { children: e.label })]
								}, e.value);
							})
						]
					})
				})
			})
		})]
	});
});
//#endregion
export { d as AsyncMultiSelect };
