import '../datepicker.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Input as n } from "../input.js";
import { t as r } from "./assign-ref.js";
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
//#region src/stories/messages/es/datePicker.ts
var v = {
	openCalendar: "Abrir calendario",
	invalid: "Escribe una fecha completa, con el día, el mes y el año.",
	calendar: "Calendario",
	maskLetters: {
		day: "dd",
		month: "mm",
		year: "aaaa"
	}
};
//#endregion
//#region src/stories/molecules/DatePicker/DatePicker.tsx
function y(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
var b = o(function({ value: o, onChange: m, placeholder: h, maskLetters: g, invalidMessage: b, openCalendarLabel: ee, minDate: x, maxDate: te, disabledDates: ne, size: S = "md", disabled: C, readOnly: w, required: re, error: T = !1, locale: E = "es-ES", id: D, name: O, describedBy: ie, "aria-describedby": ae, "aria-label": oe, calendarLabel: k, previousMonthLabel: A, nextMonthLabel: j, previousYearsLabel: M, nextYearsLabel: N, yearGridLabel: P, gridLabel: F, today: I, onBlur: L, className: R }, z) {
	let B = e("datePicker", v), [V, H] = d(!1), U = l(() => _(E), [E]), W = o instanceof Date ? U.format(o) : "", [G, K] = d(W), [q, se] = d(W);
	W !== q && (se(W), K(W));
	let J = u(null), ce = s((e) => {
		J.current = e, r(z, e);
	}, [z]), Y = G.trim(), X = Y ? U.parse(G) : null, Z = Y !== "" && !X, le = T || Z, Q = `${c()}-date-picker-invalid`, ue = [ie ?? ae, Z ? Q : void 0].filter(Boolean).join(" ") || void 0, de = s((e) => {
		(w || C) && e || H(e);
	}, [C, w]), fe = s((e) => {
		let t = e.target.value;
		if (K(t), t.trim() === "") {
			m?.(null);
			return;
		}
		let n = U.parse(t);
		n && m?.(n);
	}, [U, m]), pe = s((e) => {
		if (e.key === "ArrowDown" && !w && !C) {
			e.preventDefault(), H(!0);
			return;
		}
		e.key === "Escape" && V && (e.preventDefault(), H(!1));
	}, [
		C,
		V,
		w
	]), me = s((e) => {
		K(U.format(e)), m?.(e), H(!1), requestAnimationFrame(() => J.current?.focus());
	}, [U, m]), he = /* @__PURE__ */ f("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": B("openCalendar", ee),
		"aria-haspopup": "dialog",
		"aria-expanded": V,
		disabled: C,
		tabIndex: w ? -1 : void 0,
		children: /* @__PURE__ */ f(t, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	}), $ = B("calendar", k);
	return /* @__PURE__ */ p("div", {
		className: [
			"date-picker",
			S === "md" ? "" : `date-picker--${S}`,
			R ?? ""
		].filter(Boolean).join(" "),
		children: [
			O && /* @__PURE__ */ f("input", {
				type: "hidden",
				name: O,
				value: o instanceof Date ? y(o) : ""
			}),
			/* @__PURE__ */ p("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ f(n, {
					ref: ce,
					id: D,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: S,
					error: le,
					value: G,
					placeholder: h ?? U.mask(B("maskLetters", g)),
					disabled: C,
					readOnly: w,
					required: re,
					"aria-label": oe,
					"aria-describedby": ue,
					onChange: fe,
					onKeyDown: pe,
					onBlur: L
				}), /* @__PURE__ */ f(i, {
					trigger: he,
					label: $,
					open: V,
					onOpenChange: de,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ f(a, {
						value: X ?? o ?? null,
						onChange: me,
						gridLabel: F ?? $,
						previousMonthLabel: A,
						nextMonthLabel: j,
						previousYearsLabel: M,
						nextYearsLabel: N,
						yearGridLabel: P,
						today: I,
						minDate: x,
						maxDate: te,
						disabledDates: ne,
						locale: E,
						size: S
					})
				})]
			}),
			Z && /* @__PURE__ */ f("span", {
				id: Q,
				className: "date-picker__message",
				role: "alert",
				children: B("invalid", b)
			})
		]
	});
});
//#endregion
export { b as t };
