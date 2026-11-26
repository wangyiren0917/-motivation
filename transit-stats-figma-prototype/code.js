async function assemble(){
const previous=figma.currentPage;
const wanted=await figma.getNodeByIdAsync("4:5");
if(!wanted||wanted.type!=="PAGE")throw new Error("请在已交付的 Transit Stats 文件中运行。");
await figma.setCurrentPageAsync(wanted);
const base=await figma.getNodeByIdAsync("8:2");
if(!base||base.name!=="Transit Stats App · Desktop"||base.parent.id!==wanted.id)throw new Error("没有找到目标桌面画板。");
const existing=wanted.children.find(n=>n.getPluginData("transitStatsPrototype")==="desktop-start");
if(existing){wanted.selection=[existing];figma.viewport.scrollAndZoomIntoView([existing]);return}
const before=new Set(wanted.children.map(n=>n.id));
const flowsBefore=[...wanted.flowStartingPoints];
try {
const page=await figma.getNodeByIdAsync('4:5');
await figma.setCurrentPageAsync(page);
await Promise.all(['Regular','SemiBold','Bold','Medium','Black','Light'].map(style=>figma.loadFontAsync({family:'Lato',style})));
const made=[];
const color=hex=>({r:parseInt(hex.slice(0,2),16)/255,g:parseInt(hex.slice(2,4),16)/255,b:parseInt(hex.slice(4,6),16)/255});
const solid=h=>[{type:'SOLID',color:color(h),opacity:h.length===8?parseInt(h.slice(6),16)/255:1}];
function svgNode(d,w,h){
 let svg=d.svg.replace(/<svg\b([^>]*)>/,(_,attrs)=>{
  const vw=(attrs.match(/\bwidth="([\d.]+)"/)||[])[1]||w;
  const vh=(attrs.match(/\bheight="([\d.]+)"/)||[])[1]||h;
  const has=attrs.includes('viewBox=');
  let a=attrs.replace(/\s(?:width|height)="[^"]*"/g,'');
  return '<svg '+a+' width="'+w+'" height="'+h+'" '+(has?'':'viewBox="0 0 '+vw+' '+vh+'"')+'>';
 });
 return figma.createNodeFromSvg(svg);
}
function draw(parent,d,ox,oy){
 const [x,y,w,h]=d.r;
 if(!(w>.005&&h>.005))return;
 let n;
 if(d.t==='text'){
  n=figma.createText();n.fontName={family:'Lato',style:d.weight>=800?'Black':d.weight>=700?'Bold':d.weight>=600?'SemiBold':d.weight>=500?'Medium':d.weight<=300?'Light':'Regular'};
  n.fontSize=Math.max(1,d.font);n.lineHeight={unit:'PIXELS',value:Math.max(1,d.lh)};
  n.characters=d.text;n.fills=solid(d.color);
  if(d.dec==='underline')n.textDecoration='UNDERLINE';
 }else if(d.t==='svg'){
  n=svgNode(d,w,h);n.resize(w,h);
 }else{
  n=d.t==='image'?figma.createRectangle():figma.createFrame();
  n.resize(w,h);
  n.fills=d.hash?[{type:'IMAGE',imageHash:d.hash,scaleMode:'FILL'}]:d.bg?solid(d.bg):[];
  if(n.type==='FRAME')n.clipsContent=!!d.clip;
  if(d.rad)n.cornerRadius=d.rad;
  if(d.border){n.strokes=solid(d.border[1]);n.strokeAlign='INSIDE';[n.strokeTopWeight,n.strokeRightWeight,n.strokeBottomWeight,n.strokeLeftWeight]=d.border[0]}
 }
 parent.appendChild(n);n.name=(d.act?'Button · ':'')+d.n;n.x=x-ox;n.y=y-oy;if(d.op!==undefined)n.opacity=d.op;
 made.push(n.id);
 if(d.hl){for(let t of d.k||[]){if(t.t!=='text')continue;const bg=figma.createRectangle();n.appendChild(bg);bg.name='Underline';bg.x=t.r[0]-x;bg.y=t.r[1]-y+t.r[3]-1;bg.resize(Math.max(1,t.r[2]),1);bg.fills=solid('bdbdbd');made.push(bg.id)}}
 for(const ch of d.k||[])draw(n,ch,x,y);
 return n;
}

const menu={"all":[{"aria":null,"color":"rgb(157, 157, 157)","r":[14,14,348,13.5],"size":"11px","svg":null,"tag":"span","text":"Contact","url":"","weight":"400"},{"aria":"Close contact","color":"rgb(157, 157, 157)","r":[342,8,26,26],"size":"17px","svg":null,"tag":"button","text":"","url":"","weight":"400"},{"aria":null,"color":"rgb(157, 157, 157)","r":[348,14,14,14],"size":"17px","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x size-[14px]\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></svg>","tag":"svg","url":"","weight":"400"},{"aria":"Copy email charleshonigdesign@gmail.com","color":"rgb(0, 0, 0)","r":[4,31.5,368,57],"size":"17px","svg":null,"tag":"button","text":"Email\ncharleshonigdesign@gmail.com","url":"","weight":"400"},{"aria":null,"color":"rgb(157, 157, 157)","r":[14,41.5,25.953125,13.5],"size":"11px","svg":null,"tag":"span","text":"Email","url":"","weight":"400"},{"aria":null,"color":"rgb(0, 0, 0)","r":[14,59,219.8671875,19.5],"size":"16px","svg":null,"tag":"span","text":"charleshonigdesign@gmail.com","url":"","weight":"600"},{"aria":null,"color":"rgb(0, 0, 0)","r":[342,50,20,20],"size":"17px","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-copy text-fg size-[20px]\" aria-hidden=\"true\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"></rect><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"></path></svg>","tag":"svg","url":"","weight":"400"},{"aria":null,"color":"rgb(0, 0, 0)","r":[4,92.5,368,57],"size":"17px","svg":null,"tag":"a","text":"LinkedIn\n@charles-honig","url":"https://www.linkedin.com/in/charles-honig/","weight":"400"},{"aria":null,"color":"rgb(157, 157, 157)","r":[14,102.5,40.7265625,13.5],"size":"11px","svg":null,"tag":"span","text":"LinkedIn","url":"","weight":"400"},{"aria":null,"color":"rgb(0, 0, 0)","r":[14,120,108.8046875,19.5],"size":"16px","svg":null,"tag":"span","text":"@charles-honig","url":"","weight":"600"},{"aria":null,"color":"rgb(0, 0, 0)","r":[342,111,20,20],"size":"17px","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-corner-up-right text-fg size-[20px] shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/row:translate-x-0.5\" aria-hidden=\"true\"><path d=\"m15 14 5-5-5-5\"></path><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path></svg>","tag":"svg","url":"","weight":"400"},{"aria":null,"color":"rgb(0, 0, 0)","r":[4,153.5,368,57],"size":"17px","svg":null,"tag":"a","text":"Resume\nCharles-Honig-Resume.pdf","url":"https://charleshonig.design/Charles-Honig-Resume.pdf","weight":"400"},{"aria":null,"color":"rgb(157, 157, 157)","r":[14,163.5,38.09375,13.5],"size":"11px","svg":null,"tag":"span","text":"Resume","url":"","weight":"400"},{"aria":null,"color":"rgb(0, 0, 0)","r":[14,181,190.71875,19.5],"size":"16px","svg":null,"tag":"span","text":"Charles-Honig-Resume.pdf","url":"","weight":"600"},{"aria":null,"color":"rgb(0, 0, 0)","r":[342,172,20,20],"size":"17px","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-corner-up-right text-fg size-[20px] shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/row:translate-x-0.5\" aria-hidden=\"true\"><path d=\"m15 14 5-5-5-5\"></path><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path></svg>","tag":"svg","url":"","weight":"400"}],"r":[678.625,64,376,214.5]},linkMap={"Transit Stats website":"https://www.transitstats.co/","01Microsoft ContractsModernizing a legacy platform with AI":"https://charleshonig.design/contracts","02Microsoft GiveMaking charitable giving effortless":"https://charleshonig.design/give","03Microsoft Legal EaseSimplifying legal requests and review":"https://charleshonig.design/legalease","Resume":"https://charleshonig.design/Charles-Honig-Resume.pdf","LinkedIn":"https://www.linkedin.com/in/charles-honig/","Letterboxd":"https://letterboxd.com/charleshonig/"},shortLayout=[{"n":"Primary navigation","r":[0,1394.5,1280,78]},{"t":"frame","n":"Section navigation","r":[84,1557.5,100.66,257],"k":[{"t":"frame","n":"Back","r":[84,1557.5,100.66,21],"act":"button","k":[{"t":"svg","n":"Icon · lucide-arrow-left","r":[84,1559,18,18],"svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"rgb(157, 157, 157)\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-arrow-left relative size-[18px]\" aria-hidden=\"true\"><path d=\"m12 19-7-7 7-7\"></path><path d=\"M19 12H5\"></path></svg>","clip":true},{"t":"text","n":"Back","r":[110,1559.5,29.7,17],"text":"Back","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]},{"t":"frame","n":"Case study length","r":[74,1612.5,100.66,22],"k":[{"t":"frame","n":"Full","r":[74,1612.5,41.81,22],"rad":11,"act":"button","k":[{"t":"text","n":"Full","r":[84,1615,21.81,17],"text":"Full","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]},{"t":"frame","n":"TL;DR","r":[115.81,1612.5,58.84,22],"rad":11,"act":"button","k":[{"t":"frame","n":"Span","r":[115.81,1612.5,58.84,22],"bg":"ffffff","rad":11,"border":[[1,1,1,1],"000000"]},{"t":"text","n":"TL;DR","r":[125.81,1615,38.84,17],"text":"TL;DR","font":14,"lh":17,"weight":600,"color":"000000","dec":"none"}]}]},{"t":"frame","n":"Case study sections","r":[84,1656.5,100.66,158],"k":[{"t":"frame","n":"Span","r":[84,1713.46,1,14],"bg":"000000"},{"t":"frame","n":"Group","r":[84,1656.5,69.6,18],"clip":true,"k":[{"t":"frame","n":"Overview","r":[84,1658.5,59.6,14],"act":"button","k":[{"t":"text","n":"Overview","r":[84,1657,59.6,17],"text":"Overview","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]}]},{"t":"frame","n":"Group","r":[84,1684.5,51.84,18],"clip":true,"k":[{"t":"frame","n":"Impact","r":[84,1686.5,41.84,14],"act":"button","k":[{"t":"text","n":"Impact","r":[84,1685,41.84,17],"text":"Impact","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]}]},{"t":"frame","n":"Group","r":[84,1712.5,83.98,18],"clip":true,"k":[{"t":"frame","n":"Experiences","r":[94,1714.5,73.98,14],"act":"button","k":[{"t":"text","n":"Experiences","r":[94,1713,73.98,17],"text":"Experiences","font":14,"lh":17,"weight":400,"color":"000000","dec":"none"}]}]},{"t":"frame","n":"Group","r":[84,1740.5,82.97,18],"clip":true,"k":[{"t":"frame","n":"Interactions","r":[84,1742.5,72.97,14],"act":"button","k":[{"t":"text","n":"Interactions","r":[84,1741,72.97,17],"text":"Interactions","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]}]},{"t":"frame","n":"Group","r":[84,1768.5,64.95,18],"clip":true,"k":[{"t":"frame","n":"Branding","r":[84,1770.5,54.95,14],"act":"button","k":[{"t":"text","n":"Branding","r":[84,1769,54.95,17],"text":"Branding","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]}]},{"t":"frame","n":"Group","r":[84,1796.5,91.07,18],"clip":true,"k":[{"t":"frame","n":"On the News","r":[84,1798.5,81.07,14],"act":"button","k":[{"t":"text","n":"On the News","r":[84,1797,81.07,17],"text":"On the News","font":14,"lh":17,"weight":400,"color":"9d9d9d","dec":"none"}]}]}]}]},{"n":"Transit Stats App","r":[282,148,914,847.48]},{"n":"Challenge & Impact","r":[282,1105.48,914,534]},{"n":"Key Experiences","r":[282,1749.48,914,510]},{"n":"Polishing Interactions","r":[282,2369.48,914,533.25]},{"n":"Building Out the Brand","r":[282,3012.73,914,580.01]},{"n":"Surprise Appearance on the Chicago News","r":[282,3702.74,914,281.25]},{"n":"More of My Work","r":[282,4093.99,914,340.39]},{"n":"Contact","r":[0,4514.38,1280,296]}];
const d=await figma.getNodeByIdAsync('8:2'),m=await figma.getNodeByIdAsync('8:3');
const lib=await figma.getNodeByIdAsync('14:2');
const mapped={Overview:'Transit Stats App',Impact:'Challenge & Impact',Users:'Who I Designed For','Feature Map':'Feature Mapping',Process:'Design Process',Iterations:'Design Iterations',Experiences:'Key Experiences',Interactions:'Polishing Interactions',Branding:'Building Out the Brand','AI Workflow':'Technical Workflow Using AI',Growth:'Growing the Platform','On the News':'Surprise Appearance on the Chicago News',Feedback:'User Feedback'};
const sc=(dest,type='NAVIGATE',kind='DISSOLVE',time=.28)=>({type:'NODE',navigation:type,destinationId:dest.id,transition:kind?{type:kind,easing:{type:'EASE_OUT'},duration:time}:null,resetScrollPosition:false});
const wires=[];
async function on(n,action){if(!n)return;await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[action]}]);wires.push(n.id)}
const full=d.clone();full.name='Desktop · Full';full.x=2000;full.y=0;full.resize(1280,720);full.overflowDirection='VERTICAL';
const phone=m.clone();phone.name='Mobile · Full';phone.x=2000;phone.y=1100;phone.resize(390,844);phone.overflowDirection='VERTICAL';
const short=full.clone();short.name='Desktop · TL;DR';short.x=3440;short.y=0;const positions=new Map(shortLayout.map(a=>[a.n,a.r]));
for(const child of [...short.children]){
 if(!positions.has(child.name)){child.remove();continue}
 if(child.name==='Primary navigation')continue;
 if(child.name==='Section navigation'){const newSide=draw(short,shortLayout[1],0,shortLayout[1].r[1]-163);child.remove();newSide.name='Section navigation';continue}
 child.y=positions.get(child.name)[1];
}
function pin(frame,names){for(const name of names){const node=frame.children.find(n=>n.name===name);if(node)frame.appendChild(node)}frame.numberOfFixedChildren=names.length;}
pin(full,['Section navigation','Primary navigation']);pin(short,['Section navigation','Primary navigation']);pin(phone,['Button · Ask AI','Primary navigation']);
const dark=full.clone();dark.name='Desktop · Dark';dark.x=4880;dark.y=0;dark.fills=solid('0d0d0d');
const colors={'000000':'ffffff','ffffff':'000000','f5f5f6':'0d0d0d','e8e8e8':'1e1e1e','9d9d9d':'7c7c7c','d9d9d9':'292929','292929':'d9d9d9','0d0d0d':'ffffff'};
function hex(c){return [c.r,c.g,c.b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('')}
function darken(n,media=false){
 if(n.type==='INSTANCE')return;
 for(const key of ['fills','strokes']){if(!(key in n)||!Array.isArray(n[key]))continue;
 n[key]=n[key].map(p=>{if(p.type!=='SOLID')return p;const h=hex(p.color);if(h==='e8e8e8'&&(media||n.height>165))return p;return colors[h]?{...p,color:color(colors[h])}:p})}
 if('children'in n)for(const child of n.children)darken(child,media||n.name.startsWith('Scrolling column'));
}
for(const n of dark.children)darken(n);
const overlay=figma.createFrame();overlay.name='Contact · Popover';overlay.x=6400;overlay.y=0;overlay.resize(menu.r[2],menu.r[3]);overlay.fills=solid('ffffff');overlay.cornerRadius=14;overlay.clipsContent=false;
overlay.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:.11},offset:{x:0,y:3},radius:18,spread:0,visible:true,blendMode:'NORMAL'}];
for(const p of menu.all){const rgba=p.color.match(/[\d.]+/g).slice(0,3).map(x=>Number(x).toString(16).padStart(2,'0')).join('');if(p.tag==='span'&&p.text)draw(overlay,{t:'text',n:p.text,r:p.r,font:parseFloat(p.size),lh:p.r[3],weight:parseInt(p.weight),color:rgba,text:p.text},0,0);if(p.tag==='svg')draw(overlay,{t:'svg',n:'Icon',r:p.r,svg:p.svg.replace(/currentColor/g,p.color)},0,0)}
for(const p of menu.all.filter(x=>x.tag==='a'||x.tag==='button')){const hit=figma.createFrame();overlay.appendChild(hit);hit.name=p.aria||p.text;hit.resize(p.r[2],p.r[3]);hit.x=p.r[0];hit.y=p.r[1];hit.fills=[];if(p.url)await on(hit,{type:'URL',url:p.url,openInNewTab:true});if(p.aria==='Close contact')await on(hit,{type:'CLOSE'});made.push(hit.id)}

