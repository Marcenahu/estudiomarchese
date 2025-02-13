const fs = require("fs");
const path = ".";
const studioId = "q6gigotc";
const studioDataset = "production";

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

function makeImgUrl(ref) {
  const parts = ref.split("-");
  const id = parts[1];
  const dimentions = parts[2];
  const format = parts[3];
  const optimizedSize = "&w=600";
  return `https://cdn.sanity.io/images/${studioId}/${studioDataset}/${id}-${dimentions}.${format}?fm=webp${optimizedSize}`;
}
const generateHtml = (data) => {
  const principal = data.filter((element) => element._type === "principal");
  const contact = data.filter((element) => element._type === "contact");
  const services = data.filter((element) => element._type === "services");
  const brand = data.filter((element) => element._type === "brand");

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./index.css" />
    <link rel="manifest" href="./manifest.json" />
    <link rel="apple-touch-icon" href="./favicon.ico" />
    <link rel="icon" type="image/x-icon" href="./favicon.ico" />
    <title>${brand[0].title}</title>
    <meta
      name="description"
      content="Estudio contable especializado en asesoramiento integral, impuestos y gestión financiera para empresas y profesionales. Soluciones confiables y personalizadas."
    />
    <link rel="canonical" href="https://estudiomarchese.ar" />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://estudiomarchese.ar" />
    <meta property="og:title" content=${brand[0].title} />
    <meta
      property="og:description"
      content="Estudio contable especializado en asesoramiento integral, impuestos y gestión financiera para empresas y profesionales. Soluciones confiables y personalizadas."
    />
    <meta property="og:image" content="https://estudiomarchese.ar/share.webp" />
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://estudiomarchese.ar/" />
    <meta name="twitter:title" content=${brand[0].title} />
    <meta
      name="twitter:description"
      content="Estudio contable especializado en asesoramiento integral, impuestos y gestión financiera para empresas y profesionales. Soluciones confiables y personalizadas."
    />
    <meta
      name="twitter:image"
      content="https://estudiomarchese.ar/share.webp"
    />
  </head>
  <body>
    <header class="header">
      <div class="logoContainer">
        <img
          src=${makeImgUrl(brand[0].image.asset._ref)}
          class="logo"
          alt=${brand[0].title}
        />
        <h2 class="brand">${brand[0].title.replace(
          "Marchese",
          "Marchese<br>"
        )}</h2>
      </div>
      <nav class="navBar">
        <a href="#services">Servicios</a>
        <a href="#contact" class="button">
          <svg
            class="fill"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
              fill="#fff"
            />
          </svg>
          Contactanos
        </a>
      </nav>
      <nav class="navMobile">
        <input type="checkbox" id="navButton" />
        <ul class="menu">
          <li>
            <a href="#services">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="iconStroke"
                  d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 15H9M15 11H9"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Servicios
            </a>
          </li>
          <li>
            <a href="#contact">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="iconStroke"
                  d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Contacto
            </a>
          </li>
        </ul>
        <label for="navButton" class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </nav>
    </header>
    <main>
      <div class="loader" id="heroLoader" style="display: none"></div>
      <div class="hero fade-in" id="hero">
        <img id="heroImage" src="${makeImgUrl(
          principal[0].image.asset._ref
        )}" alt=${brand[0].title} />
        <div class="heroText">
          <h1 id="heroTitle">${principal[0].title}</h1>
          <p id="heroSubtitle">${principal[0].subtitle}</p>
          <a href="#services" class="button"
            >Ver servicios
            <svg
              class="stroke"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="loader" id="servicesLoader" style="display: none"></div>
      <div class="servicesContainer fade-in" id="servicesContainer">
        <h2 class="title">Nuestros Servicios</h2>
        <div id="services">${services
          .map((service) => {
            return `
          <div class="card">
          <img
          loading="lazy"
          class="serviceImage"
          src=${makeImgUrl(service.image.asset._ref)}
          />
          <div class="textContainer">
          <h3>${service.service}</h3>
          <ul>${service.list
            .map((item) => {
              return `<li>${item}</li>`;
            })
            .join("")}</ul>
          </div>
          </div>
          `;
          })
          .join("")}
        </div>
      </div>
      <div class="loader" id="contactLoader" style="display: none"></div>
      <div class="contactContainer fade-in" id="contactContainer">
        <h2 class="title">Contacto</h2>
        <p class="subtitle">¡Gracias por visitarnos!</p>
        <p>
          Si querés comunicarte con nosotros, a continuación encontrarás
          nuestros datos de contacto.
        </p>
        <div id="contact">
        ${contact
          .map((item) => {
            let href = item.value;
            let icon = "";
            if (item.title === "WhatsApp") {
              const number = item.value.replace(/\s+/g, "");
              href = `https://wa.me/+54${number}`;
              icon = `<svg class="fill" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#fff"/>
</svg>`;
            }
            if (item.title === "Email") {
              href = `mailto:${item.value}`;
              icon = `<svg class="stroke" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect class="rect" x="3" y="5" width="18" height="14" rx="2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
</svg>`;
            }
            return `<a
              rel="noopener noreferrer"
              target="_blank"
              class="button"
              href=${href}
            >
              ${icon} ${item.value}
            </a>
            `;
          })
          .join("")}
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="logoContainer">
        <img
          src=${makeImgUrl(brand[0].image.asset._ref)}
          class="logo"
          alt=${brand[0].title}
        />
        <h2 class="brand">
          ${brand[0].title} © 2025. Todos los derechos reservados.
        </h2>
      </div>
      <p>
        Sitio web creado por:
        <a
          href="https://wdiseñoweb.com"
          target="_blank"
          rel="noreferrer noopener"
          >Waltersdorf Lautaro</a
        >
      </p>
    </footer>
  </body>
</html>
`;

  fs.writeFileSync(`${path}/index.html`, htmlContent);
};
const fetchData = async () => {
  try {
    const response = await fetch(
      `https://${studioId}.api.sanity.io/v2021-10-21/data/query/${studioDataset}?query=${encodeURIComponent(
        `*[_type == "principal" || _type == "services" || _type == "contact" || _type == "brand"]`
      )}`
    );
    const data = await response.json();
    generateHtml(data.result);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return;
  }
};
fetchData();
