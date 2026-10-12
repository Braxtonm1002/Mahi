const CDN='https://images.squarespace-cdn.com/content/v1/59e16b308fd4d28547b27faa/';
const photos=[
  ['1508166146533-S3TH4IFXG6XB2MWRR4M4/FullSizeRender.jpg','Custom aquarium'],
  ['1508166152067-JZVSL0Q2IB7L870JTE5Q/IMG_0448.JPG','Aquatic habitat'],
  ['1508166149312-KUNT4ZHREQMJHPPR82ME/IMG_0457.JPG','Aquatic habitat'],
  ['1508166151495-OXY8PTKZ6Y8B5ECWHPJ0/IMG_0501.JPG','Aquatic habitat'],
  ['1508166154203-ZLF3RKHUO0VQWLDE1YGF/IMG_0518.JPG','Aquatic habitat'],
  ['1511809905909-MSL9OII9NAP3Q3QJXWAB/yachtaquarium1500g.JPG','Yacht aquarium'],
  ['1511810640468-KVCYH6AYNEXB0GZ32JLE/epson-7.jpg','Epson installation'],
  ['1511810639752-FPYDFEVDJZK63MWNNX36/epson-61.jpg','Epson installation'],
  ['1511810640340-RFALMGYM3CCGQ8WP7MSH/left+bank+conf.jpg','Left Bank conference room aquarium'],
  ['1511810760475-41M2O4ICV0O10C9BRWL3/leftbank5.jpg','Left Bank aquarium'],
  ['1511810874879-Q8S3410BF96C58C4DNDO/leftbank1.jpg','Left Bank aquarium'],
  ['1511810886695-8G63KHA22MN2CLO281UE/lowery+park+1.jpg','Lowry Park habitat'],
  ['1511810900445-G47PQ17LAAANTEQ5EUTX/Lowery+Park+manatee.jpg','Lowry Park manatee habitat'],
];
const $=s=>document.querySelector(s);
const grid=$('#grid'), lb=$('#lb'), lbImg=lb.querySelector('img');
let cur=0;

photos.forEach(([p,alt],i)=>{
  const b=document.createElement('button');
  b.className='tile'; b.setAttribute('aria-label','View photo: '+alt);
  b.innerHTML=`<img loading="lazy" src="${CDN}${p}?format=750w" alt="${alt}">`;
  b.onclick=()=>open(i);
  grid.append(b);
});

function show(i){cur=(i+photos.length)%photos.length;lbImg.src=`${CDN}${photos[cur][0]}?format=1500w`;lbImg.alt=photos[cur][1]}
function open(i){show(i);lb.hidden=false;document.body.style.overflow='hidden'}
function close(){lb.hidden=true;document.body.style.overflow=''}
lb.querySelector('.lb-x').onclick=close;
lb.querySelector('.prev').onclick=()=>show(cur-1);
lb.querySelector('.next').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(lb.hidden)return;
  if(e.key==='Escape')close(); if(e.key==='ArrowLeft')show(cur-1); if(e.key==='ArrowRight')show(cur+1)});

const nav=$('#nav'), links=$('#links'), btn=$('#menuBtn');
const onScroll=()=>nav.classList.toggle('solid',scrollY>40);
onScroll(); addEventListener('scroll',onScroll,{passive:true});
btn.onclick=()=>{const o=links.classList.toggle('open');btn.setAttribute('aria-expanded',o)};
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.setAttribute('aria-expanded',false)}));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal,.tile').forEach((el,i)=>{el.style.transitionDelay=(el.classList.contains('tile')?(i%3)*90:0)+'ms';io.observe(el)});
