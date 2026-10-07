'use client';
import './calendar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { a as t, c as n, h as r, l as i, n as a, o, p as ee, r as te, s, t as c, u as l } from "./_shared/calendar.js";
import { useCallback as u, useEffect as ne, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
var g = 12, _ = 4;
function v(e) {
	return Math.floor(e / g) * g;
}
function y({ value: y, onChange: re, defaultMonth: ie, month: b, onMonthChange: x, navigable: S = !0, disabledDates: C, minDate: w, maxDate: T, locale: E = "es-ES", previousMonthLabel: D, nextMonthLabel: ae, previousYearsLabel: oe, nextYearsLabel: se, yearGridLabel: ce, gridLabel: O, today: le, size: k = "md", className: ue }) {
	let A = e("calendar", c), j = r(le), [de, M] = p(() => b ?? ie ?? (y instanceof Date ? y : j)), N = b ?? de, P = u((e) => {
		M(e), x?.(e);
	}, [x]), fe = u((e) => w && e < w || T && e > T ? !0 : Array.isArray(C) ? C.some((t) => o(t, e)) : typeof C == "function" ? C(e) : !1, [
		C,
		w,
		T
	]), F = ee({
		month: N,
		onMonthChange: P,
		selected: y ?? null,
		today: j,
		minDate: w,
		maxDate: T
	}), [I, L] = p("days"), [R, z] = p(() => v(N.getFullYear())), [B, V] = p(() => N.getFullYear()), H = f(null), U = f(/* @__PURE__ */ new Map()), W = f(null), pe = u(() => {
		let e = N.getFullYear();
		z(v(e)), V(e), W.current = "year", L("years");
	}, [N]), G = u(() => {
		W.current = "title", L("days");
	}, []), me = u((e) => {
		P(new Date(e, N.getMonth(), 1)), G();
	}, [
		G,
		N,
		P
	]);
	ne(() => {
		if (!W.current) return;
		let e = W.current;
		W.current = null, e === "title" ? H.current?.focus() : U.current.get(B)?.focus();
	}, [I, B]);
	let he = k === "lg" ? "md" : "sm", ge = new Intl.DateTimeFormat(E, {
		month: "long",
		year: "numeric"
	}).format(N), _e = new Intl.DateTimeFormat(E, { year: "numeric" }), K = (e) => _e.format(new Date(e, 0, 1)), ve = Array.from({ length: g }, (e, t) => R + t), ye = `${K(R)}–${K(R + g - 1)}`, be = new Intl.DateTimeFormat(E, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), xe = t(E, "narrow"), Se = a(te(N)), q = l(N, -1), J = l(N, 1), Y = w ? !s(q, w) && q < w : !1, Ce = T ? !s(J, T) && J > T : !1, we = (e) => (w ? e < w.getFullYear() : !1) || (T ? e > T.getFullYear() : !1), Te = w ? R - 1 < w.getFullYear() : !1, Ee = T ? R + g > T.getFullYear() : !1, X = I === "years", Z = B >= R && B <= R + g - 1 ? B : R, De = (e) => {
		(e < R || e > R + g - 1) && z(v(e)), W.current = "year", V(e);
	}, Oe = (e) => {
		let t = null;
		switch (e.key) {
			case "ArrowLeft":
				t = Z - 1;
				break;
			case "ArrowRight":
				t = Z + 1;
				break;
			case "ArrowUp":
				t = Z - _;
				break;
			case "ArrowDown":
				t = Z + _;
				break;
			case "Home":
				t = R;
				break;
			case "End":
				t = R + g - 1;
				break;
			case "PageUp":
				t = Z - g;
				break;
			case "PageDown":
				t = Z + g;
				break;
			case "Escape":
				e.preventDefault(), G();
				return;
			default: return;
		}
		e.preventDefault(), De(t);
	}, Q = d(), $ = X ? `${Q}-calendar-title-${R}` : `${Q}-calendar-title-${N.getFullYear()}-${N.getMonth()}`;
	return /* @__PURE__ */ h("div", {
		className: [
			"calendar",
			`calendar--${k}`,
			ue
		].filter(Boolean).join(" "),
		children: [n({
			block: "calendar",
			title: X ? ye : ge,
			titleId: $,
			navigable: S,
			previousLabel: S ? X ? A("previousYears", oe) : A("previousMonth", D) : void 0,
			nextLabel: S ? X ? A("nextYears", se) : A("nextMonth", ae) : void 0,
			prevDisabled: X ? Te : Y,
			nextDisabled: X ? Ee : Ce,
			onPrev: X ? () => z(R - g) : () => P(q),
			onNext: X ? () => z(R + g) : () => P(J),
			chevronSize: he,
			onTitleClick: X ? G : pe,
			titleExpanded: X,
			titleRef: H
		}), X ? /* @__PURE__ */ m("div", {
			className: "calendar__years",
			role: "grid",
			"aria-label": A("yearGrid", ce),
			onKeyDown: Oe,
			children: Array.from({ length: g / _ }, (e, t) => /* @__PURE__ */ m("div", {
				role: "row",
				className: "calendar__row",
				children: ve.slice(t * _, t * _ + _).map((e) => {
					let t = we(e), n = e === j.getFullYear(), r = y instanceof Date ? y.getFullYear() === e : !1;
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
						tabIndex: e === Z ? 0 : -1,
						onFocus: () => V(e),
						onClick: t ? void 0 : () => me(e),
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
			children: [i({
				block: "calendar",
				weekdays: xe
			}), Se.map((e, t) => /* @__PURE__ */ m("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: t }) => {
					let n = fe(e), r = o(e, j), i = y instanceof Date ? o(e, y) : !1, a = [
						"calendar__day",
						t && "calendar__day--outside",
						r && "calendar__day--today",
						i && "calendar__day--selected",
						n && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ m("button", {
						ref: F.cellRef(e),
						type: "button",
						role: "gridcell",
						className: a,
						"aria-label": be.format(e),
						"aria-selected": i,
						"aria-disabled": n ? "true" : void 0,
						"aria-current": r ? "date" : void 0,
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
export { y as Calendar };
