'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useCallback as a, useEffect as o, useId as s, useRef as c, useState as l } from "react";
import { Popover as u } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = i(function({ onSearch: i, value: d, onValueChange: f, selectedOption: p, placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", debounceMs: v = 300, id: y, name: b, error: x = !1, required: te, onBlur: S, className: C, "aria-label": w, "aria-describedby": T, emptyMessage: ne = "Sin resultados", loadingLabel: re = "Buscando…", clearLabel: E = "Limpiar selección", container: D }, ie) {
	let [O, k] = l(!1), [A, j] = l(""), [M, N] = l(!1), [P, F] = l([]), [I, L] = l(!1), [R, z] = l(-1), [B, V] = l(null), [H, U] = l(null), W = c(null), G = c(0), K = c(null), q = c(null), J = s(), ae = s(), Y = d === void 0 ? B : d, oe = p === void 0 ? H : p, X = (e) => `${ae}-opt-${e}`, Z = a(async (e) => {
		let t = ++G.current;
		N(!0), L(!1);
		try {
			let n = await i(e);
			if (t !== G.current) return;
			F(n), z(-1);
		} catch {
			if (t !== G.current) return;
			F([]), z(-1);
		} finally {
			t === G.current && (N(!1), L(!0));
		}
	}, [i]);
	o(() => () => {
		G.current += 1, W.current && clearTimeout(W.current);
	}, []);
	function se(e) {
		let t = e.target.value;
		j(t), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(t), v);
	}
	function ce(e) {
		h || g || O || (e.preventDefault(), K.current?.focus(), z(-1), j(""), F([]), L(!1), k(!0), Z(""));
	}
	function Q(e) {
		d === void 0 && (V(e.value), U(e)), f?.(e.value, e), k(!1), z(-1), j("");
	}
	function $() {
		d === void 0 && (V(null), U(null)), f?.(null, null), j(""), F([]), L(!1), K.current?.focus();
	}
	function le(e) {
		e.stopPropagation(), $();
	}
	function ue(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), O ? z((e) => Math.min(e + 1, P.length - 1)) : (k(!0), Z(A))) : e.key === "ArrowUp" ? (e.preventDefault(), z((e) => Math.max(e - 1, -1))) : e.key === "Enter" && R >= 0 && P[R] ? (e.preventDefault(), Q(P[R])) : e.key === "Escape" ? (k(!1), j(""), z(-1)) : e.key === "Tab" ? (k(!1), z(-1)) : (e.key === "Backspace" || e.key === "Delete") && A === "" && Y && !h && !g ? (e.preventDefault(), $()) : !O && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), j(e.key), k(!0), F([]), L(!1), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(e.key), v));
	}
	function de(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && q.current?.contains(e)) return;
			}
			k(!1), j(""), z(-1);
		}
	}
	let fe = O ? A : oe?.label ?? "", pe = [
		"async-select",
		_ === "md" ? "" : `async-select--${_}`,
		h ? "async-select--disabled" : "",
		x ? "async-select--error" : "",
		C ?? ""
	].filter(Boolean).join(" "), me = ["async-select__content", _ === "md" ? "" : `async-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(u.Root, {
		open: O,
		onOpenChange: de,
		children: [/* @__PURE__ */ r("div", {
			ref: q,
			className: pe,
			"data-popup-open": O || void 0,
			children: [
				/* @__PURE__ */ n("input", {
					ref: (e) => {
						K.current = e, ee(ie, e);
					},
					id: y,
					type: "text",
					className: "async-select__input",
					value: fe,
					onChange: se,
					onPointerDown: ce,
					onKeyDown: ue,
					placeholder: m,
					disabled: h,
					readOnly: g,
					"aria-label": w,
					"aria-describedby": T,
					"aria-invalid": x || void 0,
					"aria-required": te || void 0,
					"aria-expanded": O,
					"aria-haspopup": "listbox",
					"aria-controls": O ? J : void 0,
					"aria-activedescendant": R >= 0 ? X(R) : void 0,
					autoComplete: "off",
					role: "combobox",
					"aria-autocomplete": "list",
					onBlur: S
				}),
				b && /* @__PURE__ */ n("input", {
					type: "hidden",
					name: b,
					value: Y ?? ""
				}),
				M && /* @__PURE__ */ n(t, {
					size: "sm",
					"aria-hidden": !0
				}),
				!M && Y && !h && !g && /* @__PURE__ */ n("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": E,
					tabIndex: -1,
					onMouseDown: le,
					children: /* @__PURE__ */ n(e, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ n(u.Portal, {
			container: D,
			children: /* @__PURE__ */ n(u.Positioner, {
				className: "async-select__positioner",
				anchor: q,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ n(u.Popup, {
					className: me,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ r("div", {
						role: "listbox",
						"aria-label": w ?? m,
						id: J,
						children: [
							M && /* @__PURE__ */ n("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ n(t, {
									size: "sm",
									label: re
								})
							}),
							!M && I && P.length === 0 && /* @__PURE__ */ n("div", {
								className: "async-select__empty",
								children: ne
							}),
							!M && P.map((e, t) => {
								let r = e.value === Y, i = R === t;
								return /* @__PURE__ */ n("div", {
									id: X(t),
									role: "option",
									"aria-selected": r,
									className: [
										"async-select__item",
										r ? "async-select__item--selected" : "",
										i ? "async-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => Q(e),
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
