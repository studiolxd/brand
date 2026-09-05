import '../ProgressBar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#endregion
//#region src/stories/atoms/ProgressBar/ProgressBar.tsx
var n = Number({ "progress-bar": {
	"height-sm": {
		$value: "{spacing.2}",
		$type: "dimension",
		$description: "8px — barra compacta, sin etiqueta"
	},
	"height-md": {
		$value: "{spacing.5}",
		$type: "dimension",
		$description: "24px — barra por defecto: la etiqueta cabe dentro"
	},
	"height-lg": {
		$value: "{spacing.6}",
		$type: "dimension",
		$description: "32px — barra destacada"
	},
	"border-radius": {
		$value: "{border-radius.default}",
		$type: "dimension",
		$description: "Esquina recta, como todo el sistema"
	},
	"inside-label-threshold": {
		$value: "15",
		$type: "number",
		$description: "Porcentaje mínimo de relleno para que la cifra se escriba dentro; por debajo, fuera. Se consume también en JS (no solo CSS) para decidir la posición de la etiqueta"
	},
	"track-bg": {
		$value: "{color.surface.secondary-on-light}",
		$type: "color",
		$description: "Fondo del carril: la superficie clara secundaria del sistema (no es un estado, es una superficie)"
	},
	"transition-duration": {
		$value: "{motion.duration.base}",
		$type: "number",
		$description: "Duración del avance del relleno (cambio de estado)"
	},
	"transition-easing": {
		$value: "{motion.easing.in-out}",
		$type: "string",
		$description: "Curva del avance del relleno"
	},
	"font-family": {
		$value: "{font-family.sans}",
		$type: "string",
		$description: "Tipografía de la cifra"
	},
	"font-size": {
		$value: "{font-size.1}",
		$type: "dimension",
		$description: "14px — cuerpo de interfaz de la cifra"
	},
	"font-weight": {
		$value: "{font-weight.emphasis}",
		$type: "number",
		$description: "Peso de énfasis de la cifra"
	},
	"line-height": {
		$value: "{line-height.none}",
		$type: "number",
		$description: "Una línea: la cifra se centra con la altura del carril"
	},
	"label-gap": {
		$value: "{spacing.2}",
		$type: "dimension",
		$description: "Hueco entre el borde del relleno y la cifra cuando va fuera"
	},
	"label-padding-inline": {
		$value: "{spacing.2}",
		$type: "dimension",
		$description: "Aire de la cifra dentro del relleno"
	},
	"fill-border-width": {
		$value: "{border-width.default}",
		$type: "dimension",
		$description: "Filete de contorno del relleno. Los rellenos de marca (lavanda, amarillo, esmeralda, cayena) son claros y saturados: contra un carril claro no llegan a 3:1, y WCAG 1.4.11 admite que el contorno sea quien identifique el elemento"
	},
	"fill-border-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Color del filete del relleno: la tinta del sistema, que contrasta a la vez con el carril y con los rellenos claros"
	},
	"primary-fill": {
		$value: "{color.primary}",
		$type: "color",
		$description: "Marca primaria (prusia) — relleno"
	},
	"primary-label-inside-color": {
		$value: "{color.text.on-dark}",
		$type: "color",
		$description: "Cifra sobre el relleno prusia"
	},
	"accent-1-fill": {
		$value: "{color.accent-1}",
		$type: "color",
		$description: "Acento 1 (lavanda) — relleno"
	},
	"accent-1-label-inside-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Cifra sobre el relleno lavanda"
	},
	"accent-2-fill": {
		$value: "{color.accent-2}",
		$type: "color",
		$description: "Acento 2 (amarillo) — relleno"
	},
	"accent-2-label-inside-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Cifra sobre el relleno amarillo"
	},
	"support-1-fill": {
		$value: "{color.support-1}",
		$type: "color",
		$description: "Soporte 1 (esmeralda) — relleno"
	},
	"support-1-label-inside-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Cifra sobre el relleno esmeralda"
	},
	"support-2-fill": {
		$value: "{color.support-2}",
		$type: "color",
		$description: "Soporte 2 (cayena) — relleno"
	},
	"support-2-label-inside-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Cifra sobre el relleno cayena"
	},
	"label-outside-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Color de la cifra cuando va fuera, sobre el carril"
	},
	"surface-dark-fill-border-color": {
		$value: "{color.text.on-dark}",
		$type: "color",
		$description: "Filete del relleno — surface-dark"
	},
	"surface-dark-track-bg": {
		$value: "{color.surface.secondary-on-dark}",
		$type: "color",
		$description: "Fondo del carril — surface-dark"
	},
	"surface-dark-label-outside-color": {
		$value: "{color.text.on-dark}",
		$type: "color",
		$description: "Cifra fuera del relleno — surface-dark"
	},
	"surface-dark-primary-fill": {
		$value: "{color.text.on-dark}",
		$type: "color",
		$description: "Relleno de la variante primary — surface-dark. Se invierte en vez de pasar a lavanda porque `accent-1` ya es otra variante del mismo componente"
	},
	"surface-dark-primary-label-inside-color": {
		$value: "{color.text.on-light}",
		$type: "color",
		$description: "Cifra sobre el relleno primary — surface-dark. El relleno se invierte a blanco, así que la cifra pasa a la tinta clara: si no, quedaría blanco sobre blanco"
	}
} }["progress-bar"]["inside-label-threshold"].$value);
function r({ value: r, variant: i = "primary", size: a = "md", label: o = "Progreso", className: s }) {
	let c = Math.min(100, Math.max(0, Math.round(r))), l = a !== "sm", u = l && c >= n, d = l && !u;
	return /* @__PURE__ */ e("div", {
		className: [
			"progress-bar",
			`progress-bar--${i}`,
			`progress-bar--${a}`,
			s
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ t("div", {
			className: "progress-bar__track",
			role: "progressbar",
			"aria-valuenow": c,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuetext": `${c}%`,
			"aria-label": o,
			children: [/* @__PURE__ */ e("div", {
				className: "progress-bar__fill",
				style: { width: `${c}%` },
				children: u && /* @__PURE__ */ t("span", {
					className: "progress-bar__label progress-bar__label--inside",
					"aria-hidden": "true",
					children: [c, "%"]
				})
			}), d && /* @__PURE__ */ t("span", {
				className: "progress-bar__label progress-bar__label--outside",
				"aria-hidden": "true",
				style: { insetInlineStart: `${c}%` },
				children: [c, "%"]
			})]
		})
	});
}
//#endregion
export { r as t };
