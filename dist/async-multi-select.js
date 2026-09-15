'use client';
import './async-multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Spinner as n } from "./spinner.js";
import { n as r } from "./_shared/portal-container.js";
import { forwardRef as i, useCallback as a, useEffect as o, useId as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { Popover as f } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var p = i(function({ onSearch: i, value: p, defaultValue: te = [], onValueChange: ne, selectedOptions: m, placeholder: h, disabled: g, readOnly: _, size: v = "md", debounceMs: re = 300, id: ie, name: y, error: b = !1, required: x, onBlur: S, className: ae, "aria-label": C, "aria-describedby": oe, removeLabel: se, emptyMessage: ce, loadingLabel: w, container: T }, E) {
	let D = e("asyncMultiSelect"), O = r(T), [k, A] = l(!1), [j, M] = l(""), [N, P] = l(!1), [F, I] = l([]), [L, R] = l(!1), [z, B] = l(-1), [V, H] = l(te), [U, W] = l([]), G = c(null), K = c(0), q = c(null), J = c(null), Y = s(), le = s(), X = p === void 0 ? V : p, ue = X.map((e) => m?.find((t) => t.value === e) ?? U.find((t) => t.value === e) ?? {
		value: e,
		label: e
	}), Z = (e) => `${le}-opt-${e}`, Q = a(async (e) => {
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
	o(() => () => {
		K.current += 1, G.current && clearTimeout(G.current);
	}, []);
	function de(e) {
		let t = e.target.value;
		M(t), k || A(!0), G.current && clearTimeout(G.current), G.current = setTimeout(() => void Q(t), re);
	}
	function fe(e) {
		g || _ || k || (e.preventDefault(), q.current?.focus(), B(-1), M(""), I([]), R(!1), A(!0), Q(""));
	}
	function $(e, t) {
		let n = X.includes(e) ? X.filter((t) => t !== e) : [...X, e];
		t && W((e) => e.some((e) => e.value === t.value) ? e : [...e, t]), p === void 0 && H(n), ne?.(n);
	}
	function pe(e) {
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
	function me(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && J.current?.contains(e)) return;
			}
			A(!1), M(""), B(-1);
		}
	}
	let he = [
		"async-multi-select",
		v === "md" ? "" : `async-multi-select--${v}`,
		g ? "async-multi-select--disabled" : "",
		k ? "async-multi-select--open" : "",
		b ? "async-multi-select--error" : "",
		ae ?? ""
	].filter(Boolean).join(" "), ge = ["async-multi-select__content", v === "md" ? "" : `async-multi-select__content--${v}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(f.Root, {
		open: k,
		onOpenChange: me,
		children: [/* @__PURE__ */ d("div", {
			ref: J,
			className: he,
			"data-popup-open": k || void 0,
			children: [/* @__PURE__ */ d("div", {
				className: "async-multi-select__input-area",
				children: [
					ue.map((e) => /* @__PURE__ */ d("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ u("span", {
							className: "async-multi-select__pill-label",
							children: e.label
						}), !g && !_ && /* @__PURE__ */ u("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": D("remove", se)(e.label),
							tabIndex: -1,
							onMouseDown: (t) => {
								t.preventDefault(), $(e.value);
							},
							children: /* @__PURE__ */ u(t, {
								name: "close",
								size: "xs"
							})
						})]
					}, e.value)),
					/* @__PURE__ */ u("input", {
						ref: (e) => {
							q.current = e, ee(E, e);
						},
						id: ie,
						type: "text",
						className: "async-multi-select__input",
						value: j,
						onChange: de,
						onPointerDown: fe,
						onKeyDown: pe,
						placeholder: X.length === 0 ? D("placeholder", h) : void 0,
						disabled: g,
						readOnly: _,
						"aria-label": C,
						"aria-describedby": oe,
						"aria-invalid": b || void 0,
						"aria-required": x || void 0,
						"aria-expanded": k,
						"aria-haspopup": "listbox",
						"aria-controls": k ? Y : void 0,
						"aria-activedescendant": z >= 0 ? Z(z) : void 0,
						autoComplete: "off",
						role: "combobox",
						"aria-autocomplete": "list",
						onBlur: S
					}),
					y && X.map((e) => /* @__PURE__ */ u("input", {
						type: "hidden",
						name: y,
						value: e
					}, e))
				]
			}), N && /* @__PURE__ */ u(n, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ u(f.Portal, {
			container: O,
			children: /* @__PURE__ */ u(f.Positioner, {
				className: "async-multi-select__positioner",
				anchor: J,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ u(f.Popup, {
					className: ge,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ d("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": C ?? D("placeholder", h),
						id: Y,
						children: [
							N && /* @__PURE__ */ u("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ u(n, {
									size: "sm",
									label: D("loading", w)
								})
							}),
							!N && L && F.length === 0 && /* @__PURE__ */ u("div", {
								className: "async-multi-select__empty",
								children: D("empty", ce)
							}),
							!N && F.map((e, t) => {
								let n = X.includes(e.value), r = z === t;
								return /* @__PURE__ */ d("div", {
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
});
//#endregion
export { p as AsyncMultiSelect };
