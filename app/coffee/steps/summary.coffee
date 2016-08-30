summary = require 'jade/summary'

module.exports = class Summary

  constructor: (@$el, @isHorizontal, @getPlans) ->
  getTitle : () -> "Review and Submit"
  activate : () ->
    @$node?.remove()
    members = @getPlans()
    for key, member of members
      member.icon = @getIcon key

    data =
       members      : members
       isHorizontal : @isHorizontal

    @$node = $ summary( data )
    @$el.append @$node
    castShadows @$node

  getIcon : (memberKind) ->
    switch memberKind
      when "default", "primary"
        if @isHorizontal then return 'horizontal-cluster'
        else                  return 'vertical-single'
      when "secondary"   then return 'vertical-single'
      when "monitor"     then return 'monitor-instance'
      when "cluster"     then return 'horizontal-cluster'
      when "single"
        if @isHorizontal then return 'horizontal-single'
        else                  return 'vertical-single'
