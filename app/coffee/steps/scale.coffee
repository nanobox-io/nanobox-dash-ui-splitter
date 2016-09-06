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
  
