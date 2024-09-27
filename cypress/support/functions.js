export function getYesterdayFormatted() {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  // Array de nombres de los meses
  const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Obtener día, mes y año
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  // Obtener el nombre del día de la semana
  const options = { weekday: 'long' };
  const dayOfWeek = today.toLocaleDateString('en-US', options);

  // Formatear la fecha
  return `Choose ${dayOfWeek}, ${month} ${day}th, ${year}`;
}


export function typeWithDelay(selector, text, delay = 500, postTypeWait = 3000) {
     return (inputElement) => {
       const letters = text.split('');
       let currentIndex = 0;
   
       const typeNextLetter = () => {
         if (currentIndex < letters.length) {
           cy.wrap(inputElement).type(letters[currentIndex], { delay: 0, force: true }); // Usa force: true para las letras
           cy.wait(delay);
           currentIndex++;
           typeNextLetter();
         } else {
           // Espera adicional de 3 segundos antes de presionar Enter
           cy.wait(postTypeWait).then(() => {
             cy.wrap(inputElement).type('{enter}', { force: true }); // Usa force: true para el Enter
           });
         }
       };
   
       typeNextLetter();
     };
   }

// Ejemplo de uso
typeWithDelay('input[name="city"]', 'valencia', 500);

