/*!
 * markedpp
 *
 * A preprocessor for markdown files
 *
 * @copyright 2014 commenthol
 * @licence MIT
 *
 * @note Code inspired by `marked` project
 * @credits Christopher Jeffrey <https://github.com/chjj/marked>
 */

const Lexer = require('./Lexer')
const InlineLexer = require('./InlineLexer')
const Parser = require('./Parser')
const Renderer = require('./Renderer')
const defaults = require('./defaults')

/**
 * Markdown Preprocessor
 *
 * @module markedpp
 * @param {String} src - markdown source to preprocess
 * @param {Object} options - options
 * @param {String} options.dirname - dirname of markdown source file - required to include other files
 * @param {Function} callback - callback function
 * ```
 * function({Error} err, {String} data)
 * ```
 */
function markedpp (src, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = null
  }

  options = Object.assign({}, defaults, options || {})

  Lexer.lex(markedpp.ppInclude, src, options, function (err, tokens) {
    let out = tokens
    if (!err && tokens) {
      out = Parser.parse(tokens, options)
    }
    callback(err, out)
  })
}

/**
 * exports
 */
markedpp.defaults = defaults
markedpp.Lexer = Lexer
markedpp.InlineLexer = InlineLexer
markedpp.Renderer = Renderer
markedpp.Parser = Parser

module.exports = markedpp
