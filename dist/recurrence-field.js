'use client';
import './recurrence-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Fieldset as t } from "./fieldset.js";
import { Toggle as n } from "./toggle.js";
import { ToggleGroup as r } from "./toggle-group.js";
import { SelectField as i } from "./select-field.js";
import { DatePickerField as a } from "./date-picker-field.js";
import { NumberInputField as o } from "./number-input-field.js";
import { useId as s, useMemo as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/RecurrenceField/recurrenceRule.ts
var f = [
	"MO",
	"TU",
	"WE",
	"TH",
	"FR",
	"SA",
	"SU"
], p = {
	frequency: "weekly",
	interval: 1,
	weekdays: [],
	end: { type: "never" }
}, m = [
	"daily",
	"weekly",
	"monthly",
	"yearly"
], h = Date.UTC(2024, 0, 1);
function g({ value: g, onValueChange: _, id: v, legend: y, disabled: b, size: x, locale: S = "es-ES", weekStartsOn: C = "monday", minDate: w, maxDate: T, today: E, className: D, frequencyLabel: O, weekdaysLabel: k, endLabel: A }) {
	let j = e("recurrenceField"), M = s(), N = v ?? M, P = c(() => {
		let e = new Intl.DateTimeFormat(S, {
			weekday: "short",
			timeZone: "UTC"
		}), t = new Intl.DateTimeFormat(S, {
			weekday: "long",
			timeZone: "UTC"
		}), n = f.map((n, r) => {
			let i = new Date(h + r * 864e5);
			return {
				key: n,
				short: e.format(i),
				long: t.format(i)
			};
		});
		return C === "sunday" ? [n[6], ...n.slice(0, 6)] : n;
	}, [S, C]), F = (e) => {
		g && _({
			...g,
			...e
		});
	}, I = [{
		value: "",
		label: j("never")
	}, ...m.map((e) => ({
		value: e,
		label: j(e)
	}))], L = [
		{
			value: "never",
			label: j("endNever")
		},
		{
			value: "until",
			label: j("endUntil")
		},
		{
			value: "count",
			label: j("endCount")
		}
	], R = /* @__PURE__ */ d("div", {
		className: ["recurrence-field", D].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ u(i, {
			id: `${N}-frequency`,
			label: j("frequency", O),
			options: I,
			value: g?.frequency ?? "",
			disabled: b,
			size: x,
			onValueChange: (e) => {
				if (!e) return _(null);
				_({
					...g ?? p,
					frequency: e
				});
			}
		}), g ? /* @__PURE__ */ d(l, { children: [
			/* @__PURE__ */ u("div", {
				className: "recurrence-field__row",
				children: /* @__PURE__ */ u(o, {
					id: `${N}-interval`,
					className: "recurrence-field__interval",
					label: j("interval")(g.frequency),
					value: g.interval,
					min: 1,
					max: 99,
					disabled: b,
					size: x,
					onChange: (e) => F({ interval: Number.isFinite(e) ? Math.max(1, e) : 1 })
				})
			}),
			g.frequency === "weekly" ? /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("span", {
				className: "recurrence-field__weekdays-label",
				id: `${N}-weekdays-label`,
				children: j("weekdays", k)
			}), /* @__PURE__ */ u(r, {
				className: "recurrence-field__weekdays",
				multiple: !0,
				size: x,
				value: g.weekdays,
				"aria-labelledby": `${N}-weekdays-label`,
				onValueChange: (e) => F({ weekdays: e }),
				children: P.map((e) => /* @__PURE__ */ u(n, {
					value: e.key,
					"aria-label": e.long,
					disabled: b,
					children: e.short
				}, e.key))
			})] }) : null,
			/* @__PURE__ */ d("div", {
				className: "recurrence-field__row",
				children: [
					/* @__PURE__ */ u(i, {
						id: `${N}-end`,
						className: "recurrence-field__end",
						label: j("end", A),
						options: L,
						value: g.end.type,
						disabled: b,
						size: x,
						onValueChange: (e) => {
							if (e === "until") return F({ end: {
								type: "until",
								date: null
							} });
							if (e === "count") return F({ end: {
								type: "count",
								count: 10
							} });
							F({ end: { type: "never" } });
						}
					}),
					g.end.type === "until" ? /* @__PURE__ */ u(a, {
						id: `${N}-until`,
						className: "recurrence-field__end",
						label: j("until"),
						value: g.end.date,
						locale: S,
						minDate: w,
						maxDate: T,
						today: E,
						disabled: b,
						size: x,
						onChange: (e) => F({ end: {
							type: "until",
							date: e
						} })
					}) : null,
					g.end.type === "count" ? /* @__PURE__ */ u(o, {
						id: `${N}-count`,
						className: "recurrence-field__end",
						label: j("count"),
						value: g.end.count,
						min: 1,
						max: 999,
						disabled: b,
						size: x,
						onChange: (e) => F({ end: {
							type: "count",
							count: Number.isFinite(e) ? Math.max(1, e) : 1
						} })
					}) : null
				]
			})
		] }) : null]
	});
	return y ? /* @__PURE__ */ u(t, {
		legend: y,
		disabled: b,
		children: R
	}) : R;
}
//#endregion
export { g as RecurrenceField };
