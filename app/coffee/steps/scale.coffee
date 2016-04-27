scale = require 'jade/scale'

# Super important!
# https://www.youtube.com/watch?v=OVcwNoZdDko

module.exports = class Scale

  constructor: ($el, @isHorizontallyScalable) ->
    @$node = $ scale( {isHorizontal: @isHorizontallyScalable} )
    $el.append @$node
    $scaleHolder = $ '.scale-holder', @$node

    if @isHorizontallyScalable
      @scaleMachine = new nanobox.ScaleMachine $scaleHolder, 'default', @onSelectionChange, @onInstanceTotalChange, 1
      @instanceData = {}
    else
      @scaleMachine = new nanobox.ScaleMachine $scaleHolder, 'default', @onSelectionChange
      @initMemberEvents()
      @memberData = {
        primary   : {}
        secondary : {}
        monitor   : {}
      }

    @scaleMachine.hideInstructions()
    @scaleMachine.keepHoverInbounds()
    castShadows @$node

  initMemberEvents : () ->
    @$members     = $('.member', @$node)
    @activeMember = $('.member.active', @$node).attr 'data-id'
    @$members.on 'click', (e)=>
      $currentTarget = $(e.currentTarget)
      @activeMember = $currentTarget.attr 'data-id'
      @$members.removeClass 'active'
      $currentTarget.addClass 'active'
      # If this is the secondary unit, and the user has not picked a secondary scale
      if @activeMember == "secondary" && !@memberData.secondary.userHasSpecified
        @memberData.secondary.planId = @memberData.primary.planId

      @scaleMachine.refresh @memberData[@activeMember].planId

  onSelectionChange : (planId) =>
    if @isHorizontallyScalable
      @instanceData.planId = planId
    else
      @memberData[@activeMember].planId   = planId
      @memberData[@activeMember].planData = @scaleMachine.getPlanData planId
      if @activeMember == 'primary' && !@memberData.secondary.userHasSpecified
        @memberData.secondary.planId   = @memberData.primary.planId
        @memberData.secondary.planData = @memberData.primary.planData

      # If this is the secondary plan, note that user has specified the specs
      if @activeMember == 'secondary'
        @memberData.secondary.userHasSpecified = true

  onInstanceTotalChange : () ->

  getSelectedPlans : () ->
    if @isHorizontallyScalable
      return @instanceData

    else
      # Make sure there is a plan for each member
      for key, member of @memberData
        if !member.planId?
          member.planId   = @scaleMachine.getDefaultPlan()
          member.planData = @scaleMachine.getPlanData member.planId
      return @memberData

  getTitle : () ->
    if @isHorizontallyScalable
      return "Choose a VM size and number of instances"
    else
      return "Configure the scale for each cluster member"

  activate : () ->
