scale = require 'jade/scale'

module.exports = class Scale

  constructor: ($el, @isHorizontallyScalable) ->
    @$node = $ scale( {isHorizontal: @isHorizontallyScalable} )
    $el.append @$node
    $scaleHolder = $ '.scale-holder', @$node

    if @isHorizontallyScalable
      @scaleMachine = new nanobox.ScaleMachine $scaleHolder, 'default', @onSelectionChange, @onInstanceTotalChange, 1
    else
      @scaleMachine = new nanobox.ScaleMachine $scaleHolder, 'default', @onSelectionChange
      @initMemberEvents()

    @scaleMachine.hideInstructions()
    @scaleMachine.keepHoverInbounds()
    castShadows @$node

  initMemberEvents : () ->
    @$members = $('.member', @$node)
    @$members.on 'click', (e)=>
      @$members.removeClass 'active'
      $(e.currentTarget).addClass 'active'


  onSelectionChange : () ->

  onInstanceTotalChange : () ->

  getTitle : () ->
    if @isHorizontallyScalable
      return "Choose a VM size and number of instances"
    else
      return "Configure the scale for each cluster member"
