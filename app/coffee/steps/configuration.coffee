configuration = require 'jade/configuration'

module.exports = class Configuration

  constructor: ($el) ->
    $node = $ configuration( {} )
    $el.append $node
    castShadows $node
    @$options = $ '.option', $node
    $(".icon").on "click", (e)=>
      @onClick $ e.currentTarget

  onClick : ($clicked) ->
    newSelection = $clicked.attr 'data-id'
    return if @selection == newSelection
    @selection = newSelection

    @$options.removeClass 'picked'
    $clicked.parent().addClass 'picked'
