
const raw = `
Hydrogen|H|1.008
Helium|He|4.0026
Lithium|Li|6.94
Beryllium|Be|9.0122
Boron|B|10.81
Carbon|C|12.011
Nitrogen|N|14.007
Oxygen|O|15.999
Fluorine|F|18.998
Neon|Ne|20.180
Sodium|Na|22.990
Magnesium|Mg|24.305
Aluminium|Al|26.982
Silicon|Si|28.085
Phosphorus|P|30.974
Sulfur|S|32.06
Chlorine|Cl|35.45
Argon|Ar|39.948
Potassium|K|39.098
Calcium|Ca|40.078
Scandium|Sc|44.956
Titanium|Ti|47.867
Vanadium|V|50.942
Chromium|Cr|51.996
Manganese|Mn|54.938
Iron|Fe|55.845
Cobalt|Co|58.933
Nickel|Ni|58.693
Copper|Cu|63.546
Zinc|Zn|65.38
Gallium|Ga|69.723
Germanium|Ge|72.630
Arsenic|As|74.922
Selenium|Se|78.971
Bromine|Br|79.904
Krypton|Kr|83.798
Rubidium|Rb|85.468
Strontium|Sr|87.62
Yttrium|Y|88.906
Zirconium|Zr|91.224
Niobium|Nb|92.906
Molybdenum|Mo|95.95
Technetium|Tc|98
Ruthenium|Ru|101.07
Rhodium|Rh|102.91
Palladium|Pd|106.42
Silver|Ag|107.87
Cadmium|Cd|112.41
Indium|In|114.82
Tin|Sn|118.71
Antimony|Sb|121.76
Tellurium|Te|127.60
Iodine|I|126.90
Xenon|Xe|131.29
Caesium|Cs|132.91
Barium|Ba|137.33
Lanthanum|La|138.91
Cerium|Ce|140.12
Praseodymium|Pr|140.91
Neodymium|Nd|144.24
Promethium|Pm|145
Samarium|Sm|150.36
Europium|Eu|151.96
Gadolinium|Gd|157.25
Terbium|Tb|158.93
Dysprosium|Dy|162.50
Holmium|Ho|164.93
Erbium|Er|167.26
Thulium|Tm|168.93
Ytterbium|Yb|173.05
Lutetium|Lu|174.97
Hafnium|Hf|178.49
Tantalum|Ta|180.95
Tungsten|W|183.84
Rhenium|Re|186.21
Osmium|Os|190.23
Iridium|Ir|192.22
Platinum|Pt|195.08
Gold|Au|196.97
Mercury|Hg|200.59
Thallium|Tl|204.38
Lead|Pb|207.2
Bismuth|Bi|208.98
Polonium|Po|209
Astatine|At|210
Radon|Rn|222
Francium|Fr|223
Radium|Ra|226
Actinium|Ac|227
Thorium|Th|232.04
Protactinium|Pa|231.04
Uranium|U|238.03
Neptunium|Np|237
Plutonium|Pu|244
Americium|Am|243
Curium|Cm|247
Berkelium|Bk|247
Californium|Cf|251
Einsteinium|Es|252
Fermium|Fm|257
Mendelevium|Md|258
Nobelium|No|259
Lawrencium|Lr|266
Rutherfordium|Rf|267
Dubnium|Db|268
Seaborgium|Sg|269
Bohrium|Bh|270
Hassium|Hs|277
Meitnerium|Mt|278
Darmstadtium|Ds|281
Roentgenium|Rg|282
Copernicium|Cn|285
Nihonium|Nh|286
Flerovium|Fl|289
Moscovium|Mc|290
Livermorium|Lv|293
Tennessine|Ts|294
Oganesson|Og|294
`.trim();

const elements = raw.split("\n").map((line, index) => {
  const [name, symbol, mass] = line.split("|");
  return {
    number: index + 1,
    name, symbol, mass,
    period: 0,
    group: 0,
    category: ""
  };
});

