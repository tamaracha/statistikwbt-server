%Statistik für Jedermann
%Tamara Cook
<%_.forEach(data.units,function(unit){%>
# ${unit.title}
## Beschreibung
${unit.description}
<%_.forEach(unit.topics,function(topic){%>
## ${topic.title}
${topic.body}
<%
  if(data.contents.examples){
%>
### Beispiele
<%_.forEach(topic.examples,function(example){%>
#### ${example.title}
${example.body}
<%
  });
  }
  if(data.contents.extras){
%>
### Extras
<%_.forEach(topic.extras,function(extra){%>
#### ${extra.title}
${extra.body}
<%
  });
  }
  });
  });
%>