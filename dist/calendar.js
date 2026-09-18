'use client';
import './calendar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { a as t, c as n, f as r, i, l as a, n as o, o as s, s as c, t as ee } from "./_shared/calendargrid.js";
import { useCallback as l, useEffect as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
var g = 12, _ = 4;
function v(e) {
	return Math.floor(e / g) * g;
}
function y({ value: y, onChange: te, defaultMonth: ne, month: b, onMonthChange: x, navigable: S = !0, disabledDates: C, minDate: w, maxDate: T, locale: E = "es-ES", previousMonthLabel: re, nextMonthLabel: ie, previousYearsLabel: ae, nextYearsLabel: oe, yearGridLabel: D, gridLabel: O, size: k = "md", className: A }) {
	let j = e("calendar"), [se, ce] = p(() => b ?? ne ?? (y instanceof Date ? y : /* @__PURE__ */ new Date())), M = b ?? se, N = l((e) => {
		ce(e), x?.(e);
	}, [x]), P = /* @__PURE__ */ new Date(), le = l((e) => w && e < w || T && e > T ? !0 : Array.isArray(C) ? C.some((n) => t(n, e)) : typeof C == "function" ? C(e) : !1, [
		C,
		w,
		T
	]), F = r({
		month: M,
		onMonthChange: N,
		selected: y ?? null,
		minDate: w,
		maxDate: T
	}), [I, L] = p("days"), [R, z] = p(() => v(M.getFullYear())), [B, V] = p(() => M.getFullYear()), H = f(null), U = f(/* @__PURE__ */ new Map()), W = f(null), ue = l(() => {
		let e = M.getFullYear();
		z(v(e)), V(e), W.current = "year", L("years");
	}, [M]), G = l(() => {
		W.current = "title", L("days");
	}, []), de = l((e) => {
		N(new Date(e, M.getMonth(), 1)), G();
	}, [
		G,
		M,
		N
	]);
	u(() => {
		if (!W.current) return;
		let e = W.current;
		W.current = null, e === "title" ? H.current?.focus() : U.current.get(B)?.focus();
	}, [I, B]);
	let fe = k === "sm" ? "xs" : k === "lg" ? "md" : "sm", pe = new Intl.DateTimeFormat(E, {
		month: "long",
		year: "numeric"
	}).format(M), me = new Intl.DateTimeFormat(E, { year: "numeric" }), K = (e) => me.format(new Date(e, 0, 1)), he = Array.from({ length: g }, (e, t) => R + t), ge = `${K(R)}–${K(R + g - 1)}`, _e = new Intl.DateTimeFormat(E, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), ve = i(E, "narrow"), ye = ee(o(M)), q = a(M, -1), J = a(M, 1), be = w ? !s(q, w) && q < w : !1, xe = T ? !s(J, T) && J > T : !1, Se = (e) => (w ? e < w.getFullYear() : !1) || (T ? e > T.getFullYear() : !1), Ce = w ? R - 1 < w.getFullYear() : !1, we = T ? R + g > T.getFullYear() : !1, Y = I === "years", X = B >= R && B <= R + g - 1 ? B : R, Te = (e) => {
		(e < R || e > R + g - 1) && z(v(e)), W.current = "year", V(e);
	}, Z = (e) => {
		let t = null;
		switch (e.key) {
			case "ArrowLeft":
				t = X - 1;
				break;
			case "ArrowRight":
				t = X + 1;
				break;
			case "ArrowUp":
				t = X - _;
				break;
			case "ArrowDown":
				t = X + _;
				break;
			case "Home":
				t = R;
				break;
			case "End":
				t = R + g - 1;
				break;
			case "PageUp":
				t = X - g;
				break;
			case "PageDown":
				t = X + g;
				break;
			case "Escape":
				e.preventDefault(), G();
				return;
			default: return;
		}
		e.preventDefault(), Te(t);
	}, Q = d(), $ = Y ? `${Q}-calendar-title-${R}` : `${Q}-calendar-title-${M.getFullYear()}-${M.getMonth()}`;
	return /* @__PURE__ */ h("div", {
		className: [
			"calendar",
			`calendar--${k}`,
			A
		].filter(Boolean).join(" "),
		children: [c({
			block: "calendar",
			title: Y ? ge : pe,
			titleId: $,
			navigable: S,
			previousLabel: S ? Y ? j("previousYears", ae) : j("previousMonth", re) : void 0,
			nextLabel: S ? Y ? j("nextYears", oe) : j("nextMonth", ie) : void 0,
			prevDisabled: Y ? Ce : be,
			nextDisabled: Y ? we : xe,
			onPrev: Y ? () => z(R - g) : () => N(q),
			onNext: Y ? () => z(R + g) : () => N(J),
			chevronSize: fe,
			onTitleClick: Y ? G : ue,
			titleExpanded: Y,
			titleRef: H
		}), Y ? /* @__PURE__ */ m("div", {
			className: "calendar__years",
			role: "grid",
			"aria-label": j("yearGrid", D),
			onKeyDown: Z,
			children: Array.from({ length: g / _ }, (e, t) => /* @__PURE__ */ m("div", {
				role: "row",
				className: "calendar__row",
				children: he.slice(t * _, t * _ + _).map((e) => {
					let t = Se(e), n = e === P.getFullYear(), r = y instanceof Date ? y.getFullYear() === e : !1;
					return /* @__PURE__ */ m("button", {
						ref: (t) => {
							t ? U.current.set(e, t) : U.current.delete(e);
						},
						type: "button",
						role: "gridcell",
						className: [
							"calendar__year",
							n && "calendar__year--current",
							r && "calendar__year--selected",
							t && "calendar__year--disabled"
						].filter(Boolean).join(" "),
						"aria-selected": r,
						"aria-disabled": t ? "true" : void 0,
						"aria-current": n ? "date" : void 0,
						tabIndex: e === X ? 0 : -1,
						onFocus: () => V(e),
						onClick: t ? void 0 : () => de(e),
						children: K(e)
					}, e);
				})
			}, t))
		}) : /* @__PURE__ */ h("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": O,
			"aria-labelledby": O ? void 0 : $,
			onKeyDown: F.onKeyDown,
			children: [n({
				block: "calendar",
				weekdays: ve
			}), ye.map((e, n) => /* @__PURE__ */ m("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: n }) => {
					let r = le(e), i = t(e, P), a = y instanceof Date ? t(e, y) : !1, o = [
						"calendar__day",
						n && "calendar__day--outside",
						i && "calendar__day--today",
						a && "calendar__day--selected",
						r && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ m("button", {
						ref: F.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-label": _e.format(e),
						"aria-selected": a,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: F.isTabbable(e) ? 0 : -1,
						onFocus: () => F.onCellFocus(e),
						onClick: r ? void 0 : () => te?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, n))]
		})]
	});
}
//#endregion
export { y as Calendar };
