const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
        apikey: 'c18c7877',
        s: 'avengers'
    }
  });

  console.log(response.data);
};

const input = document.querySelector('input');

const onInput = event => {
  fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));
