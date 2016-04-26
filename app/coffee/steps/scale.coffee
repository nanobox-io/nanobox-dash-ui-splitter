scale = require 'jade/scale'

module.exports = class Scale

  constructor: ($el, isHorizontallyScalable=true) ->
    @$node = $ scale( {} )
    $el.append @$node
    $wrapper = $ '.wrapper', @$node

    if isHorizontallyScalable
      @scaleMachine = new nanobox.ScaleMachine $wrapper, 'default', @onSelectionChange, @onInstanceTotalChange, 1
    else
      @scaleMachine = new nanobox.ScaleMachine $wrapper, 'default', @onSelectionChange

    @scaleMachine.hideInstructions()
    @scaleMachine.keepHoverInbounds()

  onSelectionChange : () ->
  onInstanceTotalChange : () ->
  getTitle : () -> "Choose a VM size and number of instances"
