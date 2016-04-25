summary = require 'jade/summary'

module.exports = class Summary

  constructor: ($el) ->
    $node = $ summary( {} )
    $el.append $node

    castShadows $node

    console.log "summa"
