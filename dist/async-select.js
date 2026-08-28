'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { forwardRef as n, useCallback as r, useId as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = n(function({ onSearch: n, value: d, onValueChange: f, selectedOption: p, placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", id: v, name: y, error: b = !1, onBlur: x, className: ee, "aria-label": S, "aria-describedby": C, emptyMessage: w = "Sin resultados", loadingLabel: T = "Buscando…", clearLabel: te = "Limpiar selección", container: E }, D) {
	let [O, k] = o(!1), [A, j] = o(""), [M, N] = o(!1), [P, F] = o([]), [I, L] = o(!1), [R, z] = o(-1), [B, V] = o(null), [H, U] = o(null), W = a(null), G = a(null), K = a(null), q = i(), J = i(), Y = d === void 0 ? B : d, X = p === void 0 ? H : p, Z = (e) => `${J}-opt-${e}`, Q = r(async (e) => {
		N(!0), L(!1);
		try {
			F(await n(e)), z(-1);
		} catch {
			F([]), z(-1);
		} finally {
			N(!1), L(!0);
		}
	}, [n]);
	function ne(e) {
		let t = e.target.value;
		j(t), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Q(t), 300);
	}
	function re(e) {
		h || g || O || (e.preventDefault(), G.current?.focus(), z(-1), j(""), F([]), L(!1), k(!0), Q(""));
	}
	function $(e) {
		d === void 0 && (V(e.value), U(e)), f?.(e.value, e), k(!1), z(-1), j("");
	}
	function ie(e) {
		e.stopPropagation(), d === void 0 && (V(null), U(null)), f?.(null, null), j(""), F([]), L(!1), G.current?.focus();
	}
	function ae(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), O ? z((e) => Math.min(e + 1, P.length - 1)) : (k(!0), Q(A))) : e.key === "ArrowUp" ? (e.preventDefault(), z((e) => Math.max(e - 1, -1))) : e.key === "Enter" && R >= 0 && P[R] ? (e.preventDefault(), $(P[R])) : e.key === "Escape" ? (k(!1), j(""), z(-1)) : e.key === "Tab" ? (k(!1), z(-1)) : !O && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), j(e.key), k(!0), F([]), L(!1), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Q(e.key), 300));
	}
	function oe(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && K.current?.contains(e)) return;
			}
			k(!1), j(""), z(-1);
		}
	}
	let se = O ? A : X?.label ?? "", ce = [
		"async-select",
		_ === "md" ? "" : `async-select--${_}`,
		h ? "async-select--disabled" : "",
		b ? "async-select--error" : "",
		ee ?? ""
	].filter(Boolean).join(" "), le = ["async-select__content", _ === "md" ? "" : `async-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		open: O,
		onOpenChange: oe,
		children: [/* @__PURE__ */ c("div", {
			ref: K,
			className: ce,
			"data-popup-open": O || void 0,
			children: [
				/* @__PURE__ */ s("input", {
					ref: (e) => {
						G.current = e, u(D, e);
					},
					id: v,
					type: "text",
					className: "async-select__input",
					value: se,
					onChange: ne,
					onPointerDown: re,
					onKeyDown: ae,
					placeholder: m,
					disabled: h,
					readOnly: g,
					"aria-label": S,
					"aria-describedby": C,
					"aria-invalid": b || void 0,
					"aria-expanded": O,
					"aria-haspopup": "listbox",
					"aria-controls": q,
					"aria-activedescendant": R >= 0 ? Z(R) : void 0,
					autoComplete: "off",
					role: "combobox",
					onBlur: x
				}),
				y && /* @__PURE__ */ s("input", {
					type: "hidden",
					name: y,
					value: Y ?? ""
				}),
				M && /* @__PURE__ */ s(t, {
					size: "sm",
					"aria-hidden": !0
				}),
				!M && Y && !h && !g && /* @__PURE__ */ s("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": te,
					tabIndex: -1,
					onMouseDown: ie,
					children: /* @__PURE__ */ s(e, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ s(l.Portal, {
			container: E,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "async-select__positioner",
				anchor: K,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ s(l.Popup, {
					className: le,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ c("div", {
						role: "listbox",
						"aria-label": S ?? m,
						id: q,
						children: [
							M && /* @__PURE__ */ s("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ s(t, {
									size: "sm",
									label: T
								})
							}),
							!M && I && P.length === 0 && /* @__PURE__ */ s("div", {
								className: "async-select__empty",
								children: w
							}),
							!M && P.map((e, t) => {
								let n = e.value === Y, r = R === t;
								return /* @__PURE__ */ s("div", {
									id: Z(t),
									role: "option",
									"aria-selected": n,
									className: [
										"async-select__item",
										n ? "async-select__item--selected" : "",
										r ? "async-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => $(e),
									children: e.label
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
export { d as AsyncSelect };
