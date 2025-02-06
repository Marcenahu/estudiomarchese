const studioId = "q6gigotc";
const studioDataset = "production";
const cacheData = localStorage.getItem("sanityData") || [];
const cacheTime = localStorage.getItem("cacheTime");
const now = Date.now();

const fetchData = async () => {
  try {
    const response1 = await fetch(
      `https://${studioId}.api.sanity.io/v2021-10-21/data/query/${studioDataset}?query=${encodeURIComponent(
        `*[_type == "principal"]`
      )}`
    );
    const data = await response1.json();
    cacheData.push(data);
    writeOnPage(cacheData, "principal");

    const response2 = await fetch(
      `https://${studioId}.api.sanity.io/v2021-10-21/data/query/${studioDataset}?query=${encodeURIComponent(
        `*[_type == "services"] | order(_createdAt asc)`
      )}`
    );
    const data2 = await response2.json();
    cacheData.push(data2);
    writeOnPage(cacheData, "services");

    const response3 = await fetch(
      `https://${studioId}.api.sanity.io/v2021-10-21/data/query/${studioDataset}?query=${encodeURIComponent(
        `*[_type == "contact"] | order(_createdAt asc)`
      )}`
    );
    const data3 = await response3.json();
    cacheData.push(data3);
    writeOnPage(cacheData, "contact");

    localStorage.setItem("sanityData", JSON.stringify(cacheData));
    localStorage.setItem("cacheTime", now);
    return;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("heroLoader").style.display = "none";
    document.getElementById("servicesLoader").style.display = "none";
    document.getElementById("contactLoader").style.display = "none";
    document.getElementsByTagName("main").innerHTML =
      "<p>Error al cargar los datos.</p>";
  }
};

const writeOnPage = (content, writeOn) => {
  if (writeOn == "all" || writeOn == "principal") {
    document.getElementById("heroTitle").innerHTML = content[0].result[0].title;
    document.getElementById("heroSubtitle").innerHTML =
      content[0].result[0].subtitle;
    document.getElementById("heroImage").src = makeImgUrl(
      content[0].result[0].image.asset._ref,
      true
    );
    document.getElementById("heroImage").onload = function () {
      document.getElementById("heroLoader").style.display = "none";
      document.getElementById("hero").classList.add("show");
    };
  }
  if (writeOn == "all" || writeOn == "services") {
    content[1].result.forEach((service) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const image = document.createElement("img");
      image.loading = "lazy";
      image.classList.add("serviceImage");
      image.src = makeImgUrl(service.image.asset._ref);
      card.appendChild(image);
      const textContainer = document.createElement("div");
      textContainer.classList.add("textContainer");
      card.appendChild(textContainer);
      const title = document.createElement("h3");
      title.textContent = service.service;
      textContainer.appendChild(title);
      const list = document.createElement("ul");
      service.list.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
      });
      textContainer.appendChild(list);
      document.getElementById("services").appendChild(card);
    });
    document.getElementById("servicesLoader").style.display = "none";
    document.getElementById("servicesContainer").classList.add("show");
  }
  if (writeOn == "all" || writeOn == "contact") {
    const contactContainer = document.getElementById("contact");
    content[2].result.forEach((contact) => {
      const value = contact.value;
      const anchor = document.createElement("a");
      anchor.classList.add("button");
      anchor.rel = "noopener noreferrer";
      anchor.target = "_blank";
      if (contact.title === "WhatsApp") {
        const number = contact.value.replace(/\s+/g, "");
        anchor.href = `https://wa.me/+54${number}`;
        anchor.innerHTML = `<svg class="fill" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#fff"/>
</svg>`;
      }
      if (contact.title === "Email") {
        anchor.href = `mailto:${value}`;
        anchor.innerHTML = `<svg class="stroke" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect class="rect" x="3" y="5" width="18" height="14" rx="2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
</svg>`;
      }
      const text = document.createElement("span");
      text.textContent = contact.value;
      anchor.appendChild(text);
      contactContainer.appendChild(anchor);
    });
    document.getElementById("contactLoader").style.display = "none";
    document.getElementById("contactContainer").classList.add("show");
  }
};

const renderOnPage = async () => {
  document.getElementById("heroLoader").style.display = "block";
  document.getElementById("servicesLoader").style.display = "block";
  document.getElementById("contactLoader").style.display = "block";
  if (!cacheData || !cacheTime || now - cacheTime > 604800000)
    await fetchData();
  else writeOnPage(JSON.parse(cacheData), "all");
};

renderOnPage();

// utility functions

function makeImgUrl(ref, reduced) {
  const parts = ref.split("-");
  const id = parts[1];
  const dimentions = parts[2];
  const format = parts[3];
  const optimizedSize = window.innerWidth <= 800 || reduced ? "&w=600" : "";
  return `https://cdn.sanity.io/images/${studioId}/${studioDataset}/${id}-${dimentions}.${format}?fm=webp${optimizedSize}`;
}
