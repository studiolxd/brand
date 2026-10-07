import '../datepicker.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Input as n } from "../input.js";
import { t as r } from "./assign-ref.js";
import { Popover as i } from "../popover.js";
import { Calendar as a } from "../calendar.js";
import { forwardRef as o, useCallback as s, useId as c, useMemo as ee, useRef as l, useState as u } from "react";
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
var v = o(function({ value: o, onChange: p, placeholder: m, maskLetters: h, invalidMessage: v, openCalendarLabel: te, minDate: y, maxDate: b, disabledDates: x, size: S = "md", disabled: C, readOnly: w, required: T, error: ne = !1, locale: E = "es-ES", id: re, name: D, describedBy: ie, "aria-describedby": ae, "aria-label": oe, calendarLabel: se, previousMonthLabel: O, nextMonthLabel: k, previousYearsLabel: A, nextYearsLabel: j, yearGridLabel: M, gridLabel: N, today: P, onBlur: F, className: I }, L) {
	let R = e("datePicker"), [z, B] = u(!1), V = ee(() => g(E), [E]), H = o instanceof Date ? V.format(o) : "", [U, W] = u(H), [G, K] = u(H);
	H !== G && (K(H), W(H));
	let q = l(null), ce = s((e) => {
		q.current = e, r(L, e);
	}, [L]), J = U.trim(), Y = J ? V.parse(U) : null, X = J !== "" && !Y, Z = ne || X, Q = `${c()}-date-picker-invalid`, le = [ie ?? ae, X ? Q : void 0].filter(Boolean).join(" ") || void 0, ue = s((e) => {
		(w || C) && e || B(e);
	}, [C, w]), de = s((e) => {
		let t = e.target.value;
		if (W(t), t.trim() === "") {
			p?.(null);
			return;
		}
		let n = V.parse(t);
		n && p?.(n);
	}, [V, p]), fe = s((e) => {
		if (e.key === "ArrowDown" && !w && !C) {
			e.preventDefault(), B(!0);
			return;
		}
		e.key === "Escape" && z && (e.preventDefault(), B(!1));
	}, [
		C,
		z,
		w
	]), pe = s((e) => {
		W(V.format(e)), p?.(e), B(!1), requestAnimationFrame(() => q.current?.focus());
	}, [V, p]), me = /* @__PURE__ */ d("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": R("openCalendar", te),
		"aria-haspopup": "dialog",
		"aria-expanded": z,
		disabled: C,
		tabIndex: w ? -1 : void 0,
		children: /* @__PURE__ */ d(t, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	}), $ = R("calendar", se);
	return /* @__PURE__ */ f("div", {
		className: [
			"date-picker",
			S === "md" ? "" : `date-picker--${S}`,
			I ?? ""
		].filter(Boolean).join(" "),
		children: [
			D && /* @__PURE__ */ d("input", {
				type: "hidden",
				name: D,
				value: o instanceof Date ? _(o) : ""
			}),
			/* @__PURE__ */ f("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ d(n, {
					ref: ce,
					id: re,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: S,
					error: Z,
					value: U,
					placeholder: m ?? V.mask(R("maskLetters", h)),
					disabled: C,
					readOnly: w,
					required: T,
					"aria-label": oe,
					"aria-describedby": le,
					onChange: de,
					onKeyDown: fe,
					onBlur: F
				}), /* @__PURE__ */ d(i, {
					trigger: me,
					label: $,
					open: z,
					onOpenChange: ue,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ d(a, {
						value: Y ?? o ?? null,
						onChange: pe,
						gridLabel: N ?? $,
						previousMonthLabel: O,
						nextMonthLabel: k,
						previousYearsLabel: A,
						nextYearsLabel: j,
						yearGridLabel: M,
						today: P,
						minDate: y,
						maxDate: b,
						disabledDates: x,
						locale: E,
						size: S
					})
				})]
			}),
			X && /* @__PURE__ */ d("span", {
				id: Q,
				className: "date-picker__message",
				role: "alert",
				children: R("invalid", v)
			})
		]
	});
});
//#endregion
export { v as t };
