import '../datepicker.css';
import { Icon as e } from "../icon.js";
import { Input as t } from "../input.js";
import { Popover as n } from "../popover.js";
import { Calendar as r } from "../calendar.js";
import { forwardRef as i, useCallback as a, useId as o, useMemo as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/DatePicker/dateMask.ts
var f = {
	day: "dd",
	month: "mm",
	year: "aaaa"
}, p = /[‎‏؜]/g, m = new Date(2026, 8, 25);
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
var v = i(function({ value: i, onChange: p, placeholder: m, maskLetters: h = f, invalidMessage: v = "Escribe una fecha completa, con el día, el mes y el año.", openCalendarLabel: y = "Abrir calendario", minDate: b, maxDate: ee, disabledDates: x, size: S = "md", disabled: C, readOnly: w, error: T = !1, locale: E = "es-ES", id: D, name: O, describedBy: k, "aria-describedby": te, "aria-label": ne, calendarLabel: A = "Calendario", previousMonthLabel: re, nextMonthLabel: j, previousYearsLabel: M, nextYearsLabel: N, yearGridLabel: P, gridLabel: F, onBlur: I, className: L }, R) {
	let [z, B] = l(!1), V = s(() => g(E), [E]), H = i instanceof Date ? V.format(i) : "", [U, W] = l(H), [G, K] = l(H);
	H !== G && (K(H), W(H));
	let q = c(null), J = a((e) => {
		q.current = e, typeof R == "function" ? R(e) : R && (R.current = e);
	}, [R]), Y = U.trim(), X = Y ? V.parse(U) : null, Z = Y !== "" && !X, ie = T || Z, Q = `${o()}-date-picker-invalid`, ae = [k ?? te, Z ? Q : void 0].filter(Boolean).join(" ") || void 0, oe = a((e) => {
		(w || C) && e || B(e);
	}, [C, w]), $ = a((e) => {
		let t = e.target.value;
		if (W(t), t.trim() === "") {
			p?.(null);
			return;
		}
		let n = V.parse(t);
		n && p?.(n);
	}, [V, p]), se = a((e) => {
		if (e.key === "ArrowDown" && !w && !C) {
			e.preventDefault(), B(!0);
			return;
		}
		e.key === "Escape" && z && (e.preventDefault(), B(!1));
	}, [
		C,
		z,
		w
	]), ce = a((e) => {
		W(V.format(e)), p?.(e), B(!1), requestAnimationFrame(() => q.current?.focus());
	}, [V, p]), le = /* @__PURE__ */ u("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": y,
		"aria-haspopup": "dialog",
		"aria-expanded": z,
		disabled: C,
		tabIndex: w ? -1 : void 0,
		children: /* @__PURE__ */ u(e, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	});
	return /* @__PURE__ */ d("div", {
		className: [
			"date-picker",
			S === "md" ? "" : `date-picker--${S}`,
			L ?? ""
		].filter(Boolean).join(" "),
		children: [
			O && /* @__PURE__ */ u("input", {
				type: "hidden",
				name: O,
				value: i instanceof Date ? _(i) : ""
			}),
			/* @__PURE__ */ d("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ u(t, {
					ref: J,
					id: D,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: S,
					error: ie,
					value: U,
					placeholder: m ?? V.mask(h),
					disabled: C,
					readOnly: w,
					"aria-label": ne,
					"aria-describedby": ae,
					onChange: $,
					onKeyDown: se,
					onBlur: I
				}), /* @__PURE__ */ u(n, {
					trigger: le,
					label: A,
					open: z,
					onOpenChange: oe,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ u(r, {
						value: X ?? i ?? null,
						onChange: ce,
						gridLabel: F ?? A,
						previousMonthLabel: re,
						nextMonthLabel: j,
						previousYearsLabel: M,
						nextYearsLabel: N,
						yearGridLabel: P,
						minDate: b,
						maxDate: ee,
						disabledDates: x,
						locale: E,
						size: S
					})
				})]
			}),
			Z && /* @__PURE__ */ u("span", {
				id: Q,
				className: "date-picker__message",
				role: "alert",
				children: v
			})
		]
	});
});
//#endregion
export { v as t };
