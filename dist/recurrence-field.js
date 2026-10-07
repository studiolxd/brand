'use client';
import './recurrence-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Fieldset as t } from "./fieldset.js";
import { Toggle as n } from "./toggle.js";
import { ToggleGroup as r } from "./toggle-group.js";
import { n as i, t as a } from "./_shared/fieldshell.js";
import { SelectField as o } from "./select-field.js";
import { DatePickerField as s } from "./date-picker-field.js";
import { NumberInputField as c } from "./number-input-field.js";
import { useMemo as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/RecurrenceField/recurrenceRule.ts
var p = [
	"MO",
	"TU",
	"WE",
	"TH",
	"FR",
	"SA",
	"SU"
], m = {
	frequency: "weekly",
	interval: 1,
	weekdays: [],
	end: { type: "never" }
}, h = [
	"daily",
	"weekly",
	"monthly",
	"yearly"
], g = Date.UTC(2024, 0, 1);
function _({ value: _, onValueChange: v, id: y, legend: b, disabled: x, helperText: S, errorMessage: C, size: w, locale: T = "es-ES", weekStartsOn: E = "monday", minDate: D, maxDate: O, today: k, className: A, frequencyLabel: j, weekdaysLabel: M, endLabel: N }) {
	let P = e("recurrenceField"), F = i({
		id: y,
		errorMessage: C,
		helperText: S
	}), { id: I } = F, L = l(() => {
		let e = new Intl.DateTimeFormat(T, {
			weekday: "short",
			timeZone: "UTC"
		}), t = new Intl.DateTimeFormat(T, {
			weekday: "long",
			timeZone: "UTC"
		}), n = p.map((n, r) => {
			let i = new Date(g + r * 864e5);
			return {
				key: n,
				short: e.format(i),
				long: t.format(i)
			};
		});
		return E === "sunday" ? [n[6], ...n.slice(0, 6)] : n;
	}, [T, E]), R = (e) => {
		_ && v({
			..._,
			...e
		});
	}, z = [{
		value: "",
		label: P("never")
	}, ...h.map((e) => ({
		value: e,
		label: P(e)
	}))], B = [
		{
			value: "never",
			label: P("endNever")
		},
		{
			value: "until",
			label: P("endUntil")
		},
		{
			value: "count",
			label: P("endCount")
		}
	], V = /* @__PURE__ */ f(a, {
		field: F,
		block: "recurrence-field",
		className: A,
		rootProps: !b && F.describedBy ? {
			role: "group",
			"aria-describedby": F.describedBy
		} : void 0,
		children: [/* @__PURE__ */ d(o, {
			id: `${I}-frequency`,
			label: P("frequency", j),
			options: z,
			value: _?.frequency ?? "",
			disabled: x,
			size: w,
			onValueChange: (e) => {
				if (!e) return v(null);
				v({
					..._ ?? m,
					frequency: e
				});
			}
		}), _ ? /* @__PURE__ */ f(u, { children: [
			/* @__PURE__ */ d("div", {
				className: "recurrence-field__row",
				children: /* @__PURE__ */ d(c, {
					id: `${I}-interval`,
					className: "recurrence-field__interval",
					label: P("interval")(_.frequency),
					value: _.interval,
					min: 1,
					max: 99,
					disabled: x,
					size: w,
					onChange: (e) => R({ interval: Number.isFinite(e) ? Math.max(1, e) : 1 })
				})
			}),
			_.frequency === "weekly" ? /* @__PURE__ */ f("div", { children: [/* @__PURE__ */ d("span", {
				className: "recurrence-field__weekdays-label",
				id: `${I}-weekdays-label`,
				children: P("weekdays", M)
			}), /* @__PURE__ */ d(r, {
				className: "recurrence-field__weekdays",
				multiple: !0,
				size: w,
				value: _.weekdays,
				"aria-labelledby": `${I}-weekdays-label`,
				onValueChange: (e) => R({ weekdays: e }),
				children: L.map((e) => /* @__PURE__ */ d(n, {
					value: e.key,
					"aria-label": e.long,
					disabled: x,
					children: e.short
				}, e.key))
			})] }) : null,
			/* @__PURE__ */ f("div", {
				className: "recurrence-field__row",
				children: [
					/* @__PURE__ */ d(o, {
						id: `${I}-end`,
						className: "recurrence-field__end",
						label: P("end", N),
						options: B,
						value: _.end.type,
						disabled: x,
						size: w,
						onValueChange: (e) => {
							if (e === "until") return R({ end: {
								type: "until",
								date: null
							} });
							if (e === "count") return R({ end: {
								type: "count",
								count: 10
							} });
							R({ end: { type: "never" } });
						}
					}),
					_.end.type === "until" ? /* @__PURE__ */ d(s, {
						id: `${I}-until`,
						className: "recurrence-field__end",
						label: P("until"),
						value: _.end.date,
						locale: T,
						minDate: D,
						maxDate: O,
						today: k,
						disabled: x,
						size: w,
						onChange: (e) => R({ end: {
							type: "until",
							date: e
						} })
					}) : null,
					_.end.type === "count" ? /* @__PURE__ */ d(c, {
						id: `${I}-count`,
						className: "recurrence-field__end",
						label: P("count"),
						value: _.end.count,
						min: 1,
						max: 999,
						disabled: x,
						size: w,
						onChange: (e) => R({ end: {
							type: "count",
							count: Number.isFinite(e) ? Math.max(1, e) : 1
						} })
					}) : null
				]
			})
		] }) : null]
	});
	return b ? /* @__PURE__ */ d(t, {
		legend: b,
		disabled: x,
		"aria-describedby": F.describedBy,
		children: V
	}) : V;
}
//#endregion
export { _ as RecurrenceField };
