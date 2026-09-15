'use client';
import './calendar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { a as t, c as n, i as r, l as i, n as a, o, r as ee, s as te, t as ne } from "./_shared/calendargrid.js";
import { useCallback as s, useEffect as c, useId as l, useRef as u, useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
var m = 12, h = 4;
function g(e) {
	return Math.floor(e / m) * m;
}
function _({ value: _, onChange: re, defaultMonth: ie, month: v, onMonthChange: y, navigable: b = !0, disabledDates: x, minDate: S, maxDate: C, locale: w = "es-ES", previousMonthLabel: ae, nextMonthLabel: oe, previousYearsLabel: T, nextYearsLabel: E, yearGridLabel: D, gridLabel: O, size: k = "md", className: A }) {
	let j = e("calendar"), [se, ce] = d(() => v ?? ie ?? (_ instanceof Date ? _ : /* @__PURE__ */ new Date())), M = v ?? se, N = s((e) => {
		ce(e), y?.(e);
	}, [y]), P = /* @__PURE__ */ new Date(), le = s((e) => S && e < S || C && e > C ? !0 : Array.isArray(x) ? x.some((t) => r(t, e)) : typeof x == "function" ? x(e) : !1, [
		x,
		S,
		C
	]), F = i({
		month: M,
		onMonthChange: N,
		selected: _ ?? null,
		minDate: S,
		maxDate: C
	}), [I, L] = d("days"), [R, z] = d(() => g(M.getFullYear())), [B, V] = d(() => M.getFullYear()), H = u(null), U = u(/* @__PURE__ */ new Map()), W = u(null), ue = s(() => {
		let e = M.getFullYear();
		z(g(e)), V(e), W.current = "year", L("years");
	}, [M]), G = s(() => {
		W.current = "title", L("days");
	}, []), de = s((e) => {
		N(new Date(e, M.getMonth(), 1)), G();
	}, [
		G,
		M,
		N
	]);
	c(() => {
		if (!W.current) return;
		let e = W.current;
		W.current = null, e === "title" ? H.current?.focus() : U.current.get(B)?.focus();
	}, [I, B]);
	let fe = k === "sm" ? "xs" : k === "lg" ? "md" : "sm", pe = new Intl.DateTimeFormat(w, {
		month: "long",
		year: "numeric"
	}).format(M), me = new Intl.DateTimeFormat(w, { year: "numeric" }), K = (e) => me.format(new Date(e, 0, 1)), he = Array.from({ length: m }, (e, t) => R + t), ge = `${K(R)}–${K(R + m - 1)}`, _e = new Intl.DateTimeFormat(w, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), ve = ee(w, "narrow"), ye = ne(a(M)), q = n(M, -1), J = n(M, 1), be = S ? !t(q, S) && q < S : !1, xe = C ? !t(J, C) && J > C : !1, Se = (e) => (S ? e < S.getFullYear() : !1) || (C ? e > C.getFullYear() : !1), Ce = S ? R - 1 < S.getFullYear() : !1, we = C ? R + m > C.getFullYear() : !1, Y = I === "years", X = B >= R && B <= R + m - 1 ? B : R, Te = (e) => {
		(e < R || e > R + m - 1) && z(g(e)), W.current = "year", V(e);
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
				t = X - h;
				break;
			case "ArrowDown":
				t = X + h;
				break;
			case "Home":
				t = R;
				break;
			case "End":
				t = R + m - 1;
				break;
			case "PageUp":
				t = X - m;
				break;
			case "PageDown":
				t = X + m;
				break;
			case "Escape":
				e.preventDefault(), G();
				return;
			default: return;
		}
		e.preventDefault(), Te(t);
	}, Q = l(), $ = Y ? `${Q}-calendar-title-${R}` : `${Q}-calendar-title-${M.getFullYear()}-${M.getMonth()}`;
	return /* @__PURE__ */ p("div", {
		className: [
			"calendar",
			`calendar--${k}`,
			A
		].filter(Boolean).join(" "),
		children: [o({
			block: "calendar",
			title: Y ? ge : pe,
			titleId: $,
			navigable: b,
			previousLabel: b ? Y ? j("previousYears", T) : j("previousMonth", ae) : void 0,
			nextLabel: b ? Y ? j("nextYears", E) : j("nextMonth", oe) : void 0,
			prevDisabled: Y ? Ce : be,
			nextDisabled: Y ? we : xe,
			onPrev: Y ? () => z(R - m) : () => N(q),
			onNext: Y ? () => z(R + m) : () => N(J),
			chevronSize: fe,
			onTitleClick: Y ? G : ue,
			titleExpanded: Y,
			titleRef: H
		}), Y ? /* @__PURE__ */ f("div", {
			className: "calendar__years",
			role: "grid",
			"aria-label": j("yearGrid", D),
			onKeyDown: Z,
			children: Array.from({ length: m / h }, (e, t) => /* @__PURE__ */ f("div", {
				role: "row",
				className: "calendar__row",
				children: he.slice(t * h, t * h + h).map((e) => {
					let t = Se(e), n = e === P.getFullYear(), r = _ instanceof Date ? _.getFullYear() === e : !1;
					return /* @__PURE__ */ f("button", {
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
		}) : /* @__PURE__ */ p("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": O,
			"aria-labelledby": O ? void 0 : $,
			onKeyDown: F.onKeyDown,
			children: [te({
				block: "calendar",
				weekdays: ve
			}), ye.map((e, t) => /* @__PURE__ */ f("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: t }) => {
					let n = le(e), i = r(e, P), a = _ instanceof Date ? r(e, _) : !1, o = [
						"calendar__day",
						t && "calendar__day--outside",
						i && "calendar__day--today",
						a && "calendar__day--selected",
						n && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ f("button", {
						ref: F.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-label": _e.format(e),
						"aria-selected": a,
						"aria-disabled": n ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: F.isTabbable(e) ? 0 : -1,
						onFocus: () => F.onCellFocus(e),
						onClick: n ? void 0 : () => re?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, t))]
		})]
	});
}
//#endregion
export { _ as Calendar };
