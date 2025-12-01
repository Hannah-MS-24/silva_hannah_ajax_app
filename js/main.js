(() => {
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const materialLoader = document.querySelector("#material-loader");
  const materialError = document.querySelector("#material-error");

  const infoboxError = document.querySelector("#infobox-error");

 
  // LOAD INFO BOXES

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load info boxes.");
        return response.json();
      })
      .then(infoBoxes => {
        infoBoxes.forEach((info, index) => {
          let hotspot = document.querySelector(`#hotspot-${index + 1}`);

          const title = document.createElement("h2");
          title.textContent = info.heading;

          const desc = document.createElement("p");
          desc.textContent = info.description;

          hotspot.querySelector(".HotspotAnnotation").append(title, desc);
        });
      })
      .catch(() => {
        infoboxError.classList.remove("hidden");
      });
  }

 
  // LOAD MATERIALS

  function loadMaterialInfo() {
    showLoader();

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load materials.");
        return response.json();
      })
      .then(materials => {
        materialList.innerHTML = "";

        materials.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

          clone.querySelector(".material-heading").textContent = material.heading;
          clone.querySelector(".material-description").textContent = material.description;

          materialList.appendChild(clone);
        });

        materialList.classList.remove("hidden");
      })
      .catch(() => {
        materialError.classList.remove("hidden");
      })
      .finally(() => hideLoader());
  }

 
  function showLoader() {
    materialLoader.classList.remove("hidden");
    materialList.classList.add("hidden");
    materialError.classList.add("hidden");
  }

  function hideLoader() {
    materialLoader.classList.add("hidden");
  }

  function showInfo() {
    let annotation = this.querySelector(".HotspotAnnotation");
    gsap.to(annotation, { autoAlpha: 1, duration: 0.4 });
  }

  function hideInfo() {
    let annotation = this.querySelector(".HotspotAnnotation");
    gsap.to(annotation, { autoAlpha: 0, duration: 0.4 });
  }

  hotspots.forEach(h => {
    h.addEventListener("mouseenter", showInfo);
    h.addEventListener("mouseleave", hideInfo);
  });

  // INIT
  loadInfoBoxes();
  loadMaterialInfo();

})();
