'use client';
import './calendar.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useState as i } from "react";
//#region src/stories/molecules/Calendar/Calendar.tsx
function a(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function o(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth();
}
function s(e) {
	let t = new Date(e.getFullYear(), e.getMonth(), 1), n = t.getDay() - 1;
	n < 0 && (n = 6);
	let r = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate(), i = Math.ceil((n + r) / 7) * 7, a = [];
	for (let e = n; e > 0; e--) {
		let n = new Date(t);
		n.setDate(n.getDate() - e), a.push({
			date: n,
			outside: !0
		});
	}
	for (let t = 1; t <= r; t++) a.push({
		date: new Date(e.getFullYear(), e.getMonth(), t),
		outside: !1
	});
	let o = i - a.length, s = a[a.length - 1].date;
	for (let e = 1; e <= o; e++) {
		let t = new Date(s);
		t.setDate(t.getDate() + e), a.push({
			date: t,
			outside: !0
		});
	}
	return a;
}
function c(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 7) t.push(e.slice(n, n + 7));
	return t;
}
function l({ value: l, onChange: u, defaultMonth: d, month: f, onMonthChange: p, navigable: m = !0, disabledDates: h, minDate: g, maxDate: _, locale: v = "es-ES", previousMonthLabel: y = "Mes anterior", nextMonthLabel: b = "Mes siguiente", size: x = "md", className: S }) {
	let [C, w] = i(() => f ?? d ?? (l instanceof Date ? l : /* @__PURE__ */ new Date())), T = f ?? C, E = r((e) => {
		w(e), p?.(e);
	}, [p]), D = /* @__PURE__ */ new Date(), O = r((e) => g && e < g || _ && e > _ ? !0 : Array.isArray(h) ? h.some((t) => a(t, e)) : typeof h == "function" ? h(e) : !1, [
		h,
		g,
		_
	]), k = x === "sm" ? "xs" : x === "lg" ? "md" : "sm", A = new Intl.DateTimeFormat(v, {
		month: "long",
		year: "numeric"
	}).format(T), j = new Intl.DateTimeFormat(v, { weekday: "narrow" }), M = Array.from({ length: 7 }, (e, t) => {
		let n = new Date(2025, 0, 6 + t);
		return j.format(n);
	}), N = c(s(T)), P = new Date(T.getFullYear(), T.getMonth() - 1, 1), F = new Date(T.getFullYear(), T.getMonth() + 1, 1), I = g ? !o(P, g) && P < g : !1, L = _ ? !o(F, _) && F > _ : !1, R = `calendar-title-${T.getFullYear()}-${T.getMonth()}`;
	return /* @__PURE__ */ n("div", {
		className: [
			"calendar",
			`calendar--${x}`,
			S
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "calendar__header",
			children: [
				m && /* @__PURE__ */ t("button", {
					type: "button",
					className: "calendar__nav",
					"aria-label": y,
					disabled: I,
					onClick: () => E(P),
					children: /* @__PURE__ */ t(e, {
						name: "chevron",
						size: k,
						className: "calendar__chevron--prev"
					})
				}),
				/* @__PURE__ */ t("h2", {
					id: R,
					className: "calendar__title",
					"aria-live": "polite",
					children: A
				}),
				m && /* @__PURE__ */ t("button", {
					type: "button",
					className: "calendar__nav",
					"aria-label": b,
					disabled: L,
					onClick: () => E(F),
					children: /* @__PURE__ */ t(e, {
						name: "chevron",
						size: k
					})
				})
			]
		}), /* @__PURE__ */ n("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-labelledby": R,
			children: [/* @__PURE__ */ t("div", {
				role: "row",
				className: "calendar__row",
				children: M.map((e) => /* @__PURE__ */ t("div", {
					role: "columnheader",
					className: "calendar__weekday",
					"aria-label": e,
					children: e
				}, e))
			}), N.map((e, n) => /* @__PURE__ */ t("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: n }) => {
					let r = O(e), i = a(e, D), o = l instanceof Date ? a(e, l) : !1;
					return /* @__PURE__ */ t("button", {
						type: "button",
						role: "gridcell",
						className: [
							"calendar__day",
							n && "calendar__day--outside",
							i && "calendar__day--today",
							o && "calendar__day--selected",
							r && "calendar__day--disabled"
						].filter(Boolean).join(" "),
						"aria-selected": o,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: r ? -1 : 0,
						onClick: r ? void 0 : () => u?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, n))]
		})]
	});
}
//#endregion
export { l as Calendar };
