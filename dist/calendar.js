'use client';
import './calendar.css';
import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c } from "./_shared/calendarGrid.js";
import { useCallback as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
function p({ value: p, onChange: m, defaultMonth: h, month: g, onMonthChange: _, navigable: v = !0, disabledDates: y, minDate: b, maxDate: x, locale: S = "es-ES", previousMonthLabel: C = "Mes anterior", nextMonthLabel: w = "Mes siguiente", gridLabel: T, size: E = "md", className: D }) {
	let [O, k] = u(() => g ?? h ?? (p instanceof Date ? p : /* @__PURE__ */ new Date())), A = g ?? O, j = l((e) => {
		k(e), _?.(e);
	}, [_]), M = /* @__PURE__ */ new Date(), N = l((e) => b && e < b || x && e > x ? !0 : Array.isArray(y) ? y.some((t) => n(t, e)) : typeof y == "function" ? y(e) : !1, [
		y,
		b,
		x
	]), P = r({
		month: A,
		onMonthChange: j,
		selected: p ?? null,
		minDate: b,
		maxDate: x
	}), F = E === "sm" ? "xs" : E === "lg" ? "md" : "sm", I = new Intl.DateTimeFormat(S, {
		month: "long",
		year: "numeric"
	}).format(A), L = o(S, "narrow"), R = c(i(A)), z = t(A, -1), B = t(A, 1), V = b ? !e(z, b) && z < b : !1, H = x ? !e(B, x) && B > x : !1, U = `calendar-title-${A.getFullYear()}-${A.getMonth()}`;
	return /* @__PURE__ */ f("div", {
		className: [
			"calendar",
			`calendar--${E}`,
			D
		].filter(Boolean).join(" "),
		children: [a({
			block: "calendar",
			title: I,
			titleId: U,
			navigable: v,
			previousMonthLabel: C,
			nextMonthLabel: w,
			prevDisabled: V,
			nextDisabled: H,
			onPrev: () => j(z),
			onNext: () => j(B),
			chevronSize: F
		}), /* @__PURE__ */ f("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": T,
			"aria-labelledby": T ? void 0 : U,
			onKeyDown: P.onKeyDown,
			children: [s({
				block: "calendar",
				weekdays: L
			}), R.map((e, t) => /* @__PURE__ */ d("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: t }) => {
					let r = N(e), i = n(e, M), a = p instanceof Date ? n(e, p) : !1, o = [
						"calendar__day",
						t && "calendar__day--outside",
						i && "calendar__day--today",
						a && "calendar__day--selected",
						r && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ d("button", {
						ref: P.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-selected": a,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: P.isTabbable(e) ? 0 : -1,
						onFocus: () => P.onCellFocus(e),
						onClick: r ? void 0 : () => m?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, t))]
		})]
	});
}
//#endregion
export { p as Calendar };
