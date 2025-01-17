class FormValidator {
  errors = {};
  values = {};
  fields = [];
  submitCallback = null;
  submitBtnSelectQuery = null;
  formStyles = null;

  registerField(querySelector, regex) {
    this.fields.push([querySelector, regex]);
    return this;
  }

  _configureFields() {
    for (const [querySelector, r] of this.fields) {
      const field = document.querySelector(querySelector);
      if (!field) throw new Error(`No DOM element found with ${querySelector} name`);

      field.addEventListener("input", () => {
        const regex = new RegExp(r);
        const isValid = regex.test(field.value);
        if (!isValid) {
          this.errors = { ...this.errors, [field.name]: "Doesnt match regex" };
          this._showError(field, "Doesnt match regex");
        } else {
          this._removeError(field);
          delete this.errors[field.name];
        }
        this._updateValue(field);
        this._ifDisableSubmit();
      });
    }
  }

  _updateValue(field) {
    this.values = { ...this.values, [field.name]: field.value };
  }

  _removeError(field) {
    const errorMsg = field.nextElementSibling?.classList.contains("error");
    if (errorMsg) field.parentElement.removeChild(field.nextElementSibling);
  }

  _showError(field, message) {
    const errorMsg = field.nextElementSibling?.classList.contains("error");
    if (errorMsg) return;
    const msg = document.createElement("p");
    msg.classList.add("error");
    msg.innerHTML = message;
    field.after(msg);
  }

  _ifDisableSubmit() {
    const submitBtn = document.querySelector(this.submitBtnSelectQuery);
    if (Object.keys(this.errors).length > 0) {
      submitBtn.setAttribute("disabled", true);
    } else submitBtn.removeAttribute("disabled");
  }

  registerSubmit(selectQuery, cb) {
    this.submitCallback = cb;
    this.submitBtnSelectQuery = selectQuery;
    return this;
  }

  _configureSubmit() {
    const submitBtn = document.querySelector(this.submitBtnSelectQuery);
    // console.log(submitBtn);
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (this._isValuesEmpty()) return;
      this.submitCallback(this.values);
      this._clearValues();
    });
  }

  _isValuesEmpty() {
    if (Object.keys(this.values).length == 0) return true;
  }

  _clearValues() {
    for (const [querySelector, r] of this.fields) {
      const field = document.querySelector(querySelector);
      field.value = "";
    }
    this.values = {};
  }

  build() {
    document.addEventListener("DOMContentLoaded", () => {
      this._configureFields();
      this._configureSubmit();
    });
  }
}

const fV = new FormValidator();

fV.registerField("#name", "[\\w|\\s]{2,30}")
  .registerField("#email", "^[\\w|\\.]{1,30}@\\w{3,10}\\.\\w{1,10}$")
  .registerField("#note", ".{0,200}")
  .registerSubmit("#submit", (args) => console.log(args))
  .build();
