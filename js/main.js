(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  const materialListData = [
    {
      heading: "Precision-Crafted Polymers",
      description:
        "Our earbuds are meticulously molded from high-quality plastics, ensuring a blend of elegance, comfort, and resilience that's second to none.",
    },
    {
      heading: "Luxurious Silicone Harmony",
      description:
        "Our uniquely engineered ear tips are cocooned in plush silicone, delivering an opulent embrace for your ears, ensuring an unrivaled fit and exquisite audio experience.",
    },
    {
      heading: "Rubberized Cables",
      description:
        "Experience the unparalleled freedom of movement with our flexible rubber cables that promise durability without compromise.",
    },
    {
      heading: "Enhanced Comfort Sensors",
      description:
        "A touch of magic in the form of built-in microphones and sensors empowers your earbuds to obey your every command, making your audio journey seamless and enchanting.",
    },
    {
      heading: "Artistic Mesh Guard",
      description:
        "Shielded by artful mesh screens, our speakers remain untarnished, keeping your listening experience pristine.",
    },
  ];

  //functions
  function loadInfoBoxes() {
    //make AJAX call here
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        console.log(infoBoxes);

        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    const loader = document.querySelector("#loader");
    const errorMessage = document.querySelector("#error-message");

    //Show loader and hide error.
    loader.style.display = "block";
    errorMessage.style.display = "none";

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((materials) => {
        materialList.innerHTML = ""; // Clear the list before it becomes popular.

        materials.forEach((material) => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch((error) => {
        console.error("Failed to load materials:", error);
        errorMessage.style.display = "block";
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
