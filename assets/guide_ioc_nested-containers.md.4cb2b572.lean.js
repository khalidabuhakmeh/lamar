import{o as n,c as s,a,d as t,e,b as p}from"./app.80913d4a.js";const o='{"title":"Nested Containers (Per Request/Transaction)","description":"","frontmatter":{},"relativePath":"guide/ioc/nested-containers.md","lastUpdated":1629295183717}',c={},i=t("h1",{id:"nested-containers-per-request-transaction"},[t("a",{class:"header-anchor",href:"#nested-containers-per-request-transaction","aria-hidden":"true"},"#"),e(" Nested Containers (Per Request/Transaction)")],-1),u=t("div",{class:"tip custom-block"},[t("p",{class:"custom-block-title"},"INFO"),t("p",null,'If you\'re coming from StructureMap, do note that Lamar does not yet support the concept of "child" containers')],-1),l=t("p",null,[t("em",null,"Nested Container's"),e(" are a powerful feature in Lamar for service resolution and clean object disposal in the context of short lived operations like HTTP requests or handling a message within some kind of service bus. A "),t("em",null,"nested container"),e(" is specific to the scope of that operation and is should not live on outside of that scope.")],-1),r=t("p",null,"Here's a sample of a nested container in action:",-1),k=p('',4);c.render=function(t,e,p,o,c,d){return n(),s("div",null,[i,u,l,r,a(" snippet: sample_using-nested-container "),k])};export{o as __pageData,c as default};
