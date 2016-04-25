scale = require 'jade/scale'

module.exports = class Scale

  constructor: ($el, isHorizontallyScalable=true) ->
    @$node = $ scale( {} )
    $el.append @$node
    $wrapper = $ '.wrapper', @$node

    if isHorizontallyScalable
      @scaleMachine = new nanobox.ScaleMachine $wrapper, "asdf", @onSelectionChange, @onInstanceTotalChange, 1
    else
      @scaleMachine = new nanobox.ScaleMachine $wrapper, "asdf", @onSelectionChange

    @scaleMachine.hideInstructions()

  onSelectionChange : () ->
  onInstanceTotalChange : () ->
  getTitle : () -> "Choose a VM size and number of instances"
