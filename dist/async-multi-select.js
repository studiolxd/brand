'use client';
import './async-multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Spinner as n } from "./spinner.js";
import { n as r } from "./_shared/portal-container.js";
import { t as i } from "./_shared/assign-ref.js";
import { forwardRef as a, useCallback as o, useEffect as s, useId as c, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
import { Popover as p } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
var m = a(function({ onSearch: a, value: m, defaultValue: h = [], onValueChange: ee, selectedOptions: te, placeholder: g, disabled: _, readOnly: v, size: y = "md", debounceMs: ne = 300, id: b, name: x, error: S = !1, required: C, onBlur: re, className: ie, "aria-label": w, "aria-describedby": ae, removeLabel: oe, emptyMessage: se, loadingLabel: T, container: E }, ce) {
	let D = e("asyncMultiSelect"), O = r(E), [k, A] = u(!1), [j, M] = u(""), [N, P] = u(!1), [F, I] = u([]), [L, R] = u(!1), [z, B] = u(-1), [V, H] = u(h), [U, W] = u([]), G = l(null), K = l(0), q = l(null), J = l(null), Y = c(), le = c(), X = m === void 0 ? V : m, ue = X.map((e) => te?.find((t) => t.value === e) ?? U.find((t) => t.value === e) ?? {
		value: e,
		label: e
	}), Z = (e) => `${le}-opt-${e}`, Q = o(async (e) => {
		let t = ++K.current;
		P(!0), R(!1);
		try {
			let n = await a(e);
			if (t !== K.current) return;
			I(n), B(-1);
		} catch {
			if (t !== K.current) return;
			I([]), B(-1);
		} finally {
			t === K.current && (P(!1), R(!0));
		}
	}, [a]);
	s(() => () => {
		K.current += 1, G.current && clearTimeout(G.current);
	}, []);
	function de(e) {
		let t = e.target.value;
		M(t), k || A(!0), G.current && clearTimeout(G.current), G.current = setTimeout(() => void Q(t), ne);
	}
	function fe(e) {
		_ || v || k || (e.preventDefault(), q.current?.focus(), B(-1), M(""), I([]), R(!1), A(!0), Q(""));
	}
	function $(e, t) {
		let n = X.includes(e) ? X.filter((t) => t !== e) : [...X, e];
		t && W((e) => e.some((e) => e.value === t.value) ? e : [...e, t]), m === void 0 && H(n), ee?.(n);
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
		y === "md" ? "" : `async-multi-select--${y}`,
		_ ? "async-multi-select--disabled" : "",
		k ? "async-multi-select--open" : "",
		S ? "async-multi-select--error" : "",
		ie ?? ""
	].filter(Boolean).join(" "), ge = ["async-multi-select__content", y === "md" ? "" : `async-multi-select__content--${y}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ f(p.Root, {
		open: k,
		onOpenChange: me,
		children: [/* @__PURE__ */ f("div", {
			ref: J,
			className: he,
			"data-popup-open": k || void 0,
			children: [/* @__PURE__ */ f("div", {
				className: "async-multi-select__input-area",
				children: [
					ue.map((e) => /* @__PURE__ */ f("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ d("span", {
							className: "async-multi-select__pill-label",
							children: e.label
						}), !_ && !v && /* @__PURE__ */ d("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": D("remove", oe)(e.label),
							tabIndex: -1,
							onMouseDown: (t) => {
								t.preventDefault(), $(e.value);
							},
							children: /* @__PURE__ */ d(t, {
								name: "close",
								size: "xs"
							})
						})]
					}, e.value)),
					/* @__PURE__ */ d("input", {
						ref: (e) => {
							q.current = e, i(ce, e);
						},
						id: b,
						type: "text",
						className: "async-multi-select__input",
						value: j,
						onChange: de,
						onPointerDown: fe,
						onKeyDown: pe,
						placeholder: X.length === 0 ? D("placeholder", g) : void 0,
						disabled: _,
						readOnly: v,
						"aria-label": w,
						"aria-describedby": ae,
						"aria-invalid": S || void 0,
						"aria-required": C || void 0,
						"aria-expanded": k,
						"aria-haspopup": "listbox",
						"aria-controls": k ? Y : void 0,
						"aria-activedescendant": z >= 0 ? Z(z) : void 0,
						autoComplete: "off",
						role: "combobox",
						"aria-autocomplete": "list",
						onBlur: re
					}),
					x && X.map((e) => /* @__PURE__ */ d("input", {
						type: "hidden",
						name: x,
						value: e
					}, e))
				]
			}), N && /* @__PURE__ */ d(n, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ d(p.Portal, {
			container: O,
			children: /* @__PURE__ */ d(p.Positioner, {
				className: "async-multi-select__positioner",
				anchor: J,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ d(p.Popup, {
					className: ge,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ f("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": w ?? D("placeholder", g),
						id: Y,
						children: [
							N && /* @__PURE__ */ d("div", {
								className: "async-multi-select__loading",
								children: /* @__PURE__ */ d(n, {
									size: "sm",
									label: D("loading", T)
								})
							}),
							!N && L && F.length === 0 && /* @__PURE__ */ d("div", {
								className: "async-multi-select__empty",
								children: D("empty", se)
							}),
							!N && F.map((e, t) => {
								let n = X.includes(e.value), r = z === t;
								return /* @__PURE__ */ f("div", {
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
									children: [/* @__PURE__ */ d("span", {
										className: "async-multi-select__item-check",
										"aria-hidden": "true",
										children: /* @__PURE__ */ d("span", { className: "async-multi-select__item-check-mark" })
									}), /* @__PURE__ */ d("span", { children: e.label })]
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
export { m as AsyncMultiSelect };
