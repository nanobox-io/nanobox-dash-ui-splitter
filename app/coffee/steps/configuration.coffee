configuration = require 'jade/configuration'

module.exports = class Configuration

  constructor: ($el, @isHorizontal, bunkHouses, @clusterable, @isCluster, @isExistingHostCb) ->
    data   = @getConfig bunkHouses
    @$node = $ configuration(data)
    $el.append @$node
    castShadows @$node
    lexify @$node
    @$options = $ '.option', @$node

    $(".icon", @$node).on "click", (e)=>
      @onCategoryChange $ e.currentTarget

    $("input", @$node).on 'click', (e)=>
      @singleKind = $(e.currentTarget).val()
      if @singleKind == 'existing'
        @isExistingHostCb true
      else
        @isExistingHostCb false

    @selection = $('.option.picked .icon', @$node).attr 'data-id'

  init : () ->
    @setInitialState()
    $(".icon:first", @$node).trigger 'click'
    $("input:radio:first", @$node).trigger 'click'

  setInitialState : () ->
    $bunkhouse = $(".option.bunkhouse", @$node)
    $redundant = $(".option.redundant", @$node)
    if !@clusterable
      $redundant.remove()


  isBunkhouse : ()-> @selection == 'bunkhouse'

  getConfig : (bunkHouses) ->
    obj =
      singleTitle    : "Single"
      singleBlurb    : "A single instance of this component."
    if @isHorizontal
      obj.isData         = false
      obj.singleIcon     = "horizontal-single"
      obj.redundantIcon  = "horizontal-cluster"
      obj.redundantTitle = "Horizontal Cluster"
      obj.redundantBlurb = "Cluster one or more instances of this component. Each instance lives on it’s own server for redundancy and greater performance. "

    else
      obj.isData         = true
      obj.singleIcon     = "vertical-single"
      obj.redundantIcon  = "vertical-redundant"
      obj.redundantTitle = "Redundant Cluster"
      obj.redundantBlurb = "A primary and secondary instance of your data component plus  a small monitor to sync data state between the two and switch traffic to the secondary if the primary should fail."

    activeBunkHouses = []

    for bunkHouse in bunkHouses
      if bunkHouse.state == 'active'
        activeBunkHouses.push bunkHouse


    obj.bunkHouses = bunkHouses

    # If there are no bunkhouses:
    if activeBunkHouses.length == 0
      obj.showBunkhouseSelector = false
    # else if there are more than one bunkhouse:
    else if activeBunkHouses.length > 1
      obj.showBunkhouseSelector = true
    # else there is only one bunkhouse
    else
      obj.showBunkhouseSelector = true
      # If that one bunkhouse if the bunkhouse we're currently on, don't show it
      if bunkHouses[0].current
        obj.showBunkhouseSelector = false

    return obj

  getData : () ->
    obj = {
      topology         : @selection
      isNewServer      : $("input[name='bunkhaus']:checked", @$node).val() == 'new'
      isBunkhouse      : @selection == 'bunkhouse'
    }

    # If it is being split onto an existing server, save that id
    if obj.isBunkhouse && !obj.isNewServer
      obj.existingServerId = $("select", @$node).val()

    if @selection == 'bunkhouse' && @singleKind == "new-single"
      obj.topology = 'single-cluster'

    return obj


  onCategoryChange : ($clicked) ->
    newSelection = $clicked.attr 'data-id'
    return if @selection == newSelection
    @selection = newSelection

    @$options.removeClass 'picked'
    $clicked.parent().addClass 'picked'

    if @selection == 'cluster'
      $(".radios", @$node).addClass 'inactive'
      $("input[value='new']", @$node).prop 'checked', true
      @isExistingHostCb false
    else
      $(".radios", @$node).removeClass 'inactive'

  getTitle : () -> "Choose a Configuration"
  activate : () ->
