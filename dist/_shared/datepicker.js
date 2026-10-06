import '../datepicker.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { t as n } from "./assign-ref.js";
import { Input as r } from "../input.js";
import { Popover as i } from "../popover.js";
import { Calendar as a } from "../calendar.js";
import { forwardRef as o, useCallback as s, useId as c, useMemo as l, useRef as u, useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/molecules/DatePicker/dateMask.ts
var m = /[‎‏؜]/g, h = new Date(2026, 8, 25);
function g(e, t) {
	return String(e).padStart(t, "0");
}
function _(e) {
	let t = new Intl.DateTimeFormat(e, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	}).formatToParts(h), n = t.filter((e) => e.type === "day" || e.type === "month" || e.type === "year").map((e) => e.type), r = t.find((e) => e.type === "literal" && e.value.replace(m, "").trim() !== "")?.value.replace(m, "").trim() || "/", i = {
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
		return n.map((e) => g(t[e], i[e])).join(r);
	}
	function o(e) {
		return n.map((t) => e[t]).join(r);
	}
	function s(e) {
		let t = e.replace(m, "").trim();
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
function v(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
var y = o(function({ value: o, onChange: m, placeholder: h, maskLetters: g, invalidMessage: y, openCalendarLabel: ee, minDate: b, maxDate: x, disabledDates: S, size: C = "md", disabled: w, readOnly: T, error: E = !1, locale: D = "es-ES", id: O, name: k, describedBy: te, "aria-describedby": ne, "aria-label": re, calendarLabel: ie, previousMonthLabel: ae, nextMonthLabel: A, previousYearsLabel: j, nextYearsLabel: M, yearGridLabel: N, gridLabel: P, onBlur: F, className: I }, L) {
	let R = e("datePicker"), [z, B] = d(!1), V = l(() => _(D), [D]), H = o instanceof Date ? V.format(o) : "", [U, W] = d(H), [G, K] = d(H);
	H !== G && (K(H), W(H));
	let q = u(null), oe = s((e) => {
		q.current = e, n(L, e);
	}, [L]), J = U.trim(), Y = J ? V.parse(U) : null, X = J !== "" && !Y, se = E || X, Z = `${c()}-date-picker-invalid`, ce = [te ?? ne, X ? Z : void 0].filter(Boolean).join(" ") || void 0, le = s((e) => {
		(T || w) && e || B(e);
	}, [w, T]), ue = s((e) => {
		let t = e.target.value;
		if (W(t), t.trim() === "") {
			m?.(null);
			return;
		}
		let n = V.parse(t);
		n && m?.(n);
	}, [V, m]), Q = s((e) => {
		if (e.key === "ArrowDown" && !T && !w) {
			e.preventDefault(), B(!0);
			return;
		}
		e.key === "Escape" && z && (e.preventDefault(), B(!1));
	}, [
		w,
		z,
		T
	]), de = s((e) => {
		W(V.format(e)), m?.(e), B(!1), requestAnimationFrame(() => q.current?.focus());
	}, [V, m]), fe = /* @__PURE__ */ f("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": R("openCalendar", ee),
		"aria-haspopup": "dialog",
		"aria-expanded": z,
		disabled: w,
		tabIndex: T ? -1 : void 0,
		children: /* @__PURE__ */ f(t, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	}), $ = R("calendar", ie);
	return /* @__PURE__ */ p("div", {
		className: [
			"date-picker",
			C === "md" ? "" : `date-picker--${C}`,
			I ?? ""
		].filter(Boolean).join(" "),
		children: [
			k && /* @__PURE__ */ f("input", {
				type: "hidden",
				name: k,
				value: o instanceof Date ? v(o) : ""
			}),
			/* @__PURE__ */ p("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ f(r, {
					ref: oe,
					id: O,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: C,
					error: se,
					value: U,
					placeholder: h ?? V.mask(R("maskLetters", g)),
					disabled: w,
					readOnly: T,
					"aria-label": re,
					"aria-describedby": ce,
					onChange: ue,
					onKeyDown: Q,
					onBlur: F
				}), /* @__PURE__ */ f(i, {
					trigger: fe,
					label: $,
					open: z,
					onOpenChange: le,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ f(a, {
						value: Y ?? o ?? null,
						onChange: de,
						gridLabel: P ?? $,
						previousMonthLabel: ae,
						nextMonthLabel: A,
						previousYearsLabel: j,
						nextYearsLabel: M,
						yearGridLabel: N,
						minDate: b,
						maxDate: x,
						disabledDates: S,
						locale: D,
						size: C
					})
				})]
			}),
			X && /* @__PURE__ */ f("span", {
				id: Z,
				className: "date-picker__message",
				role: "alert",
				children: R("invalid", y)
			})
		]
	});
});
//#endregion
export { y as t };
