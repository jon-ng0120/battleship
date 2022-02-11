(()=>{"use strict";const e=e=>{for(let t=1;t<=10;t++)for(let r=1;r<=10;r++){const o=document.createElement("div");o.setAttribute("xy-coord",`${r}-${t}`),e.appendChild(o)}};document.querySelectorAll(".drag-item").forEach((e=>{e.addEventListener("dragstart",(t=>{e.classList.add("dragging"),t.dataTransfer.setData("ShipName",t.target.id),t.dataTransfer.setData("ShipAxis",t.target.getAttribute("data-axis"))}))})),document.querySelectorAll(".drag-item").forEach((e=>{e.addEventListener("dragend",(()=>{e.classList.remove("dragging")}))}));const t=(e,t,r,o)=>{const a=o.querySelector(`[xy-coord="${e}-${t}"]`),i=e-1,s=t-1;"object"==typeof r.gameboard.grid[s][i]?a.style.backgroundColor="#FF7760":a.style.backgroundColor="#0082FF"},r=e=>{const t=document.querySelector("#gameover-overlay"),r=document.querySelector("#winner-text");t.style.display="flex",r.textContent=`${e} wins!`},o=class{constructor(e){this.name=e,this.gameboard=new class{constructor(){this.grid=this.createGrid(),this.ships=this.createShips()}createShips=()=>[{name:"carrier",length:5},{name:"battleship",length:4},{name:"destroyer",length:3},{name:"submarine",length:3},{name:"patrol-boat",length:2}].map((e=>new class{constructor(e,t){this.name=e,this.length=t,this.sunk=!1,this.sectionsHit=Array(t).fill(""),this.placed=!1}hit=e=>{this.sectionsHit[e-1]="x",this.isSunk()};isSunk=()=>{this.sectionsHit.every((e=>"x"==e))&&(this.sunk=!0)}}(e.name,e.length)));createGrid=()=>{const e=[];for(let t=0;t<10;t++){e.push([]);for(let r=0;r<10;r++)e[t].push("")}return e};placeShip=(e,t,r,o)=>{const a=r-1,i=t-1;if(this.checkForEnoughSpace(a,i,e.length,o)&&this.checkForExistingShip(a,i,e.length,o)){for(let t=0;t<e.length;t++)"x"==o?this.grid[i][a+t]={ship:e,position:t+1}:"y"==o&&(this.grid[i+t][a]={ship:e,position:t+1});return e.placed=!0,!0}};checkForExistingShip=(e,t,r,o)=>{if("x"==o)return this.grid[t].slice(e,e+r).every((e=>""==e));if("y"==o){const o=[];for(let a=0;a<r;a++)o.push(this.grid[t+a][e]);return o.every((e=>""==e))}};checkForEnoughSpace=(e,t,r,o)=>"x"==o?this.grid[t].slice(e,e+r).length==r:"y"==o?t+r<=10:void 0;receiveAttack=(e,t)=>{const r=e-1,o=t-1;if("object"==typeof this.grid[o][r]){const e=this.grid[o][r].ship,t=this.grid[o][r].position;e.hit(t)}else this.grid[o][r]="x"};checkAllShipsSunk=()=>this.ships.every((e=>e.sunk))}}randomShipPlacement=()=>{this.gameboard.ships.forEach((e=>{let t=Math.floor(10*Math.random())+1,r=Math.floor(10*Math.random())+1,o=Math.random()>.5?"x":"y";for(;!1===e.placed;)this.gameboard.placeShip(e,t,r,o),t=Math.floor(10*Math.random())+1,r=Math.floor(10*Math.random())+1,o=Math.random()>.5?"x":"y"}))}},a=document.querySelector("#gameboard-1"),i=document.querySelector("#gameboard-2"),s=new o("Jon"),n=new o("Cpu");n.randomShipPlacement(),e(a),e(i);const c=Array.from(a.querySelectorAll("div")).map((e=>e.getAttribute("xy-coord")));var l,d;d=s,(l=a).querySelectorAll("[xy-coord]").forEach((e=>{e.addEventListener("dragover",(e=>{e.preventDefault()})),e.addEventListener("drop",(t=>{const r=t.dataTransfer.getData("ShipName"),o=t.dataTransfer.getData("ShipAxis"),a=((e,t)=>t.gameboard.ships.find((t=>t.name==e)))(r,d),[i,s]=e.getAttribute("xy-coord").split("-");d.gameboard.placeShip(a,s,i,o)&&(((e,t)=>{const r=t.gameboard.grid;for(let t=0;t<r.length;t++)for(let o=0;o<r[t].length;o++)"object"==typeof r[t][o]&&(e.querySelector(`[xy-coord="${o+1}-${t+1}"]`).style.backgroundColor="#ecfbff")})(l,d),document.querySelector(".dragging").style.display="none",(()=>{const e=document.querySelector("#gameboard-2"),t=document.querySelector("#drag-item-container");if(Array.from(t.querySelectorAll(".drag-item")).every((e=>"none"==e.style.display))){const r=document.querySelector("#rotate-btn");t.style.display="none",e.style.display="grid",r.style.display="none"}})())}))})),document.querySelector("#rotate-btn").addEventListener("click",(()=>{(()=>{const e=document.querySelector("#rotate-btn");"x"==e.getAttribute("data-rotation")?((()=>{const e=document.querySelector("#ships-container");e.querySelectorAll(".drag-item").forEach((e=>{const t=e.offsetWidth;e.style.height=t/16+"rem",e.style.width="2.5rem",e.style.flexDirection="column",e.setAttribute("data-axis","y")})),e.style.flexDirection="row"})(),e.setAttribute("data-rotation","y")):((()=>{const e=document.querySelector("#ships-container");e.querySelectorAll(".drag-item").forEach((e=>{const t=e.offsetHeight;e.style.height="2.5rem",e.style.width=t/16+"rem",e.style.flexDirection="row",e.setAttribute("data-axis","x")})),e.style.flexDirection="column"})(),e.setAttribute("data-rotation","x"))})()})),i.querySelectorAll("[xy-coord]").forEach((e=>{e.addEventListener("click",(e=>{if(""==e.target.style.backgroundColor){const[o,l]=e.target.getAttribute("xy-coord").split("-");t(o,l,n,i),n.gameboard.receiveAttack(o,l);const d=c[Math.floor(Math.random()*c.length)],h=c.findIndex((e=>e==d)),[g,u]=d.split("-");s.gameboard.receiveAttack(g,u),c.splice(h,1),t(g,u,s,a),s.gameboard.checkAllShipsSunk()?r("CPU"):n.gameboard.checkAllShipsSunk()&&r("Player 1")}}))}))})();