import { ID_RAPIDAPI } from "./util";

const obj = {
  method: 'GET',
  url: 'https://api.adviceslip.com/advice'
}

function traduzir(texto) {
  const encodedParams = new URLSearchParams();
encodedParams.append("q", texto);
encodedParams.append("target", "pt");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': ID_RAPIDAPI,
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: encodedParams
};

  fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
    .then(response => response.json())
    .then(response => exibeResult(response.data.translations[0].translatedText))
    .catch(err => console.log(err));
}

function request(){
  fetch(obj.url)
    .then(response => {
      return response.text()
    })
    .then(text => {
      traduzir(JSON.parse(text).slip.advice);
    })
    .catch(error => {
      console.log(error)
      return
    })
}

function exibeResult(text) {
  const container = document.querySelector('.container-dica');
  container.innerHTML = text;
}
