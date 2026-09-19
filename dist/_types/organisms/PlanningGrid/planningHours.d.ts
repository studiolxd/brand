/**
 * Leer unas horas escritas a mano, aparte del componente para poder probarlo
 * sin montar nada.
 */
/**
 * Las horas que dice un texto. Admite **coma y punto** decimal —en castellano
 * se escribe «7,5»—, entiende el campo vacío como cero y devuelve `null`
 * cuando lo escrito no son unas horas: un negativo tampoco lo es.
 */
export declare function parsePlanningHours(text: string): number | null;
