[{
  "key": "len",
  "type": "horizontalInput",
  "templateOptions": {
    "label": "Stichprobengröße",
    "type": "number",
    "min": 0,
    "max": 100
  },
  "defaultValue": 30
},
{
  "key": "R",
  "type": "horizontalInput",
  "templateOptions": {
    "label": "Korrelation",
    "type": "number",
    "min": -1,
    "max": 1,
    "step": 0.1
  },
  "defaultValue": 0,
  "ngModelAttrs": {
    "step": {
      "attribute": "step",
      "bound": "step"
    }
  }
}]