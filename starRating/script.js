class StarRatingWidget {
  constructor() {
    this.dataRateElementId = "";
    this.loadStyle();
    this.ratedElementSelector = null;
    this.starColor = "yellow";
    this.position = ["bottom", "left"];
    this.callback = () => {};
    this.totalNumberOfStars = 10;
    this.starIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    this._init();
  }

  loadStyle() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "style.css";
    document.head.appendChild(link);
  }

  setDataRateElementId(datasetAtttribute) {
    const ratedElemets = document.querySelectorAll(datasetAtttribute);
    if (ratedElemets.length == 0) throw new Error(`Component with ${datasetAtttribute} dataset not found`);
    this.dataRateElementId = datasetAtttribute;
    return this;
  }

  setRetedElementSelector(selector) {
    const found = document.querySelectorAll(selector);
    if (found.length == 0) throw new Error(`Component with ${selector} selector not found`);
    this.ratedElementSelector = found;
    return this;
  }

  setTotalNumberOfStars(number) {
    if (!number || typeof number !== "number" || number < 2) throw new Error(`${number} must be positive number`);
    this.totalNumberOfStars = number;
    return this;
  }

  setCallback(f) {
    if (!f || typeof f !== "function")
      throw new Error(
        `${f} must be a function that accepts @params (rate:number, total:number, userId:string, ratedObjectId: string)`
      );
    this.callback = f;
    return this;
  }

  build() {
    return this;
  }

  //create and populate rating widgets
  _populateRateWidgets() {
    this.ratedElementSelector.forEach((ratedComponent) => {
      const container = document.createElement("div");
      container.classList.add("rateWidget-container");
      for (let i = 0; i < this.totalNumberOfStars; i++) {
        if (ratedComponent.dataset?.totalRate) {
          container.innerHTML = `Total rate ${ratedComponent.dataset?.totalRate} / ${this.totalNumberOfStars}`;
        } else {
          const starBtn = document.createElement("button");
          starBtn.innerHTML = this.starIcon;
          starBtn.setAttribute("aria-label", `rate ${i + 1} out of ${this.totalNumberOfStars}`);
          container.appendChild(starBtn);
        }
      }
      ratedComponent.appendChild(container);
    });
  }

  _addWidgetLogic() {
    const containers = document.querySelectorAll(".rateWidget-container");
    let selectedIndex = null;

    containers.forEach((container) => {
      container.addEventListener("click", (e) => {
        const selectedBtn = e.target.closest("button");
        if (!selectedBtn) return;

        const ratedComponent = container.parentElement;
        const conatinerArr = Array.from(container.children);
        selectedIndex = conatinerArr.indexOf(selectedBtn);

        //mark stars
        for (let starBtn of conatinerArr) {
          starBtn.querySelector("svg").classList.add("selected");
          if (starBtn == selectedBtn) break;
        }

        //update rating remote receive total rating per ratedElement
        container.append(" Accepted");

        this.callback(selectedIndex + 1, this.totalNumberOfStars, "userId", ratedComponent.dataset.rateElementId).then(
          (totalRating) => {
            container.innerHTML = `Total rate ${totalRating} / ${this.totalNumberOfStars}`;
          }
        );
      });
    });
  }

  _init() {
    document.addEventListener("DOMContentLoaded", () => {
      this._populateRateWidgets();
      this._addWidgetLogic();
    });
  }
}

// #########################
const ratingWidget = new StarRatingWidget();

const callbackFunctionExample = (a, b, c, d) =>
  new Promise((res, rej) =>
    setTimeout(() => {
      console.log(a, b, c, d);
      res(Math.floor(Math.random() * 10));
    }, 1000)
  );

const widget = ratingWidget
  .setRetedElementSelector(".article, .comment")
  .setDataRateElementId("[data-rate-element-id]")
  .setCallback(callbackFunctionExample)
  .setTotalNumberOfStars(10)
  .build();
