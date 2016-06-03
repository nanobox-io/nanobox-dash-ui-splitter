scale = require 'jade/scale'

module.exports = class Scale

  constructor: ($el, @isHorizontallyScalable, @getConfiguration) ->

    @totalInstances = 1
    @$node = $ scale( {isHorizontal: @isHorizontallyScalable} )
    $el.append @$node
    $scaleHolder = $ '.holder', @$node

    scaleConfigs =
      activeServerId          : 'default'
      onSpecsChange           : @onSelectionChange
      totalInstances          : @totalInstances
      isHorizontallyScalable  : @isHorizontallyScalable
      isCluster               : true

    @scaleMachine = new nanobox.ScaleMachine $scaleHolder, scaleConfigs

  activate : () ->
    @serverConfig = @getConfiguration()
    @scaleMachine.refresh @serverConfig.topology=='redundant', @isHorizontallyScalable
  getTitle : () ->
    if @serverConfig.topology == 'bunkhouse'
      return 'Choose a scale for a new multi-component VM'
    if @isHorizontallyScalable
      return "Choose a VM size and number of instances"
    else
      return "Configure the scale for each cluster member"

  onSelectionChange : () =>
    # console.log @scaleMachine.getUserSelectedPlan()

  getSelectedPlans : () -> @scaleMachine.getUserSelectedPlan()
  #
  #   @memberData = {
  #     primary : {}
  #   }
  #
  #   if @isHorizontallyScalable
  #     @scaleMachine = new nanobox.ScaleMachine $scaleHolder, 'default', @onSelectionChange, @onInstanceTotalChange, 1
  #   else
  #     @scaleMachine = new nanobox.ScaleMachine $scaleHolder, 'default', @onSelectionChange
  #     @initMemberEvents()
  #
  #   @scaleMachine.hideInstructions()
  #   @scaleMachine.keepHoverInbounds()
  #   castShadows @$node
  #
  # initMemberEvents : () ->
  #   @$members     = $('.member', @$node)
  #   @activeMember = $('.member.active', @$node).attr 'data-id'
  #   @$members.on 'click', (e)=>
  #     $currentTarget = $(e.currentTarget)
  #     @activeMember = $currentTarget.attr 'data-id'
  #     @visuallyActivateMemberBtn $currentTarget
  #     # If this is the secondary unit, and the user has not picked a secondary scale
  #     if @activeMember == "secondary" && !@memberData.secondary.userHasSpecified
  #       @memberData.secondary.planId = @memberData.primary.planId
  #
  #     @scaleMachine.refresh @memberData[@activeMember].planId
  #
  # visuallyActivateMemberBtn : ($newBtn) ->
  #   @$members?.removeClass 'active'
  #   $newBtn?.addClass 'active'
  #
  # onSelectionChange : (planId) =>
  #   if @isHorizontallyScalable || @serverConfig.topology == 'bunkhouse'
  #     @memberData.primary.planId   = planId
  #     @memberData.primary.planData = @scaleMachine.getPlanData planId
  #   else
  #     @memberData[@activeMember].planId   = planId
  #     @memberData[@activeMember].planData = @scaleMachine.getPlanData planId
  #     if @activeMember == 'primary' && !@memberData.secondary.userHasSpecified
  #       @memberData.secondary.planId   = @memberData.primary.planId
  #       @memberData.secondary.planData = @memberData.primary.planData
  #
  #     # If this is the secondary plan, note that user has specified the specs
  #     if @activeMember == 'secondary'
  #       @memberData.secondary.userHasSpecified = true
  #
  # onInstanceTotalChange : ( @totalInstances ) =>
  #
  # getSelectedPlans : () ->
  #
  #   # This is a bunkhouse
  #   if @serverConfig.topology == 'bunkhouse'
  #     @visuallyActivateMemberBtn $(".member[data-id='primary']")
  #     delete @memberData.secondary
  #     delete @memberData.monitor
  #
  #   # This is a db component..
  #   else if !@isHorizontallyScalable
  #     # If a secondary plan was not specified, use the primary's data
  #     if !@memberData.secondary.planData? && !@memberData.secondary.userHasSpecified
  #       @memberData.secondary.planId   = @memberData.primary.planId
  #       @memberData.secondary.planData = @memberData.primary.planData
  #
  #   # Make sure there is a plan for each member
  #   for key, member of @memberData
  #     if !member.planId?
  #       member.planId   = @scaleMachine.getDefaultPlan()
  #       member.planData = @scaleMachine.getPlanData member.planId
  #
  #   if @isHorizontallyScalable
  #     @memberData.primary.totalInstances = @totalInstances
  #
  #   return @memberData
  #
  # getTitle : () ->
  #   if @serverConfig.topology == 'bunkhouse'
  #     return 'Choose a scale for a new multi-component VM'
  #   if @isHorizontallyScalable
  #     return "Choose a VM size and number of instances"
  #   else
  #     return "Configure the scale for each cluster member"
  #
  # activate : () ->
  #   @serverConfig = @getConfiguration()
  #
  #   if @serverConfig.topology == 'bunkhouse'
  #     @$node.addClass 'bunkhouse-topology'
  #     @scaleMachine.refresh @memberData.primary.planId, false
  #
  #   else
  #     @$node.removeClass 'bunkhouse-topology'
  #     if !@isHorizontallyScalable
  #       if !@memberData.secondary?
  #         @memberData.secondary = {}
  #         @memberData.monitor   = {}
  #       @scaleMachine.refresh @memberData[$('.member.active', @$node).attr 'data-id'].planId, false
