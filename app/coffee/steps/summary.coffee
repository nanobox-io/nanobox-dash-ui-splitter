summary = require 'jade/summary'

module.exports = class Summary

  constructor: (@$el, @isHorizontal, @isHorizRedund, @getScaleData) ->
  getTitle : () -> "Review and Submit"
  activate : () ->
    @$node?.remove()

    data = @getScaleData()
    for key, member of data.plans
      member.icon = @getIcon key

    data =
      provider           : data.meta.title
      hostKind           : data.meta.serverTitle
      members            : data.plans
      isHorizontal       : @isHorizontal
      isHorizontalRedund : @isHorizRedund()

    @$node = $ summary( data )
    @$el.append @$node
    castShadows @$node

  getIcon : (memberKind) ->
    switch memberKind
      when "default", "primary"
        if      @isHorizRedund() then return 'horizontal-cluster'
        else if @isHorizontal    then return 'horizontal-single'
        else                        return 'vertical-single'
      when "secondary"   then return 'vertical-single'
      when "arbiter"     then return 'monitor-instance'
      when "cluster"     then return 'horizontal-cluster'
      when "single"
        if @isHorizontal then return 'horizontal-single'
        else                  return 'vertical-single'
