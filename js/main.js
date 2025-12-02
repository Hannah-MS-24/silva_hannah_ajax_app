(() => {

  // Variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const materialLoader = document.querySelector("#material-loader");
  const materialError = document.querySelector("#material-error");
  const infoboxError = document.querySelector("#infobox-error");

  // Static material data (fallback)
  const materialListData = [
    {
      heading: "Precision-Crafted Polymers",
      description: "Our earbuds are meticulously molded from high-quality plastics, ensuring a blend of elegance, comfort, and resilience that's second to none."
    },
    {
      heading: "Luxurious Silicone Harmony",
      description: "Our uniquely engineered ear tips are cocooned in plush silicone, delivering an opulent embrace for your ears, ensuring an unrivaled fit and exquisite audio experience."
    },
    {
      heading: "Rubberized Cables",
      description: "Experience the unparalleled freedom of movement with our flexible rubber cables that promise durability without compromise."
    },
    {
      heading: "Enhanced Comfort Sensors",
      description: "A touch of magic in the form of built-in microphones and sensors empowers your earbuds to obey your every command, making your audio journey seamless and enchanting."
    },
    {
      heading: "Artistic Mesh Guard",
      description: "Shielded by artful mesh screens, our speakers remain untarnished, keeping your listening experience pristine."
    }
  ];

  // LOAD INFO BOXES (HOTSPOTS)
  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes") 
      .then(response => {
        if (!response.ok) throw new Error("Failed to load info boxes.");
        return response.json();
      })
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {

          // CORREÇÃO: Selecionar o botão do hotspot
          const hotspot = document.querySelector(`button[slot="hotspot-${index + 1}"]`);
          if (!hotspot) return;

          const annotation = hotspot.querySelector(".HotspotAnnotation");

          annotation.innerHTML = "";

          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;

          annotation.appendChild(titleElement);
          annotation.appendChild(textElement);
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
        // FALLBACK
        materialList.innerHTML = "";
        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);
          clone.querySelector(".material-heading").textContent = material.heading;
          clone.querySelector(".material-description").textContent = material.description;
          materialList.appendChild(clone);
        });
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

  // HOTSPOT HOVER ANIMATION
  function showInfo() {
    const annotation = this.querySelector(".HotspotAnnotation");
    gsap.to(annotation, { autoAlpha: 1, duration: 0.4 });
  }

  function hideInfo() {
    const annotation = this.querySelector(".HotspotAnnotation");
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
