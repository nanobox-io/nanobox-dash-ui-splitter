scale = require 'jade/scale'

module.exports = class Scale

  constructor: ($el, @checkHorizReund, @getConfiguration) ->
    @isHorizRedund = @checkHorizReund()
    @totalInstances = 1
    @$node = $ scale( {isHorizontal: @isHorizRedund} )
    $el.append @$node
    $scaleHolder = $ '.holder', @$node

    scaleConfigs =
      activeServerId          : 'default'
      onSpecsChange           : @onSelectionChange
      totalInstances          : @totalInstances
      isHorizontallyScalable  : @isHorizRedund
      isCluster               : true

    @scaleMachine = new nanobox.ScaleMachine $scaleHolder, scaleConfigs

  activate : () ->
    @isHorizRedund = @checkHorizReund()
    @serverConfig = @getConfiguration()
    @scaleMachine.refresh @serverConfig.topology=='redundant', @isHorizRedund

  getTitle : () ->
    if @serverConfig.topology == 'bunkhouse'
      return 'Choose a scale for a new multi-component VM'
    if @isHorizRedund
      return "Choose a VM size and number of instances"
    else
      return "Configure the scale for each cluster member"

  onSelectionChange : () =>
    # console.log @scaleMachine.getUserSelectedPlan()

  getSelectedPlans : () -> @scaleMachine.getUserSelectedPlan()
