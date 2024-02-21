//   Votre mission est de coder un générateur de dégradés.
//   Vous allez manipuler des inputs de couleurs afin de créer des "linear-gradient" à la volée !

// A. Coder une interface basique
// Codez d'abord une interface très simple, contenant les éléments importants : boutons, inputs, liens, etc...
// Rajoutez un peu de style si besoin est. 

// Puis codez les fonctionnalités JavaScript.

// B. Fonctionnalités JavaScript à coder pour ce projet

// 1. Gérez l'implémentation de base des couleurs, il faut qu'il y est un dégradé lorsqu'on arrive sur le site (input, orientation, body...).
// 2. Gérez le changement de couleur, on doit pouvoir manipuler les inputs et provoquer le changement de couleur du site.
// 3. Occupez-vous de l'inclinaison avec l'input type "range".
// 4. Mettez en place la copie du dégradé en cliquant su le bouton "Copier le gradient".
// 5. Faites-en sorte de créer des dégradés au hasard en cliquant sur le bouton "random".
// 6. Bonne chance ! 

// C. Ajoutez du style à l'interface afin de terminer le projet.


let color1Input = document.getElementById(`color1`);
let color2Input = document.getElementById(`color2`);
let color1Info = document.querySelector(`.color1 .color-info`);
let color2Info = document.querySelector(`.color2 .color-info`);
let color1Container = document.querySelector(`.color1`);
let color2Container = document.querySelector(`.color2`);
let gradientOrientation = document.getElementById(`gradient-orientation`);
let angle = document.getElementById(`angle`);
let randomButton = document.getElementById(`random`);
let copyButton = document.getElementById(`copier`);
let btnContainer = document.querySelector(`.btn-container`);

let randomColor1 = colorGenerator();
let randomColor2 = colorGenerator();
let gradientValue = "";
let gradientOrientationValue = "";

document.body.style.background = `linear-gradient(180deg, ${randomColor2}, ${randomColor1})`;

gradientOrientation.addEventListener('input', orientGradient);

setColors(randomColor1, randomColor2);

color1Input.addEventListener('input', chooseColor);
color2Input.addEventListener('input', chooseColor);
randomButton.addEventListener('click', () => {
    let { randomColor1, randomColor2 } = moreRandomColors();

    setColors(randomColor1, randomColor2);
});

function moreRandomColors() {
    let randomColor1 = colorGenerator();
    let randomColor2 = colorGenerator();

    return { randomColor1, randomColor2 };
}

function colorGenerator() {
    // Generate random values for the red, green, and blue components
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
  
    // Convert the decimal values to hexadecimal and pad them with zeros if needed (for proper format)
    const hexR = randomR.toString(16).padStart(2, '0');
    const hexG = randomG.toString(16).padStart(2, '0');
    const hexB = randomB.toString(16).padStart(2, '0');
  
    // Combine the components into a valid hexadecimal color code
    const randomColor = `#${hexR}${hexG}${hexB}`;
  
    return randomColor;
  }

  function chooseColor() {
    let newColor1 = color1Input.value;
    let newColor2 = color2Input.value;
    
    setColors(newColor1, newColor2);

    let textColor1 = calculateTextColor(newColor1);
    let textColor2 = calculateTextColor(newColor2);

    color1Info.style.color = textColor1;
    color2Info.style.color = textColor2;
  }

  function setColors(color1, color2) {
    color1Input.value = color1;
    color2Input.value = color2;

    color1Info.innerHTML = `${color1}`.toUpperCase();
    color2Info.innerHTML = `${color2}`.toUpperCase();

    let gradientOrientationValue = getGradientOrientation()
    gradientValue = `linear-gradient(${gradientOrientationValue}deg, ${color1}, ${color2})`;

    document.body.style.background = gradientValue;
    color1Container.style.backgroundColor = `${color1}`;
    color2Container.style.backgroundColor = `${color2}`;

    angle.innerHTML = `${gradientOrientationValue}°`;
  }

  function orientGradient(event) {
    let gradientOrientationValue = event.target.value;
    document.body.style.background = `linear-gradient(${gradientOrientationValue}deg, ${color1Input.value}, ${color2Input.value})`;
    angle.innerHTML = `${gradientOrientationValue}°`;
  }


  function calculateTextColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate sum of RGB values
    const rgbSum = r + g + b;

    // Set a lower sum threshold (adjust as needed)
    const sumThreshold = 350;

    // Compare with the threshold and return the text color accordingly
    return rgbSum <= sumThreshold ? 'white' : 'black';
}

let textColor1 = calculateTextColor(color1.value);
let textColor2 = calculateTextColor(color2.value);

color1Info.style.color = textColor1;
color2Info.style.color = textColor2;


// Fonction pour copier aux presse-papiers
function copyToClipboard() {
    
    navigator.clipboard.writeText(gradientValue)
      .then(() => {
        showCopiedMessage();
        console.log('Text successfully copied to clipboard');
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard', err);
      });
  }
  
  // Fonction pour montrer le message 'copié !'
  function showCopiedMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'copied-message';
    messageContainer.textContent = 'Copié !';
    btnContainer.appendChild(messageContainer);
  
    // Animation pour le message 'copié !'
    messageContainer.style.transform = 'translateY(20px)';
    messageContainer.style.transition = 'transform 2s ease-out';
    setTimeout(() => {
      messageContainer.style.transform = 'translateY(0)';
      setTimeout(() => {
        btnContainer.removeChild(messageContainer);
      }, 700);
    }, 700);
  }

  // Ajout de eventListener sur copyButton pour copier le dégradé (couleurs et orientation) aux presse-papiers
  copyButton.addEventListener('click', () => {
    console.log('Current gradientValue:', gradientValue);
    copyToClipboard();
  });

  // Fonction pour chercher l'orientation actuelle du dégradé
  function getGradientOrientation() {
    return gradientOrientation.value;
  }



  
  

