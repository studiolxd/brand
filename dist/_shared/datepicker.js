import '../datepicker.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Input as n } from "../input.js";
import { Popover as r } from "../popover.js";
import { Calendar as i } from "../calendar.js";
import { forwardRef as a, useCallback as o, useId as s, useMemo as c, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/DatePicker/dateMask.ts
var p = /[‎‏؜]/g, m = new Date(2026, 8, 25);
function h(e, t) {
	return String(e).padStart(t, "0");
}
function g(e) {
	let t = new Intl.DateTimeFormat(e, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	}).formatToParts(m), n = t.filter((e) => e.type === "day" || e.type === "month" || e.type === "year").map((e) => e.type), r = t.find((e) => e.type === "literal" && e.value.replace(p, "").trim() !== "")?.value.replace(p, "").trim() || "/", i = {
		day: 2,
		month: 2,
		year: 4
	};
	function a(e) {
		let t = {
			day: e.getDate(),
			month: e.getMonth() + 1,
			year: e.getFullYear()
		};
		return n.map((e) => h(t[e], i[e])).join(r);
	}
	function o(e) {
		return n.map((t) => e[t]).join(r);
	}
	function s(e) {
		let t = e.replace(p, "").trim();
		if (/\p{L}/u.test(t)) return null;
		let r = t.split(/\D+/).filter(Boolean);
		if (r.length !== 3) return null;
		let i = {};
		if (n.forEach((e, t) => {
			i[e] = r[t];
		}), i.year.length !== 4 || i.day.length > 2 || i.month.length > 2) return null;
		let a = Number(i.year), o = Number(i.month), s = Number(i.day), c = new Date(a, o - 1, s);
		return c.getFullYear() !== a || c.getMonth() !== o - 1 || c.getDate() !== s ? null : c;
	}
	return {
		order: n,
		separator: r,
		format: a,
		mask: o,
		parse: s
	};
}
//#endregion
//#region src/stories/molecules/DatePicker/DatePicker.tsx
function _(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
var v = a(function({ value: a, onChange: p, placeholder: m, maskLetters: h, invalidMessage: v, openCalendarLabel: y, minDate: b, maxDate: x, disabledDates: S, size: C = "md", disabled: w, readOnly: T, error: E = !1, locale: D = "es-ES", id: O, name: k, describedBy: ee, "aria-describedby": te, "aria-label": ne, calendarLabel: re, previousMonthLabel: ie, nextMonthLabel: ae, previousYearsLabel: A, nextYearsLabel: j, yearGridLabel: M, gridLabel: N, onBlur: P, className: F }, I) {
	let L = e("datePicker"), [R, z] = u(!1), B = c(() => g(D), [D]), V = a instanceof Date ? B.format(a) : "", [H, U] = u(V), [W, G] = u(V);
	V !== W && (G(V), U(V));
	let K = l(null), q = o((e) => {
		K.current = e, typeof I == "function" ? I(e) : I && (I.current = e);
	}, [I]), J = H.trim(), Y = J ? B.parse(H) : null, X = J !== "" && !Y, oe = E || X, Z = `${s()}-date-picker-invalid`, se = [ee ?? te, X ? Z : void 0].filter(Boolean).join(" ") || void 0, ce = o((e) => {
		(T || w) && e || z(e);
	}, [w, T]), le = o((e) => {
		let t = e.target.value;
		if (U(t), t.trim() === "") {
			p?.(null);
			return;
		}
		let n = B.parse(t);
		n && p?.(n);
	}, [B, p]), ue = o((e) => {
		if (e.key === "ArrowDown" && !T && !w) {
			e.preventDefault(), z(!0);
			return;
		}
		e.key === "Escape" && R && (e.preventDefault(), z(!1));
	}, [
		w,
		R,
		T
	]), Q = o((e) => {
		U(B.format(e)), p?.(e), z(!1), requestAnimationFrame(() => K.current?.focus());
	}, [B, p]), de = /* @__PURE__ */ d("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": L("openCalendar", y),
		"aria-haspopup": "dialog",
		"aria-expanded": R,
		disabled: w,
		tabIndex: T ? -1 : void 0,
		children: /* @__PURE__ */ d(t, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	}), $ = L("calendar", re);
	return /* @__PURE__ */ f("div", {
		className: [
			"date-picker",
			C === "md" ? "" : `date-picker--${C}`,
			F ?? ""
		].filter(Boolean).join(" "),
		children: [
			k && /* @__PURE__ */ d("input", {
				type: "hidden",
				name: k,
				value: a instanceof Date ? _(a) : ""
			}),
			/* @__PURE__ */ f("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ d(n, {
					ref: q,
					id: O,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: C,
					error: oe,
					value: H,
					placeholder: m ?? B.mask(L("maskLetters", h)),
					disabled: w,
					readOnly: T,
					"aria-label": ne,
					"aria-describedby": se,
					onChange: le,
					onKeyDown: ue,
					onBlur: P
				}), /* @__PURE__ */ d(r, {
					trigger: de,
					label: $,
					open: R,
					onOpenChange: ce,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ d(i, {
						value: Y ?? a ?? null,
						onChange: Q,
						gridLabel: N ?? $,
						previousMonthLabel: ie,
						nextMonthLabel: ae,
						previousYearsLabel: A,
						nextYearsLabel: j,
						yearGridLabel: M,
						minDate: b,
						maxDate: x,
						disabledDates: S,
						locale: D,
						size: C
					})
				})]
			}),
			X && /* @__PURE__ */ d("span", {
				id: Z,
				className: "date-picker__message",
				role: "alert",
				children: L("invalid", v)
			})
		]
	});
});
//#endregion
export { v as t };
