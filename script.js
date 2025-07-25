function gerarPDF() {
  const container = document.getElementById('formulario-pdf');
  const inputs = container.querySelectorAll('input');
  const substituidos = [];

  inputs.forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.type === 'checkbox' ? (input.checked ? '☑' : '☐') : input.value || '__________';
    span.className = 'campo';
    span.style.top = input.style.top;
    span.style.left = input.style.left;
    span.style.width = input.style.width;
    container.appendChild(span);
    substituidos.push({ original: input, substituto: span });
    input.style.display = 'none';
  });

  const opt = {
    margin: 0,
    filename: 'ordem-de-servico.pdf',
    image: { type: 'JPG', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(container).save().then(() => {
    substituidos.forEach(({ original, substituto }) => {
      substituto.remove();
      original.style.display = '';
    });
  });
}
