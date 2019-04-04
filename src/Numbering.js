/**
 * Number headings
 * @constructor
 * @api private
 */
function Numbering (init) {
  this._ = [0, 0, 0, 0, 0, 0, 0]
  this.last = 1
  this._[1] = (init ? init - 1 : 0)
}

/**
 * Reset number array per level
 * @param {Number} level
 */
Numbering.prototype.reset = function (level) {
  for (var i = level + 1; i < this._.length; i++) {
    this._[i] = 0
  }
}

/**
 * Generate output value for number
 * @param {Number} level
 * @return {String} number
 */
Numbering.prototype.val = function (level) {
  var i
  var out = this._[1]

  for (i = 2; i <= level; i++) {
    out += '.' + this._[i]
  }
  return out + '\\.'
}

/**
 * Count up per level
 * @param {Number} level
 * @return {String} number
 */
Numbering.prototype.count = function (level) {
  if (level <= 6) {
    if (this.last > level) {
      this.reset(level)
    }
    this._[level] += 1
    this.last = level
    return this.val(level)
  }
}

module.exports = Numbering