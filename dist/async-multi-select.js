'use client';
import './async-multi-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useCallback as a, useEffect as ee, useId as o, useRef as s, useState as c } from "react";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = i(function({ onSearch: i, value: d, defaultValue: f = [], onValueChange: p, selectedOptions: te, placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", debounceMs: v = 300, id: y, name: b, error: x = !1, required: S, onBlur: C, className: w, "aria-label": T, "aria-describedby": ne, removeLabel: re = (e) => `Quitar ${e}`, emptyMessage: E = "Sin resultados", loadingLabel: D = "Buscando…", container: O }, ie) {
	let [k, A] = c(!1), [j, M] = c(""), [N, P] = c(!1), [F, I] = c([]), [L, R] = c(!1), [z, B] = c(-1), [V, H] = c(f), [U, W] = c([]), G = s(null), K = s(0), q = s(null), J = s(null), Y = o(), ae = o(), X = d === void 0 ? V : d, oe = X.map((e) => te?.find((t) => t.value === e) ?? U.find((t) => t.value === e) ?? {
		value: e,
		label: e
	}), Z = (e) => `${ae}-opt-${e}`, Q = a(async (e) => {
		let t = ++K.current;
		P(!0), R(!1);
		try {
			let n = await i(e);
			if (t !== K.current) return;
			I(n), B(-1);
		} catch {
			if (t !== K.current) return;
			I([]), B(-1);
		} finally {
			t === K.current && (P(!1), R(!0));
		}
	}, [i]);
	ee(() => () => {
		K.current += 1, G.current && clearTimeout(G.current);
	}, []);
	function se(e) {
		let t = e.target.value;
		M(t), k || A(!0), G.current && clearTimeout(G.current), G.current = setTimeout(() => void Q(t), v);
	}
	function ce(e) {
		h || g || k || (e.preventDefault(), q.current?.focus(), B(-1), M(""), I([]), R(!1), A(!0), Q(""));
	}
	function $(e, t) {
		let n = X.includes(e) ? X.filter((t) => t !== e) : [...X, e];
		t && W((e) => e.some((e) => e.value === t.value) ? e : [...e, t]), d === void 0 && H(n), p?.(n);
	}
	function le(e) {
		if (e.key === "ArrowDown") e.preventDefault(), k ? B((e) => Math.min(e + 1, F.length - 1)) : (A(!0), Q(j));
		else if (e.key === "ArrowUp") e.preventDefault(), B((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && z >= 0 && F[z]) e.preventDefault(), $(F[z].value, F[z]), q.current?.focus();
		else if (e.key === "Escape") A(!1), M(""), B(-1);
		else if (e.key === "Tab") A(!1), B(-1);
		else if (e.key === "Backspace" && j === "" && X.length > 0) {
			let e = X[X.length - 1];
			$(e);
		}
	}
	function ue(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && J.current?.contains(e)) return;
			}
			A(!1), M(""), B(-1);
		}
	}
	let de = [
		"async-multi-select",
		_ === "md" ? "" : `async-multi-select--${_}`,
		h ? "async-multi-select--disabled" : "",
		k ? "async-multi-select--open" : "",
		x ? "async-multi-select--error" : "",
		w ?? ""
	].filter(Boolean).join(" "), fe = ["async-multi-select__content", _ === "md" ? "" : `async-multi-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(l.Root, {
		open: k,
		onOpenChange: ue,
		children: [/* @__PURE__ */ r("div", {
			ref: J,
			className: de,
			"data-popup-open": k || void 0,
			children: [/* @__PURE__ */ r("div", {
				className: "async-multi-select__input-area",
				children: [
					oe.map((t) => /* @__PURE__ */ r("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ n("span", {
							className: "async-multi-select__pill-label",
							children: t.label
						}), !h && !g && /* @__PURE__ */ n("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": re(t.label),
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), $(t.value);
							},
							children: /* @__PURE__ */ n(e, {
								name: "close",
								size: "xs"
							})
						})]
					}, t.value)),
					/* @__PURE__ */ n("input", {
						ref: (e) => {
							q.current = e, u(ie, e);
						},
						id: y,
						type: "text",
						className: "async-multi-select__input",
						value: j,
						onChange: se,
						onPointerDown: ce,
						onKeyDown: le,
						placeholder: X.length === 0 ? m : void 0,
						disabled: h,
						readOnly: g,
						"aria-label": T,
						"aria-describedby": ne,
						"aria-invalid": x || void 0,
						"aria-required": S || void 0,
						"aria-expanded": k,
						"aria-haspopup": "listbox",
						"aria-controls": k ? Y : void 0,
						"aria-activedescendant": z >= 0 ? Z(z) : void 0,
						autoComplete: "off",
						role: "combobox",
						"aria-autocomplete": "list",
						onBlur: C
					}),
					b && X.map((e) => /* @__PURE__ */ n("input", {
						type: "hidden",
						name: b,
						value: e
					}, e))
				]
			}), N && /* @__PURE__ */ n(t, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ n(l.Portal, {
			container: O,
			children: /* @__PURE__ */ n(l.Positioner, {
				className: "async-multi-select__positioner",
				anchor: J,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ n(l.Popup, {
					className: fe,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ r("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": T ?? m,
						id: Y,
						children: [
							N && /* @__PURE__ */ n("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ n(t, {
									size: "sm",
									label: D
								})
							}),
							!N && L && F.length === 0 && /* @__PURE__ */ n("div", {
								className: "async-multi-select__empty",
								children: E
							}),
							!N && F.map((e, t) => {
								let i = X.includes(e.value), a = z === t;
								return /* @__PURE__ */ r("div", {
									id: Z(t),
									role: "option",
									"aria-selected": i,
									className: [
										"async-multi-select__item",
										i ? "async-multi-select__item--selected" : "",
										a ? "async-multi-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => {
										$(e.value, e), q.current?.focus();
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
});
//#endregion
export { d as AsyncMultiSelect };
