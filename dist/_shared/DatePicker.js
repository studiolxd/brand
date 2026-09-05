import '../DatePicker.css';
import { Icon as e } from "../icon.js";
import { Input as t } from "../input.js";
import { Popover as n } from "../popover.js";
import { Calendar as r } from "../calendar.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useCallback as s, useId as c, useMemo as l, useRef as ee, useState as u } from "react";
//#region src/stories/molecules/DatePicker/dateMask.ts
var d = {
	day: "dd",
	month: "mm",
	year: "aaaa"
}, f = /[‎‏؜]/g, p = new Date(2026, 8, 25);
function m(e, t) {
	return String(e).padStart(t, "0");
}
function h(e) {
	let t = new Intl.DateTimeFormat(e, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	}).formatToParts(p), n = t.filter((e) => e.type === "day" || e.type === "month" || e.type === "year").map((e) => e.type), r = t.find((e) => e.type === "literal" && e.value.replace(f, "").trim() !== "")?.value.replace(f, "").trim() || "/", i = {
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
		return n.map((e) => m(t[e], i[e])).join(r);
	}
	function o(e) {
		return n.map((t) => e[t]).join(r);
	}
	function s(e) {
		let t = e.replace(f, "").trim();
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
function g(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
var _ = o(function({ value: o, onChange: f, placeholder: p, maskLetters: m = d, invalidMessage: _ = "Escribe una fecha completa, con el día, el mes y el año.", openCalendarLabel: v = "Abrir calendario", minDate: y, maxDate: b, disabledDates: x, size: S = "md", disabled: C, readOnly: w, error: T = !1, locale: E = "es-ES", id: D, name: O, describedBy: te, "aria-describedby": ne, "aria-label": re, calendarLabel: k = "Calendario", previousMonthLabel: A, nextMonthLabel: j, previousYearsLabel: M, nextYearsLabel: N, yearGridLabel: P, gridLabel: F, onBlur: I, className: L }, R) {
	let [z, B] = u(!1), V = l(() => h(E), [E]), H = o instanceof Date ? V.format(o) : "", [U, W] = u(H), [G, K] = u(H);
	H !== G && (K(H), W(H));
	let q = ee(null), J = s((e) => {
		q.current = e, typeof R == "function" ? R(e) : R && (R.current = e);
	}, [R]), Y = U.trim(), X = Y ? V.parse(U) : null, Z = Y !== "" && !X, ie = T || Z, Q = `${c()}-date-picker-invalid`, ae = [te ?? ne, Z ? Q : void 0].filter(Boolean).join(" ") || void 0, oe = s((e) => {
		(w || C) && e || B(e);
	}, [C, w]), $ = s((e) => {
		let t = e.target.value;
		if (W(t), t.trim() === "") {
			f?.(null);
			return;
		}
		let n = V.parse(t);
		n && f?.(n);
	}, [V, f]), se = s((e) => {
		if (e.key === "ArrowDown" && !w && !C) {
			e.preventDefault(), B(!0);
			return;
		}
		e.key === "Escape" && z && (e.preventDefault(), B(!1));
	}, [
		C,
		z,
		w
	]), ce = s((e) => {
		W(V.format(e)), f?.(e), B(!1), requestAnimationFrame(() => q.current?.focus());
	}, [V, f]), le = /* @__PURE__ */ i("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": v,
		"aria-haspopup": "dialog",
		"aria-expanded": z,
		disabled: C,
		tabIndex: w ? -1 : void 0,
		children: /* @__PURE__ */ i(e, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	});
	return /* @__PURE__ */ a("div", {
		className: [
			"date-picker",
			S === "md" ? "" : `date-picker--${S}`,
			L ?? ""
		].filter(Boolean).join(" "),
		children: [
			O && /* @__PURE__ */ i("input", {
				type: "hidden",
				name: O,
				value: o instanceof Date ? g(o) : ""
			}),
			/* @__PURE__ */ a("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ i(t, {
					ref: J,
					id: D,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: S,
					error: ie,
					value: U,
					placeholder: p ?? V.mask(m),
					disabled: C,
					readOnly: w,
					"aria-label": re,
					"aria-describedby": ae,
					onChange: $,
					onKeyDown: se,
					onBlur: I
				}), /* @__PURE__ */ i(n, {
					trigger: le,
					label: k,
					open: z,
					onOpenChange: oe,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ i(r, {
						value: X ?? o ?? null,
						onChange: ce,
						gridLabel: F ?? k,
						previousMonthLabel: A,
						nextMonthLabel: j,
						previousYearsLabel: M,
						nextYearsLabel: N,
						yearGridLabel: P,
						minDate: y,
						maxDate: b,
						disabledDates: x,
						locale: E,
						size: S
					})
				})]
			}),
			Z && /* @__PURE__ */ i("span", {
				id: Q,
				className: "date-picker__message",
				role: "alert",
				children: _
			})
		]
	});
});
//#endregion
export { _ as t };