const alkali = [3,11,19,37,55,87];
const alkaline = [4,12,20,38,56,88];
const noble = [2,10,18,36,54,86,118];
const nonmetals = [1,6,7,8,15,16,34];
const halogens = [9,17,35,53,85,117];
const metalloids = [5,14,32,33,51,52,84];
const postTransition = [13,31,49,50,81,82,83,113,114,115,116];
const lanthanides = Array.from({length:15},(_,i)=>57+i);
const actinides = Array.from({length:15},(_,i)=>89+i);

function category(z) {
  if (alkali.includes(z)) return "Alkali metal";
  if (alkaline.includes(z)) return "Alkaline earth metal";
  if (noble.includes(z)) return "Noble gas";
  if (halogens.includes(z)) return "Halogen";
  if (metalloids.includes(z)) return "Metalloid";
  if (nonmetals.includes(z)) return "Nonmetal";
  if (lanthanides.includes(z)) return "Lanthanide";
  if (actinides.includes(z)) return "Actinide";
  if (postTransition.includes(z)) return "Post-transition metal";
  return "Transition metal";
}

elements.forEach(e => e.category = category(e.number));

const table = document.getElementById("periodicTable");
const series = document.getElementById("seriesTable");
const legend = document.getElementById("legend");
const search = document.getElementById("search");
const resultCount = document.getElementById("resultCount");

const mainPositions = [
  [1,1,1],[2,1,18],
  [3,2,1],[4,2,2],[5,2,13],[6,2,14],[7,2,15],[8,2,16],[9,2,17],[10,2,18],
  [11,3,1],[12,3,2],[13,3,13],[14,3,14],[15,3,15],[16,3,16],[17,3,17],[18,3,18]
];

// Periods 4 and 5
for(let z=19;z<=36;z++) mainPositions.push([z,4,z-18]);
for(let z=37;z<=54;z++) mainPositions.push([z,5,z-36]);

// Period 6: leave space for lanthanides
mainPositions.push([55,6,1],[56,6,2]);
for(let z=72;z<=86;z++) mainPositions.push([z,6,z-68]);

// Period 7: leave space for actinides
mainPositions.push([87,7,1],[88,7,2]);
for(let z=104;z<=118;z++) mainPositions.push([z,7,z-100]);

elements.forEach(e => {
  if(e.number >= 57 && e.number <= 71) {
    e.period = 6;
    e.group = e.number - 54;
  } else if(e.number >= 89 && e.number <= 103) {
    e.period = 7;
    e.group = e.number - 86;
  }
});

function colorFor(category) {
  const colors = {
    "Alkali metal":"#ff6b83",
    "Alkaline earth metal":"#ffa45c",
    "Transition metal":"#f7ca68",
    "Post-transition metal":"#a6df86",
    "Metalloid":"#53d6b5",
    "Nonmetal":"#55d7ed",
    "Halogen":"#66a8ff",
    "Noble gas":"#b59bff",
    "Lanthanide":"#ff91cf",
    "Actinide":"#ee8b9b"
  };
  return colors[category] || "#8ba7ca";
}

function makeTile(e, row, col, container) {
  const button = document.createElement("button");
  button.className = "element";
  button.style.gridRow = row;
  button.style.gridColumn = col;
  button.style.setProperty("--ec", colorFor(e.category));
  button.title = `${e.name} (${e.symbol})`;

  button.innerHTML = `
    <span class="num">${e.number}</span>
    <span class="symbol">${e.symbol}</span>
    <span class="ename">${e.name}</span>
  `;

  button.addEventListener("mouseenter", () => showDetails(e));
  button.addEventListener("focus", () => showDetails(e));
  button.addEventListener("click", () => {
    document.querySelectorAll(".element.selected")
      .forEach(el => el.classList.remove("selected"));
    button.classList.add("selected");
    showDetails(e);
    document.getElementById("details").scrollIntoView({
      behavior: "smooth", block: "nearest"
    });
  });

  button.dataset.number = e.number;
  button.dataset.name = e.name.toLowerCase();
  button.dataset.symbol = e.symbol.toLowerCase();
  container.appendChild(button);
}

