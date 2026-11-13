// Serializes a value for the body of an inline `<script>` (JSON-LD or
// `type="application/json"`). `JSON.stringify` leaves `<` as is, so a string
// value holding `</script>` would end the element and the rest would parse as
// HTML; `<` is the same character once the JSON is parsed.
export function serializeJsonForScript(value: unknown): string {
	return JSON.stringify(value).replace(/</g, '\\u003c');
}
