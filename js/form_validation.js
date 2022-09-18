const d = document;

function formValidation() {
  const $form = d.getElementById("card-form"),
    $inputs = d.querySelectorAll("#card-form [required]"),
    fields = {
    "card-name": false,
    "card-number": false,
    "card-mm": false,
    "card-yy": false,
    "card-cv": false
  },
  $loader = d.querySelector(".loader");


  const listValidation = (e) => {
    let regexp = new RegExp(e.target.pattern || e.target.dataset.pattern);
    switch (e.target.name) {
      case "card-name":
        fieldValidation(regexp, e.target, e.target.name);
        updateCards(e.target.name)
        break;
      case "card-number":
        fieldValidation(regexp, e.target, e.target.name);
        updateCards(e.target.name)
        break;
      case "card-mm":
        fieldValidation(regexp, e.target, e.target.name);
        updateCards(e.target.name)
        break;
      case "card-yy":
        fieldValidation(regexp, e.target, e.target.name);
        updateCards(e.target.name)
        break;
      case "card-cv":
        fieldValidation(regexp, e.target, e.target.name);
        updateCards(e.target.name)
        break;
    }
  };

  const fieldValidation = (expression, input, field) => {
    if (expression.test(input.value)) {
      input.classList.remove("error");
      fields[field] = true;
      d.querySelector(".form-error");
      input.parentElement.nextSibling.classList.remove("visible");
    } else {
      input.classList.add("error");
      fields[field] = false;
      input.parentElement.nextSibling.classList.add("visible");
    }
  };

  const updateCards = (id)=>{
    if(id === "card-number") d.querySelector(`p#${id}`).textContent = `${$form[id].value.slice(0,4)} ${$form[id].value.slice(4,8)} ${$form[id].value.slice(8,12)} ${$form[id].value.slice(12, 16)}`;
    else d.querySelector(`p#${id}`).textContent = $form[id].value;
  }

  $inputs.forEach((input) => {
    if (input.title !== "") {
      let $span = d.createElement("span");
      $span.textContent = input.title;
      $span.id = input.name;
      $span.classList.add("form-error");
      input.parentElement.insertAdjacentElement("afterend", $span);
    }
    input.addEventListener("keyup", listValidation);
    input.addEventListener("blur", listValidation);
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    if ( fields["card-name"] && fields["card-number"] && fields["card-mm"]&& fields["card-yy"] && fields["card-cv"]) {
     
      $loader.classList.remove("none")
      setTimeout(() => {
        $loader.classList.add("none")
        $form.insertAdjacentHTML('beforeend', `
        <section class="submit-section">
        <h2>Thank you!</h2>
           <p>We've added your card details</p>
           <a class="finish-btn">Continue</a>
        </section`)
      }, 3000);
      
      d.addEventListener('click', (e)=>{
        let $submitSection = d.querySelector(".submit-section");
        if(e.target.matches('.finish-btn')){
          $submitSection.parentNode.removeChild($submitSection);
          $form.reset()
        }
      })
    } else {
      e.preventDefault();
    }
  });
}

d.addEventListener("DOMContentLoaded", formValidation);
