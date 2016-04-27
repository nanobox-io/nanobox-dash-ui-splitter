summary = require 'jade/summary'

module.exports = class Summary

  constructor: (@$el, @isHorizontal, @getPlans) ->
  getTitle : () -> "Review and Submit"
  activate : () ->
    @$node?.remove()
    members = @getPlans()
    for key, member of members
      member.icon = @getIcon key

    @$node = $ summary( {members: members} )
    @$el.append @$node
    castShadows @$node

  getIcon : (memberKind) ->
    switch memberKind
      when "primary"   then return 'vertical-single'
      when "secondary" then return 'vertical-single'
      when "monitor"   then return 'monitor'
      when "cluster"   then return 'horizontal-cluster'
      when "single"
        if @isHorizontal then return 'horizontal-single'
        else                  return 'vertical-single'
