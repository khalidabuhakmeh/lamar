import{o as n,c as s,a,b as t}from"./app.21b67795.js";const e='{"title":"Type Scanning Diagnostics","description":"","frontmatter":{},"headers":[{"level":2,"title":"Assert for Assembly Loading Failures","slug":"assert-for-assembly-loading-failures"},{"level":2,"title":"What did Lamar scan?","slug":"what-did-lamar-scan"}],"relativePath":"guide/ioc/diagnostics/type-scanning.md","lastUpdated":1630653674596}',p={},o=t('<h1 id="type-scanning-diagnostics"><a class="header-anchor" href="#type-scanning-diagnostics" aria-hidden="true">#</a> Type Scanning Diagnostics</h1><p>Type scanning and conventional auto-registration is a very powerful feature in Lamar, but it has been frequently troublesome to users when things go wrong. To try to alleviate problems, Lamar has some functionality for detecting and diagnosing problems with type scanning, mostly related to Assembly&#39;s being missing.</p><h2 id="assert-for-assembly-loading-failures"><a class="header-anchor" href="#assert-for-assembly-loading-failures" aria-hidden="true">#</a> Assert for Assembly Loading Failures</h2><p>At its root, most type scanning and auto-registration schemes in .Net frameworks rely on the <a href="https://msdn.microsoft.com/en-us/library/system.reflection.assembly.getexportedtypes%28v=vs.110%29.aspx" target="_blank" rel="noopener noreferrer">Assembly.GetExportedTypes()</a> method. Unfortunately, that method can be brittle and fail whenever any dependency of that Assembly cannot be loaded into the current process, even if your application has no need for that dependency. In Lamar, you can use this method to assert the presence of any assembly load exceptions during type scanning:</p>',4),i=t('<p><a id="snippet-sample_assert-no-type-scanning-failures"></a></p><div class="language-cs"><pre><code>TypeRepository<span class="token punctuation">.</span><span class="token function">AssertNoTypeScanningFailures</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Graph/Scanning/TypeRepositoryTester.cs#L45-L47" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_assert-no-type-scanning-failures" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>The method above will throw an exception listing all the Assembly&#39;s that failed during the call to <code>GetExportedTypes()</code> only if there were any failures. Use this method during your application bootstrapping if you want it to fail fast with any type scanning problems.</p><h2 id="what-did-lamar-scan"><a class="header-anchor" href="#what-did-lamar-scan" aria-hidden="true">#</a> What did Lamar scan?</h2><p>Confusion of type scanning has been a constant problem with Lamar usage over the years -- especially if users are trying to dynamically load assemblies from the file system for extensibility. In order to see into what Lamar has done with type scanning, 4.0 introduces the <code>Container.WhatDidIScan()</code> method.</p><p>Let&#39;s say that you have a <code>Container</code> that is set up with at least two different scanning operations like this sample from the Lamar unit tests:</p>',7),c=t('<p><a id="snippet-sample_whatdidiscan"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n<span class="token punctuation">{</span>\n    _<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        x<span class="token punctuation">.</span><span class="token function">TheCallingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        x<span class="token punctuation">.</span><span class="token function">WithDefaultConventions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token function">RegisterConcreteTypesAgainstTheFirstInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token function">SingleImplementationsOfInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    _<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// Give your scanning operation a descriptive name</span>\n        <span class="token comment">// to help the diagnostics to be more useful</span>\n        x<span class="token punctuation">.</span>Description <span class="token operator">=</span> <span class="token string">&quot;Second Scanner&quot;</span><span class="token punctuation">;</span>\n\n        x<span class="token punctuation">.</span><span class="token function">AssembliesFromApplicationBaseDirectory</span><span class="token punctuation">(</span>assem <span class="token operator">=&gt;</span> assem<span class="token punctuation">.</span>FullName<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;Widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token function">ConnectImplementationsToTypesClosing</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IService<span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddAllTypesOf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nConsole<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">WhatDidIScan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDidIScan_smoke_tests.cs#L21-L46" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdidiscan" title="Start of snippet">anchor</a></sup><a id="snippet-sample_whatdidiscan-1"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n<span class="token punctuation">{</span>\n    _<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        x<span class="token punctuation">.</span><span class="token function">TheCallingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        x<span class="token punctuation">.</span><span class="token function">WithDefaultConventions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token function">RegisterConcreteTypesAgainstTheFirstInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token function">SingleImplementationsOfInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    _<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// Give your scanning operation a descriptive name</span>\n        <span class="token comment">// to help the diagnostics to be more useful</span>\n        x<span class="token punctuation">.</span>Description <span class="token operator">=</span> <span class="token string">&quot;Second Scanner&quot;</span><span class="token punctuation">;</span>\n\n        x<span class="token punctuation">.</span><span class="token function">AssembliesFromApplicationBaseDirectory</span><span class="token punctuation">(</span>assem <span class="token operator">=&gt;</span> assem<span class="token punctuation">.</span>FullName<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;Widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token function">ConnectImplementationsToTypesClosing</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IService<span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddAllTypesOf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nDebug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">WhatDidIScan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/WhatDidIScan_smoke_tester.cs#L14-L39" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdidiscan-1" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>The resulting textual report is shown below:</p><p><em>Sorry for the formatting and color of the text, but the markdown engine does <strong>not</strong> like the textual report</em>\x3c!-- snippet: sample_whatdidiscan-result --\x3e<a id="snippet-sample_whatdidiscan-result"></a></p><div class="language-cs"><pre><code><span class="token comment">/*\nAll Scanners\n================================================================\nScanner #1\nAssemblies\n----------\n* StructureMap.Testing, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n\nConventions\n--------\n* Default I[Name]/[Name] registration convention\n* Register all concrete types against the first interface (if any) that they implement\n* Register any single implementation of any interface against that interface\n\nSecond Scanner\nAssemblies\n----------\n* StructureMap.Testing.GenericWidgets, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget2, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget3, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget4, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget5, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n\nConventions\n--------\n* Connect all implementations of open generic type IService&lt;T&gt;\n* Find and register all types implementing StructureMap.Testing.Widget.IWidget\n\n*/</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDidIScan_smoke_tests.cs#L90-L121" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdidiscan-result" title="Start of snippet">anchor</a></sup><a id="snippet-sample_whatdidiscan-result-1"></a></p><div class="language-cs"><pre><code><span class="token comment">/*\nAll Scanners\n================================================================\nScanner #1\nAssemblies\n----------\n* StructureMap.Testing, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n\nConventions\n--------\n* Default I[Name]/[Name] registration convention\n* Register all concrete types against the first interface (if any) that they implement\n* Register any single implementation of any interface against that interface\n\nSecond Scanner\nAssemblies\n----------\n* StructureMap.Testing.GenericWidgets, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget2, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget3, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget4, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n* StructureMap.Testing.Widget5, Version=4.0.0.51243, Culture=neutral, PublicKeyToken=null\n\nConventions\n--------\n* Connect all implementations of open generic type IService&lt;T&gt;\n* Find and register all types implementing StructureMap.Testing.Widget.IWidget\n\n*/</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/WhatDidIScan_smoke_tester.cs#L43-L74" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdidiscan-result-1" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>The textual report will show:</p><ol><li>All the scanning operations (calls to <code>Registry.Scan()</code>) with a descriptive name, either one supplied by you or the <code>Registry</code> type and an order number.</li><li>All the assemblies that were part of the scanning operation including the assembly name, version, and a warning if <code>Assembly.GetExportedTypes()</code> failed on that assembly.</li><li>All the configured scanning conventions inside of the scanning operation</li></ol><p><code>WhatDidIScan()</code> does not at this time show any type filters or exclusions that may be part of the assembly scanner.</p><p>See also: <a href="/guide/ioc/registration/auto-registration-and-conventions.html">Auto-Registration and Conventions</a></p>',15);p.render=function(t,e,p,l,u,r){return n(),s("div",null,[o,a(" snippet: sample_assert-no-type-scanning-failures "),i,a(" snippet: sample_whatdidiscan "),c])};export{e as __pageData,p as default};
