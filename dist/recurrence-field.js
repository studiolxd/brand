'use client';
import './recurrence-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Fieldset as t } from "./fieldset.js";
import { Toggle as n } from "./toggle.js";
import { ToggleGroup as r } from "./toggle-group.js";
import { n as i } from "./_shared/field-labels.js";
import { n as a, t as o } from "./_shared/fieldshell.js";
import { SelectField as s } from "./select-field.js";
import { DatePickerField as c } from "./date-picker-field.js";
import { NumberInputField as l } from "./number-input-field.js";
import { useMemo as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/molecules/RecurrenceField/recurrenceRule.ts
var m = [
	"MO",
	"TU",
	"WE",
	"TH",
	"FR",
	"SA",
	"SU"
], h = {
	frequency: "weekly",
	interval: 1,
	weekdays: [],
	end: { type: "never" }
}, g = [
	"daily",
	"weekly",
	"monthly",
	"yearly"
], _ = Date.UTC(2024, 0, 1);
function v({ value: v, onValueChange: y, id: b, legend: x, labelHidden: S, disabled: C, helperText: w, errorMessage: T, size: E, locale: D = "es-ES", weekStartsOn: O = "monday", minDate: k, maxDate: A, today: j, className: M, frequencyLabel: N, weekdaysLabel: P, endLabel: F }) {
	let I = e("recurrenceField"), L = i(S), R = a({
		id: b,
		errorMessage: T,
		helperText: w
	}), { id: z } = R, B = u(() => {
		let e = new Intl.DateTimeFormat(D, {
			weekday: "short",
			timeZone: "UTC"
		}), t = new Intl.DateTimeFormat(D, {
			weekday: "long",
			timeZone: "UTC"
		}), n = m.map((n, r) => {
			let i = new Date(_ + r * 864e5);
			return {
				key: n,
				short: e.format(i),
				long: t.format(i)
			};
		});
		return O === "sunday" ? [n[6], ...n.slice(0, 6)] : n;
	}, [D, O]), V = (e) => {
		v && y({
			...v,
			...e
		});
	}, H = [{
		value: "",
		label: I("never")
	}, ...g.map((e) => ({
		value: e,
		label: I(e)
	}))], U = [
		{
			value: "never",
			label: I("endNever")
		},
		{
			value: "until",
			label: I("endUntil")
		},
		{
			value: "count",
			label: I("endCount")
		}
	], W = /* @__PURE__ */ p(o, {
		field: R,
		block: "recurrence-field",
		className: M,
		rootProps: !x && R.describedBy ? {
			role: "group",
			"aria-describedby": R.describedBy
		} : void 0,
		children: [/* @__PURE__ */ f(s, {
			id: `${z}-frequency`,
			label: I("frequency", N),
			options: H,
			value: v?.frequency ?? "",
			disabled: C,
			size: E,
			onValueChange: (e) => {
				if (!e) return y(null);
				y({
					...v ?? h,
					frequency: e
				});
			}
		}), v ? /* @__PURE__ */ p(d, { children: [
			/* @__PURE__ */ f("div", {
				className: "recurrence-field__row",
				children: /* @__PURE__ */ f(l, {
					id: `${z}-interval`,
					className: "recurrence-field__interval",
					label: I("interval")(v.frequency),
					value: v.interval,
					min: 1,
					max: 99,
					disabled: C,
					size: E,
					onChange: (e) => V({ interval: Number.isFinite(e) ? Math.max(1, e) : 1 })
				})
			}),
			v.frequency === "weekly" ? /* @__PURE__ */ p("div", { children: [/* @__PURE__ */ f("span", {
				className: "recurrence-field__weekdays-label",
				id: `${z}-weekdays-label`,
				children: I("weekdays", P)
			}), /* @__PURE__ */ f(r, {
				className: "recurrence-field__weekdays",
				multiple: !0,
				size: E,
				value: v.weekdays,
				"aria-labelledby": `${z}-weekdays-label`,
				onValueChange: (e) => V({ weekdays: e }),
				children: B.map((e) => /* @__PURE__ */ f(n, {
					value: e.key,
					"aria-label": e.long,
					disabled: C,
					children: e.short
				}, e.key))
			})] }) : null,
			/* @__PURE__ */ p("div", {
				className: "recurrence-field__row",
				children: [
					/* @__PURE__ */ f(s, {
						id: `${z}-end`,
						className: "recurrence-field__end",
						label: I("end", F),
						options: U,
						value: v.end.type,
						disabled: C,
						size: E,
						onValueChange: (e) => {
							if (e === "until") return V({ end: {
								type: "until",
								date: null
							} });
							if (e === "count") return V({ end: {
								type: "count",
								count: 10
							} });
							V({ end: { type: "never" } });
						}
					}),
					v.end.type === "until" ? /* @__PURE__ */ f(c, {
						id: `${z}-until`,
						className: "recurrence-field__end",
						label: I("until"),
						value: v.end.date,
						locale: D,
						minDate: k,
						maxDate: A,
						today: j,
						disabled: C,
						size: E,
						onChange: (e) => V({ end: {
							type: "until",
							date: e
						} })
					}) : null,
					v.end.type === "count" ? /* @__PURE__ */ f(l, {
						id: `${z}-count`,
						className: "recurrence-field__end",
						label: I("count"),
						value: v.end.count,
						min: 1,
						max: 999,
						disabled: C,
						size: E,
						onChange: (e) => V({ end: {
							type: "count",
							count: Number.isFinite(e) ? Math.max(1, e) : 1
						} })
					}) : null
				]
			})
		] }) : null]
	});
	return x ? /* @__PURE__ */ f(t, {
		legend: x,
		legendHidden: L,
		disabled: C,
		"aria-describedby": R.describedBy,
		children: W
	}) : W;
}
//#endregion
export { v as RecurrenceField };
