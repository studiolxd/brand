import '../datepicker.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Input as n } from "../input.js";
import { t as r } from "./assign-ref.js";
import { Popover as i } from "../popover.js";
import { Calendar as a } from "../calendar.js";
import { forwardRef as o, useCallback as s, useId as c, useMemo as l, useRef as ee, useState as u } from "react";
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
var v = o(function({ value: o, onChange: p, placeholder: m, maskLetters: h, invalidMessage: v, openCalendarLabel: y, minDate: b, maxDate: x, disabledDates: te, size: S = "md", disabled: C, readOnly: w, error: T = !1, locale: E = "es-ES", id: D, name: O, describedBy: k, "aria-describedby": ne, "aria-label": re, calendarLabel: ie, previousMonthLabel: ae, nextMonthLabel: A, previousYearsLabel: j, nextYearsLabel: M, yearGridLabel: N, gridLabel: P, today: F, onBlur: I, className: L }, R) {
	let z = e("datePicker"), [B, V] = u(!1), H = l(() => g(E), [E]), U = o instanceof Date ? H.format(o) : "", [W, G] = u(U), [K, q] = u(U);
	U !== K && (q(U), G(U));
	let J = ee(null), oe = s((e) => {
		J.current = e, r(R, e);
	}, [R]), Y = W.trim(), X = Y ? H.parse(W) : null, Z = Y !== "" && !X, se = T || Z, Q = `${c()}-date-picker-invalid`, ce = [k ?? ne, Z ? Q : void 0].filter(Boolean).join(" ") || void 0, le = s((e) => {
		(w || C) && e || V(e);
	}, [C, w]), ue = s((e) => {
		let t = e.target.value;
		if (G(t), t.trim() === "") {
			p?.(null);
			return;
		}
		let n = H.parse(t);
		n && p?.(n);
	}, [H, p]), de = s((e) => {
		if (e.key === "ArrowDown" && !w && !C) {
			e.preventDefault(), V(!0);
			return;
		}
		e.key === "Escape" && B && (e.preventDefault(), V(!1));
	}, [
		C,
		B,
		w
	]), fe = s((e) => {
		G(H.format(e)), p?.(e), V(!1), requestAnimationFrame(() => J.current?.focus());
	}, [H, p]), pe = /* @__PURE__ */ d("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": z("openCalendar", y),
		"aria-haspopup": "dialog",
		"aria-expanded": B,
		disabled: C,
		tabIndex: w ? -1 : void 0,
		children: /* @__PURE__ */ d(t, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	}), $ = z("calendar", ie);
	return /* @__PURE__ */ f("div", {
		className: [
			"date-picker",
			S === "md" ? "" : `date-picker--${S}`,
			L ?? ""
		].filter(Boolean).join(" "),
		children: [
			O && /* @__PURE__ */ d("input", {
				type: "hidden",
				name: O,
				value: o instanceof Date ? _(o) : ""
			}),
			/* @__PURE__ */ f("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ d(n, {
					ref: oe,
					id: D,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: S,
					error: se,
					value: W,
					placeholder: m ?? H.mask(z("maskLetters", h)),
					disabled: C,
					readOnly: w,
					"aria-label": re,
					"aria-describedby": ce,
					onChange: ue,
					onKeyDown: de,
					onBlur: I
				}), /* @__PURE__ */ d(i, {
					trigger: pe,
					label: $,
					open: B,
					onOpenChange: le,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ d(a, {
						value: X ?? o ?? null,
						onChange: fe,
						gridLabel: P ?? $,
						previousMonthLabel: ae,
						nextMonthLabel: A,
						previousYearsLabel: j,
						nextYearsLabel: M,
						yearGridLabel: N,
						today: F,
						minDate: b,
						maxDate: x,
						disabledDates: te,
						locale: E,
						size: S
					})
				})]
			}),
			Z && /* @__PURE__ */ d("span", {
				id: Q,
				className: "date-picker__message",
				role: "alert",
				children: z("invalid", v)
			})
		]
	});
});
//#endregion
export { v as t };
