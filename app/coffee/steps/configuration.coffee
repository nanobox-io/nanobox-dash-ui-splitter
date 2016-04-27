configuration = require 'jade/configuration'

module.exports = class Configuration

  constructor: ($el, @isHorizontal, @configChangeCb) ->
    @$node = $ configuration( @getConfig() )
    $el.append @$node
    castShadows @$node
    @$options = $ '.option', @$node
    $(".icon").on "click", (e)=>
      @onClick $ e.currentTarget

  getConfig : () ->
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

    return obj

  onClick : ($clicked) ->
    newSelection = $clicked.attr 'data-id'
    return if @selection == newSelection
    @selection = newSelection

    @$options.removeClass 'picked'
    $clicked.parent().addClass 'picked'

    @configChangeCb @selection

  getTitle : () -> "Choose a Configuration"
