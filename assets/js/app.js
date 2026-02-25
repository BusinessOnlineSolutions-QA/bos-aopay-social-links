const DATA = {
  bos: [
    { type:"instagram", label:"Instagram", sub:"@boscenter.in",       href:"https://www.instagram.com/boscenter.in/?hl=en" },
    { type:"linkedin",  label:"LinkedIn",  sub:"BOS Center Pvt. Ltd.", href:"https://www.linkedin.com/company/bos-center-pvt-ltd" },
    { type:"facebook",  label:"Facebook",  sub:"BOS Center",          href:"https://www.facebook.com/BOSCenterIND" },
    { type:"twitter",   label:"Twitter / X", sub:"@boscenterin",      href:"https://x.com/boscenterin" }
  ],
  aopay: [
    { type:"instagram", label:"Instagram", sub:"@aopaytechnology",     href:"https://www.instagram.com/aopaytechnology" },
    { type:"linkedin",  label:"LinkedIn",  sub:"AOPay Technology",     href:"https://www.linkedin.com/company/aopay-technology/" },
    { type:"facebook",  label:"Facebook",  sub:"AOPAY",               href:"https://www.facebook.com/aopaytechnology/" },
    { type:"twitter",   label:"Twitter / X", sub:"@AopayTechnology",  href:"https://x.com/AopayTechnology" }
  ]
};

const ICONS = {
  instagram: "assets/icons/instagram.png",
  linkedin:  "assets/icons/linkedin.png",
  facebook:  "assets/icons/facebook.png",
  twitter:   "assets/icons/twitter.png"
};

const $ = (id) => document.getElementById(id);

function toast(msg){
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function buildSocial(item){
  const a = document.createElement("a");
  a.className = "sbtn";
  a.href = item.href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";

  const left = document.createElement("div");
  left.className = "sleft";

  const icon = document.createElement("div");
  icon.className = "sicon";

  const img = document.createElement("img");
  img.src = ICONS[item.type] || "";
  img.alt = item.label + " icon";
  img.loading = "lazy";
  img.decoding = "async";
  icon.appendChild(img);

  const text = document.createElement("div");
  text.className = "stext";

  const b = document.createElement("b");
  b.textContent = item.label;

  const sm = document.createElement("small");
  sm.textContent = item.sub;

  text.appendChild(b);
  text.appendChild(sm);

  left.appendChild(icon);
  left.appendChild(text);

  const go = document.createElement("div");
  go.className = "go";
  go.textContent = "›";

  a.appendChild(left);
  a.appendChild(go);
  return a;
}

(function init(){
  $("year").textContent = new Date().getFullYear();

  const bosWrap = $("bosSocials");
  const aopWrap = $("aopaySocials");
  bosWrap.innerHTML = "";
  aopWrap.innerHTML = "";

  DATA.bos.forEach(i => bosWrap.appendChild(buildSocial(i)));
  DATA.aopay.forEach(i => aopWrap.appendChild(buildSocial(i)));

  $("copyBtn").addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied.");
    }catch(e){
      toast("Copy failed. Copy from address bar.");
    }
  });

  $("shareBtn").addEventListener("click", async () => {
    const shareData = {
      title: "Official Social Links — BOS & AOPAY",
      text: "Follow our official pages for updates.",
      url: window.location.href
    };

    try{
      if (navigator.share){
        await navigator.share(shareData);
      }else{
        await navigator.clipboard.writeText(window.location.href);
        toast("Share not supported. Link copied.");
      }
    }catch(e){
      toast("Share cancelled.");
    }
  });
})();