for(const f of [full,short,dark,phone]){
 const menuBar=f.children.find(x=>x.name==='Primary navigation');
 const sidebar=f.children.find(x=>x.name==='Section navigation');
 for(const n of sidebar?sidebar.findAll(n=>n.name.startsWith('Button · ')):[]){
  const title=n.name.slice(9),dest=f.children.find(x=>x.name===mapped[title]);
  if(dest){const anchor=figma.createRectangle();f.insertChild(0,anchor);anchor.name='Anchor · '+title;anchor.resize(1,1);anchor.x=0;anchor.y=Math.max(0,dest.y-96);anchor.fills=[];await on(n,sc(anchor,'SCROLL_TO','SCROLL_ANIMATE',.48));made.push(anchor.id)}
  if(title==='Full'&&f===short)await on(n,sc(full));if(title==='TL;DR'&&f!==short)await on(n,sc(short));
  if(title==='Back')await on(n,{type:'URL',url:'https://charleshonig.design/',openInNewTab:true});
 }
 for(const b of menuBar.findAll(n=>n.name.startsWith('Button · '))){
  if(b.name.includes('Switch to')&&f!==phone)await on(b,sc(f===dark?full:dark));
  if(b.name==='Button · Contact'||b.name==='Button · Open contact')await on(b,{...sc(overlay,'OVERLAY'),overlayRelativePosition:{x:f===phone?7:679,y:64}});
  if(/Button · [hH]Home$/.test(b.name))await on(b,{type:'URL',url:'https://charleshonig.design/',openInNewTab:true});
 }
 const links=f.findAll(n=>linkMap[n.name]&&n.type==='FRAME');for(const l of links)await on(l,{type:'URL',url:linkMap[l.name],openInNewTab:true});
}
const starts=[];
for(const [root,x,y,title] of [[full,3440,1100,'Desktop · Start'],[phone,3980,2200,'Mobile · Start']]){
 const start=figma.createFrame();start.name=title;start.resize(root.width,root.height);start.x=x;start.y=y;start.fills=root.fills;start.clipsContent=true;
 for(const n of root.children){if(n.name.startsWith('Anchor')||n.y>root.height)continue;const c=n.clone();start.appendChild(c);c.x=n.x;c.y=n.y;
 if(n.name==='Transit Stats App'){c.opacity=0;c.y+=24}
 }
 await start.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:.06},actions:[sc(root,'NAVIGATE','SMART_ANIMATE',.62)]}]);
 starts.push(start.id)
}
page.flowStartingPoints=[...page.flowStartingPoints,{nodeId:starts[0],name:'Desktop · Transit Stats'},{nodeId:starts[1],name:'Mobile · Transit Stats'}];
const launch=await figma.getNodeByIdAsync(starts[0]);launch.setPluginData('transitStatsPrototype','desktop-start');page.selection=[launch];figma.viewport.scrollAndZoomIntoView([launch]);


} catch(error) {
 for(const child of [...wanted.children])if(!before.has(child.id))child.remove();
 wanted.flowStartingPoints=flowsBefore;await figma.setCurrentPageAsync(previous);throw error;
}

}
assemble().then(()=>figma.closePlugin("Transit Stats 演示流程已就绪")).catch(error=>figma.closePlugin(String(error.message||error)));
