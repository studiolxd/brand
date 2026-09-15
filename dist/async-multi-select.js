'use client';
import './async-multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Spinner as n } from "./spinner.js";
import { forwardRef as r, useCallback as ee, useEffect as te, useId as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = r(function({ onSearch: r, value: d, defaultValue: f = [], onValueChange: p, selectedOptions: ne, placeholder: m, disabled: h, readOnly: g, size: _ = "md", debounceMs: v = 300, id: re, name: y, error: b = !1, required: ie, onBlur: ae, className: x, "aria-label": S, "aria-describedby": C, removeLabel: w, emptyMessage: T, loadingLabel: E, container: D }, oe) {
	let O = e("asyncMultiSelect"), [k, A] = o(!1), [j, M] = o(""), [N, P] = o(!1), [F, I] = o([]), [L, R] = o(!1), [z, B] = o(-1), [V, H] = o(f), [U, W] = o([]), G = a(null), K = a(0), q = a(null), J = a(null), Y = i(), se = i(), X = d === void 0 ? V : d, ce = X.map((e) => ne?.find((t) => t.value === e) ?? U.find((t) => t.value === e) ?? {
		value: e,
		label: e
	}), Z = (e) => `${se}-opt-${e}`, Q = ee(async (e) => {
		let t = ++K.current;
		P(!0), R(!1);
		try {
			let n = await r(e);
			if (t !== K.current) return;
			I(n), B(-1);
		} catch {
			if (t !== K.current) return;
			I([]), B(-1);
		} finally {
			t === K.current && (P(!1), R(!0));
		}
	}, [r]);
	te(() => () => {
		K.current += 1, G.current && clearTimeout(G.current);
	}, []);
	function le(e) {
		let t = e.target.value;
		M(t), k || A(!0), G.current && clearTimeout(G.current), G.current = setTimeout(() => void Q(t), v);
	}
	function ue(e) {
		h || g || k || (e.preventDefault(), q.current?.focus(), B(-1), M(""), I([]), R(!1), A(!0), Q(""));
	}
	function $(e, t) {
		let n = X.includes(e) ? X.filter((t) => t !== e) : [...X, e];
		t && W((e) => e.some((e) => e.value === t.value) ? e : [...e, t]), d === void 0 && H(n), p?.(n);
	}
	function de(e) {
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
	function fe(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && J.current?.contains(e)) return;
			}
			A(!1), M(""), B(-1);
		}
	}
	let pe = [
		"async-multi-select",
		_ === "md" ? "" : `async-multi-select--${_}`,
		h ? "async-multi-select--disabled" : "",
		k ? "async-multi-select--open" : "",
		b ? "async-multi-select--error" : "",
		x ?? ""
	].filter(Boolean).join(" "), me = ["async-multi-select__content", _ === "md" ? "" : `async-multi-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		open: k,
		onOpenChange: fe,
		children: [/* @__PURE__ */ c("div", {
			ref: J,
			className: pe,
			"data-popup-open": k || void 0,
			children: [/* @__PURE__ */ c("div", {
				className: "async-multi-select__input-area",
				children: [
					ce.map((e) => /* @__PURE__ */ c("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ s("span", {
							className: "async-multi-select__pill-label",
							children: e.label
						}), !h && !g && /* @__PURE__ */ s("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": O("remove", w)(e.label),
							tabIndex: -1,
							onMouseDown: (t) => {
								t.preventDefault(), $(e.value);
							},
							children: /* @__PURE__ */ s(t, {
								name: "close",
								size: "xs"
							})
						})]
					}, e.value)),
					/* @__PURE__ */ s("input", {
						ref: (e) => {
							q.current = e, u(oe, e);
						},
						id: re,
						type: "text",
						className: "async-multi-select__input",
						value: j,
						onChange: le,
						onPointerDown: ue,
						onKeyDown: de,
						placeholder: X.length === 0 ? O("placeholder", m) : void 0,
						disabled: h,
						readOnly: g,
						"aria-label": S,
						"aria-describedby": C,
						"aria-invalid": b || void 0,
						"aria-required": ie || void 0,
						"aria-expanded": k,
						"aria-haspopup": "listbox",
						"aria-controls": k ? Y : void 0,
						"aria-activedescendant": z >= 0 ? Z(z) : void 0,
						autoComplete: "off",
						role: "combobox",
						"aria-autocomplete": "list",
						onBlur: ae
					}),
					y && X.map((e) => /* @__PURE__ */ s("input", {
						type: "hidden",
						name: y,
						value: e
					}, e))
				]
			}), N && /* @__PURE__ */ s(n, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ s(l.Portal, {
			container: D,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "async-multi-select__positioner",
				anchor: J,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ s(l.Popup, {
					className: me,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ c("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": S ?? O("placeholder", m),
						id: Y,
						children: [
							N && /* @__PURE__ */ s("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ s(n, {
									size: "sm",
									label: O("loading", E)
								})
							}),
							!N && L && F.length === 0 && /* @__PURE__ */ s("div", {
								className: "async-multi-select__empty",
								children: O("empty", T)
							}),
							!N && F.map((e, t) => {
								let n = X.includes(e.value), r = z === t;
								return /* @__PURE__ */ c("div", {
									id: Z(t),
									role: "option",
									"aria-selected": n,
									className: [
										"async-multi-select__item",
										n ? "async-multi-select__item--selected" : "",
										r ? "async-multi-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => {
										$(e.value, e), q.current?.focus();
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
