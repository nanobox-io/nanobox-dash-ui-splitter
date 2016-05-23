
Returned when moving onto an existing server
```
{
  componentId: "asf09s0nafs0-fakecomponentID",
  isNewServer: false,
  bunkhouseId: "bh2"
}
```
Splitting onto a new bunkhouse
```
{
  "componentId":"asf09s0nafs0-fakecomponentID",
  "isBunkhouse":true,
  "isNewServer":true,
  "topology":"bunkhouse",
  "plans":{
    "primary":{"planId":"b1"}
  }
}
```

Splitting onto a new redundant cluster
```
{
  "componentId":"asf09s0nafs0-fakecomponentID",
  "isBunkhouse":false,
  "isNewServer":true,
  "topology":"redundant",
  "plans":{
    "primary":{"planId":"b1"},
    "secondary":{"planId":"b1"},
    "monitor":{"planId":"b1"}
  }
}
```
