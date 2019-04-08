<%_ if (useTS) { _%>
<%_ if (doesGenerateDocs) { _%>
/**
 * @module index
 * @description Hello world!
 * @example
 * ```js
 *
 * hello() // output: Hello world!
 * ```
 */
<%_ } _%>
export function hello(): void {
  console.log('Hello world!')
}

<%_ if (doesCompile) { _%>
export const foo: string = 'foo'
<%_ } else { _%>
export var foo: string = 'foo'
<%_ } _%>

<%_ } _%>