mainPositions.forEach(([z,row,col]) => {
  const e = elements[z-1];
  e.period = row;
  e.group = col;
  makeTile(e,row,col,table);
});

lanthanides.forEach((z,i) =>
  makeTile(elements[z-1],1,i+1,series)
);
actinides.forEach((z,i) =>
  makeTile(elements[z-1],2,i+1,series)
);

// Category legend
const categories = [...new Set(elements.map(e=>e.category))];
categories.forEach(name => {
  const item = document.createElement("div");
  item.className = "legend-item";
  item.innerHTML = `<i style="--ec:${colorFor(name)}"></i>${name}`;
  legend.appendChild(item);
});

// Wikipedia image cache
const imageCache = new Map();
let activeElement = null;
let requestId = 0;

async function showDetails(e) {
  activeElement = e;
  const currentRequest = ++requestId;

  document.getElementById("detailName").textContent = e.name;
  document.getElementById("detailCategory").textContent = e.category;
  document.getElementById("detailSymbol").textContent = e.symbol;
  document.getElementById("detailNumber").textContent = e.number;
  document.getElementById("detailMass").textContent = e.mass;
  document.getElementById("detailPeriod").textContent =
    e.period || (e.number <= 2 ? 1 : "—");
  document.getElementById("detailGroup").textContent =
    e.group || "f-block";
  document.getElementById("imageCaption").textContent =
    `${e.symbol} · ${e.name.toUpperCase()}`;

  const description = document.getElementById("detailDescription");
  const img = document.getElementById("elementImage");
  const link = document.getElementById("wikiLink");

  description.textContent =
    `Element ${e.name} has atomic number ${e.number}. ` +
    `It belongs to the ${e.category.toLowerCase()} category.`;

  link.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(e.name)}`;

  // Avoid showing the previous element's photo while loading.
  img.src = "https://placehold.co/400x300/111a2b/8aa8d8?text=Loading...";
  img.alt = `${e.name} image loading`;

  if(imageCache.has(e.number)) {
    const info = imageCache.get(e.number);
    applyWikiInfo(info,e,currentRequest);
    return;
  }

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(e.name)}`;
    const response = await fetch(url);
    if(!response.ok) throw new Error("Image unavailable");

    const data = await response.json();
    const info = {
      image: data.thumbnail?.source || "",
      description: data.extract || ""
    };

    imageCache.set(e.number,info);
    applyWikiInfo(info,e,currentRequest);
  } catch(error) {
    if(currentRequest !== requestId) return;
    img.src = `https://placehold.co/400x300/111a2b/8aa8d8?text=${encodeURIComponent(e.symbol)}`;
    description.textContent +=
      " The image or extended description could not load. Check your internet connection.";
  }
}

function applyWikiInfo(info,e,id) {
  if(id !== requestId || activeElement !== e) return;

  const img = document.getElementById("elementImage");
  if(info.image) {
    img.src = info.image;
    img.alt = `${e.name} scientific image`;
  } else {
    img.src = `https://placehold.co/400x300/111a2b/8aa8d8?text=${encodeURIComponent(e.symbol)}`;
    img.alt = `${e.name} placeholder`;
  }

  if(info.description) {
    document.getElementById("detailDescription").textContent =
      info.description;
  }
}

// Live search by name, symbol, or atomic number
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  let matches = 0;

  document.querySelectorAll(".element").forEach(tile => {
    const match = !query ||
      tile.dataset.name.includes(query) ||
      tile.dataset.symbol.includes(query) ||
      tile.dataset.number === query;

    tile.classList.toggle("dimmed",!match);
    if(match) matches++;
  });

  resultCount.textContent = `${matches} ELEMENT${matches === 1 ? "" : "S"} FOUND`;
});

document.getElementById("clearSearch").addEventListener("click", () => {
  search.value = "";
  search.dispatchEvent(new Event("input"));
  search.focus();
});

showDetails(elements[0]);
