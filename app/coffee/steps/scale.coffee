scale = require 'jade/scale'

module.exports = class Scale

  constructor: ($el, isHorizontallyScalable=true) ->
    $node = $ scale( {} )
    $el.append $node


    if isHorizontallyScalable
      @scaleMachine = new nanobox.ScaleMachine $node, "asdf", @onSelectionChange, @onInstanceTotalChange, 1
    else
      @scaleMachine = new nanobox.ScaleMachine $node, "asdf", @onSelectionChange

  onSelectionChange : () ->
  onInstanceTotalChange : () ->
