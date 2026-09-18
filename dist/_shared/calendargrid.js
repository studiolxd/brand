import { Icon as e } from "../icon.js";
import { useCallback as t, useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/_shared/calendarGrid.tsx
function c(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function l(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth();
}
function u(e, t) {
	return new Date(e.getFullYear(), e.getMonth() + t, 1);
}
function d(e) {
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
function f(e) {
	let t = (e.getDay() + 6) % 7;
	return new Date(e.getFullYear(), e.getMonth(), e.getDate() - t);
}
function p(e, t) {
	let n = f(e);
	return new Date(n.getFullYear(), n.getMonth(), n.getDate() + t * 7);
}
function m(e, t) {
	let n = f(e);
	return Array.from({ length: 7 }, (e, r) => {
		let i = new Date(n.getFullYear(), n.getMonth(), n.getDate() + r);
		return {
			date: i,
			outside: t ? !l(i, t) : !1
		};
	});
}
function h(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 7) t.push(e.slice(n, n + 7));
	return t;
}
function g(e, t = "narrow") {
	let n = new Intl.DateTimeFormat(e, { weekday: t }), r = new Intl.DateTimeFormat(e, { weekday: "long" });
	return Array.from({ length: 7 }, (e, t) => {
		let i = new Date(2025, 0, 6 + t);
		return {
			short: n.format(i),
			long: r.format(i)
		};
	});
}
function _({ block: e, rowModifier: t, weekdays: n }) {
	return /* @__PURE__ */ o("div", {
		role: "row",
		className: [`${e}__row`, t && `${e}__row--${t}`].filter(Boolean).join(" "),
		children: n.map(({ short: t, long: n }) => /* @__PURE__ */ o("div", {
			role: "columnheader",
			className: `${e}__weekday`,
			"aria-label": n,
			children: /* @__PURE__ */ o("abbr", {
				title: n,
				children: t
			})
		}, n))
	});
}
function v({ block: t, title: n, titleId: r, navigable: i = !0, previousLabel: a, nextLabel: c, prevDisabled: l = !1, nextDisabled: u = !1, onPrev: d, onNext: f, chevronSize: p, onTitleClick: m, titleExpanded: h, titleRef: g, children: _ }) {
	return /* @__PURE__ */ s("div", {
		className: `${t}__header`,
		children: [
			i && /* @__PURE__ */ o("button", {
				type: "button",
				className: `${t}__nav`,
				"aria-label": a,
				disabled: l,
				onClick: d,
				children: /* @__PURE__ */ o(e, {
					name: "chevron",
					size: p,
					className: `${t}__chevron--prev`
				})
			}),
			/* @__PURE__ */ o("h2", {
				id: r,
				className: `${t}__title`,
				"aria-live": "polite",
				children: m ? /* @__PURE__ */ o("button", {
					type: "button",
					ref: g,
					className: `${t}__title-button`,
					"aria-expanded": h,
					onClick: m,
					children: n
				}) : n
			}),
			i && /* @__PURE__ */ o("button", {
				type: "button",
				className: `${t}__nav`,
				"aria-label": c,
				disabled: u,
				onClick: f,
				children: /* @__PURE__ */ o(e, {
					name: "chevron",
					size: p
				})
			}),
			_
		]
	});
}
function y(e, t, n) {
	return t && e < t ? t : n && e > n ? n : e;
}
function b(e, t) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
}
function x(e, t) {
	let n = new Date(e.getFullYear(), e.getMonth() + t, 1), r = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
	return new Date(n.getFullYear(), n.getMonth(), Math.min(e.getDate(), r));
}
function S(e) {
	return `${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`;
}
function C({ month: e, onMonthChange: o, selected: s, onActivate: u, minDate: d, maxDate: f }) {
	let [p, m] = a(() => s ?? /* @__PURE__ */ new Date()), h = i(/* @__PURE__ */ new Map()), g = i(!1), _ = r(() => {
		if (l(p, e)) return p;
		if (s && l(s, e)) return s;
		let t = /* @__PURE__ */ new Date();
		return l(t, e) ? t : new Date(e.getFullYear(), e.getMonth(), 1);
	}, [
		p,
		e,
		s
	]);
	n(() => {
		g.current && (g.current = !1, h.current.get(S(_))?.focus());
	}, [_]);
	let v = t((t) => {
		let n = y(t, d, f);
		g.current = !0, m(n), l(n, e) || o(new Date(n.getFullYear(), n.getMonth(), 1));
	}, [
		f,
		d,
		e,
		o
	]), C = t((e) => {
		let t = _, n = null;
		switch (e.key) {
			case "ArrowLeft":
				n = b(t, -1);
				break;
			case "ArrowRight":
				n = b(t, 1);
				break;
			case "ArrowUp":
				n = b(t, -7);
				break;
			case "ArrowDown":
				n = b(t, 7);
				break;
			case "Home":
				n = b(t, -((t.getDay() + 6) % 7));
				break;
			case "End":
				n = b(t, 6 - (t.getDay() + 6) % 7);
				break;
			case "PageUp":
				n = x(t, e.shiftKey ? -12 : -1);
				break;
			case "PageDown":
				n = x(t, e.shiftKey ? 12 : 1);
				break;
			case "Enter":
			case " ":
				u && (e.preventDefault(), u(t));
				return;
			default: return;
		}
		e.preventDefault(), v(n);
	}, [
		_,
		v,
		u
	]), w = t((e) => (t) => {
		let n = S(e);
		t ? h.current.set(n, t) : h.current.delete(n);
	}, []);
	return {
		activeDate: _,
		isTabbable: t((e) => c(e, _), [_]),
		cellRef: w,
		onKeyDown: C,
		onCellFocus: t((e) => m(e), [])
	};
}
function w({ weekStart: e, onWeekChange: o, onActivate: s, minDate: l, maxDate: u }) {
	let [d, p] = a(() => /* @__PURE__ */ new Date()), m = i(/* @__PURE__ */ new Map()), h = i(!1), g = r(() => f(e), [e]), _ = r(() => {
		if (c(f(d), g)) return d;
		let e = /* @__PURE__ */ new Date();
		return c(f(e), g) ? e : g;
	}, [d, g]);
	n(() => {
		h.current && (h.current = !1, m.current.get(S(_))?.focus());
	}, [_]);
	let v = t((e) => {
		let t = y(e, l, u);
		h.current = !0, p(t), c(f(t), g) || o(f(t));
	}, [
		u,
		l,
		o,
		g
	]), x = t((e) => {
		let t = _, n = null;
		switch (e.key) {
			case "ArrowLeft":
			case "ArrowUp":
				n = b(t, -1);
				break;
			case "ArrowRight":
			case "ArrowDown":
				n = b(t, 1);
				break;
			case "Home":
				n = f(t);
				break;
			case "End":
				n = b(f(t), 6);
				break;
			case "PageUp":
				n = b(t, -7);
				break;
			case "PageDown":
				n = b(t, 7);
				break;
			case "Enter":
			case " ":
				s && (e.preventDefault(), s(t));
				return;
			default: return;
		}
		e.preventDefault(), v(n);
	}, [
		_,
		v,
		s
	]), C = t((e) => (t) => {
		let n = S(e);
		t ? m.current.set(n, t) : m.current.delete(n);
	}, []);
	return {
		activeDate: _,
		isTabbable: t((e) => c(e, _), [_]),
		cellRef: C,
		onKeyDown: x,
		onCellFocus: t((e) => p(e), [])
	};
}
//#endregion
export { c as a, _ as c, f as d, C as f, g as i, u as l, d as n, l as o, w as p, m as r, v as s, h as t, p as u };
