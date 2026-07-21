document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thank you! Your message has been received. We will contact you within 24 hours.');
  this.reset();
});

document.querySelector('.burger').addEventListener('click', function(){
  const nav = document.querySelector('nav ul');
  const isOpen = nav.style.display === 'flex';
  nav.style.display = isOpen ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.position = 'absolute';
  nav.style.top = '70px';
  nav.style.right = '20px';
  nav.style.background = '#fdeef1';
  nav.style.padding = '20px';
  nav.style.borderRadius = '12px';
  nav.style.boxShadow = '0 10px 20px rgba(0,0,0,.1)';
});
