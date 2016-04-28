configuration = require 'jade/configuration'

module.exports = class Configuration

  constructor: ($el, @isHorizontal, bunkHouses, @isExistingHostCb) ->
    data = @getConfig bunkHouses
    @$node = $ configuration(data)
    $el.append @$node
    castShadows @$node
    @$options = $ '.option', @$node

    $(".icon", @$node).on "click", (e)=>
      @onCategoryChange $ e.currentTarget

    $("input", @$node).on 'click', (e)=>
      if $(e.currentTarget).val() == 'existing'
        @isExistingHostCb true
      else
        @isExistingHostCb false

    @selection = $('.option.picked .icon', @$node).attr 'data-id'


  getConfig : (bunkHouses) ->
    obj =
      singleTitle    : "Single"
      singleBlurb    : "A single instance of this component  installed on a multi-component server."
    if @isHorizontal
      obj.singleIcon     = "horizontal-single"
      obj.redundantIcon  = "horizontal-cluster"
      obj.redundantTitle = "Horizontal Cluster"
      obj.redundantBlurb = "Cluster one or more instances of this component. Each instance lives on it’s own server for redundancy and greater performance. "

    else
      obj.singleIcon     = "vertical-single"
      obj.redundantIcon  = "vertical-redundant"
      obj.redundantTitle = "Redundant Cluster"
      obj.redundantBlurb = "A primary and secondary instance of your data component plus  a small monitor to sync data state between the two and switch traffic to the secondary if the primary should fail."

    obj.bunkHouses = bunkHouses

    return obj

  getData : () ->
    {
      topology         : @selection
      isNewServer      : $("input[name='bunkhaus']:checked", @$node).val() == 'new'
      existingServerId : $("select", @$node).val()
    }


  onCategoryChange : ($clicked) ->
    newSelection = $clicked.attr 'data-id'
    return if @selection == newSelection
    @selection = newSelection

    @$options.removeClass 'picked'
    $clicked.parent().addClass 'picked'

    if @selection == 'redundant'
      $(".radios", @$node).addClass 'inactive'
      $("input[value='new']", @$node).prop 'checked', true
      @isExistingHostCb false
    else
      $(".radios", @$node).removeClass 'inactive'

  getTitle : () -> "Choose a Configuration"
  activate : () ->
